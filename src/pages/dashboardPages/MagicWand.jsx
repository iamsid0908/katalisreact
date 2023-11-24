import {
  Button,
  Flex,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { BiSolidDownload } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { IoIosArrowUp } from "react-icons/io";
import { CSVLink } from "react-csv";
import JSZip from 'jszip';
import Listing_Box from "../../assets/images/Listing_Box.png"

const MagicWand = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const toast = useToast();

  // Auth Token :
  const [cookies] = useCookies(["KatalisAuth"]);
  const accessToken = cookies["KatalisAuth"];

  const [magicWandTableData, setMagicwandTableData] = useState([]) // Store data of the listings
  const [loadListings, setLoadListings] = useState(false) // Store loading state of the listings
  const [selectedCheckboxRows, setSelectedCheckboxRows] = useState([]); // Store checked listing data
  const [selectAllCheckbox, setSelectAllCheckbox] = useState(false);
  const [currPage, setCurrPage] = useState(1); // storing current page number
  const [totalPages, setTotalPages] = useState(1); // storing total number of pages
  const [ids, setSelectedProductIds] = useState([]);
  const [response, setResponse] = useState(0);



  // Sort the data according to the created_at timestamp :
  const sortByCreatedAt = (data) => {
    return data.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA;
    });
  };

  useEffect(() => {
    const getWholeListing = async () => {
      setLoadListings(true)
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/magic/listings?page=${currPage}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (res.status === 200) {
          setLoadListings(false)

          const sortedData = sortByCreatedAt(res.data.data);
          setMagicwandTableData(sortedData);
          setCurrPage(res.data.current_page)
          setTotalPages(res.data.total_pages)
        } else {
          setLoadListings(false)
          toast({
            title: "Couldn't fetch the listings!",
            variant: "left-accent",
            position: "top",
            isClosable: true,
            duration: 2000,
            status: "error",
          });
        }
      } catch (err) {
        setLoadListings(false)
        toast({
          title: "Internal Server Error",
          variant: "left-accent",
          position: "top",
          isClosable: true,
          duration: 2000,
          status: "error",
        });
      }
    };

    getWholeListing();
  }, [currPage, accessToken, toast, response]);

  // [[ Checkbox Select All ]] :
  const handleSelectAllCheckbox = () => {

    if (!selectAllCheckbox) {
      setSelectedCheckboxRows([...magicWandTableData]); // Replace magicWandTableData with your actual data array
    } else {
      setSelectedCheckboxRows([]);
    }
    setSelectAllCheckbox(!selectAllCheckbox);
  };


  // [[ Handle Checkbox Id ]] :
  const handleCheckboxListing = (rowData) => {
    if (ids.includes(rowData.id)) {
      // If the product ID is already in the array, remove it
      setSelectedProductIds((prevSelected) => prevSelected.filter(id => id !== rowData.id));
    } else {
      // If the product ID is not in the array, add it
      setSelectedProductIds((prevSelected) => [...prevSelected, rowData.id]);
    }



    const index = selectedCheckboxRows.findIndex((row) => row.id === rowData.id);

    if (index !== -1) {
      // If the row is already selected, remove it from the selectedCheckboxRows array
      const updatedRows = [...selectedCheckboxRows];
      updatedRows.splice(index, 1);
      setSelectedCheckboxRows(updatedRows);
    } else {
      // If the row is not selected, add it to the selectedCheckboxRows array
      setSelectedCheckboxRows([...selectedCheckboxRows, rowData]);
    }
  };
  // console.log(selectedProductIds)
  // console.log("Selected Rows =>", selectedCheckboxRows);

  // [[ CSV Data ]] :
  const csvData = selectedCheckboxRows.map((selectedRow) => ({
    id: selectedRow?.id || "",
    title: selectedRow?.title || "",
    english_description: selectedRow?.description?.english || "",
    bahasa_description: selectedRow?.description?.bahasa || "",
    imageUrl: selectedRow?.imageUrls ? selectedRow.imageUrls.map((item) => item) : [],
    lastUpdated: selectedRow?.rowUpdated || "",
  }));
  // console.log("CSV Data =>", csvData);

  // [[ Truncate the length of string ]] :
  const truncateString = (inputString, maxLength) => {
    if (!inputString) {
      return "";
    }
    if (inputString.length > maxLength) {
      return inputString.substring(0, maxLength) + "...";
    }
    return inputString;
  }

  // [[ Formatting the timestamp ]] :
  const formatTimestamp = (timestamp) => {
    if (!timestamp) {
      return "";
    }
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const date = new Date(timestamp);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = String(minutes).padStart(2, "0");

    const formattedDate = `${day} ${month}, ${year} at ${formattedHours}:${formattedMinutes} ${amOrPm}`;
    return formattedDate;
  }

  // Navigate to Single Listing Page :
  const navigateSingleListing = (item) => {
    navigate("/main/magic-wand/edit", {
      state: { singleListingData: item },
    });
  };

  // [[ Download selected images in zip format ]] :
  const handleSelectedImagesDownload = async () => {
    const zip = new JSZip();

    try {
      const imagePromises = selectedCheckboxRows.map(async (selectedRow, selectedRowIndex) => {
        const imageDownloads = selectedRow.imageUrls.map(async (imageUrl, index) => {
          try {
            const response = await axios.get(imageUrl, { responseType: 'blob' });
            return {
              data: response.data,
              filename: `image_${selectedRowIndex + 1}_${index + 1}.jpg`, // Adjust the filename as needed
            };
          } catch (err) {
            console.log('Error downloading image:', err);
            return null; // Handle the error gracefully if needed
          }
        });

        return Promise.all(imageDownloads);
      });

      const imageSets = await Promise.all(imagePromises);

      imageSets.forEach((images, selectedRowIndex) => {
        images.forEach(({ data, filename }) => {
          if (data) {
            zip.file(filename, data);
          }
        });
      });

      // Generate the ZIP file
      zip.generateAsync({ type: 'blob' }).then((content) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(content);
        downloadLink.download = 'images.zip';
        downloadLink.click();
      });
    } catch (err) {
      console.log('Error processing images:', err);
    }
  };


  const handleDeleteProducts = () => {
    axios.delete(`${import.meta.env.VITE_SERVER_URL}/delete/listings`, {
      data: { ids },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // Deletion was successful
          setResponse(200)
          setSelectedProductIds([]);
          setSelectedCheckboxRows([]);
          toast({
            title: "Products deleted successfully ",
            variant: "left-accent",
            position: "top",
            isClosable: true,
            duration: 2000,
            status: "success",
          });

        } else {
          // Handle any error responses from the server
          toast({
            title: "Deletion unsccuss",
            variant: "left-accent",
            position: "top",
            isClosable: true,
            duration: 2000,
            status: "error",
          });
        }
      })
      .catch((error) => {
        return error
      });
  }

  // [[ Pagination function for prev and next page ]] :
  const handleClickPrevPage = () => {
    if (currPage > 1) {
      setCurrPage(currPage - 1);
    }
  };
  const handleClickNextPage = () => {
    if (currPage < totalPages) {
      setCurrPage(currPage + 1);
    }
  };

  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
      console.log("Visible");
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  // const scrollToTop = () => {
  //   const parentContainer = document.getElementById('parentFlexContainer'); 
  //   if (parentContainer) {
  //     parentContainer.scrollTo({
  //       top: 0,
  //       behavior: 'smooth'
  //     });
  //   }
  // };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Flex
      backgroundColor={theme.colors.dashboardBG}
      h="100vh"
      overflowY="scroll"
      width="100%"
      flexDir="column"
      justifyContent="flex-start"
      alignItems="flex-start" p="1.5rem"
    >
      <Flex id="parentFlexContainer" w="100%" flexDir="column">
        <Text fontSize="1.5rem" color="#fff">Product Listing Generator</Text>
        <Flex flexDir="row" w="100%" gap="2rem" p="1rem 0" alignItems="center" justifyContent="center">
          <Flex flexDir="column" alignItems="center" cursor="pointer" gap="0.5rem" onClick={() => navigate("/main/magic-wand/edit")}>
            <Image src={Listing_Box} h="8rem" w="8rem" />
            <Text color="#fff">Single Listing</Text>
          </Flex>
          <Flex flexDir="column" alignItems="center" gap="0.5rem">
            <Image src={Listing_Box} h="8rem" w="8rem" />
            <Text color="#fff">Bulk Listing</Text>
          </Flex>
        </Flex>
      </Flex>


      {/* ---------------------------  Download buttons in floating div  --------------------------- */}
      {selectedCheckboxRows.length > 0 && (
        <Flex w="75vw" alignItems="center" justifyContent="flex-start" pos="fixed" bottom="0.5rem" zIndex="10" >
          <Flex w="1200px" backgroundColor="#1a1a1a" border={`2px solid ${theme.colors.border}`} p="1rem 2rem" justifyContent="space-between" alignItems="center" borderRadius="5px">
            <Text color="#fff" > {selectedCheckboxRows?.length} Selected</Text>
            <Flex gap="1rem">
              <CSVLink
                onClick={handleSelectedImagesDownload}
                data={csvData}
                filename={`${csvData[0].title}.csv`}
                className="btn btn-primary"
                target="_blank"
              >
                <Flex
                  alignItems="center"
                  p="0.5rem 1rem"
                  gap="0.5rem"
                  borderRadius="5px"
                  transition={"all 0.3s ease"}
                  color={theme.colors.button.light_color}
                  backgroundColor={theme.colors.button.light_backgroundColor}
                  _hover={{
                    color: `${theme.colors.button.hover_light_color}`,
                    backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                    transform: `${theme.colors.button.hover_transform}`,
                  }}
                  _active={{
                    backgroundColor: `${theme.colors.button.active_light_backgroundColor}`,
                  }}
                >
                  <BiSolidDownload /> Download
                </Flex>
              </CSVLink>
              <Popover
                placement='top'
                closeOnBlur={true}
              >
                <PopoverTrigger>
                  <Button
                    gap="0.5rem"
                    borderRadius="5px"
                    transition={"all 0.3s ease"}
                    color={theme.colors.button.light_color}
                    backgroundColor={theme.colors.button.light_backgroundColor}
                    _hover={{
                      color: `${theme.colors.button.hover_light_color}`,
                      backgroundColor: `${theme.colors.button.hover_light_backgroundColor}`,
                      transform: `${theme.colors.button.hover_transform}`,
                    }}
                    _active={{
                      backgroundColor: `${theme.colors.button.active_light_backgroundColor}`,
                    }}
                  >Publish</Button>
                </PopoverTrigger>
                <PopoverContent w="10rem">
                  <PopoverBody display="flex" flexDir="column" gap="0.5rem">
                    <Flex border="1px solid #333" borderRadius="5px" p="0.1rem 0.5rem" gap="0.5rem"><input type="checkbox" /> <Text>All</Text></Flex>
                    <Flex border="1px solid #333" borderRadius="5px" p="0.1rem 0.5rem" gap="0.5rem"><input type="checkbox" /> <Text>Tokopedia</Text></Flex>
                    <Flex border="1px solid #333" borderRadius="5px" p="0.1rem 0.5rem" gap="0.5rem"><input type="checkbox" /> <Text>Shopee</Text></Flex>
                    <Flex border="1px solid #333" borderRadius="5px" p="0.1rem 0.5rem" gap="0.5rem"><input type="checkbox" /> <Text>Shopify</Text></Flex>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
              <Button
                onClick={handleDeleteProducts}
                gap="0.5rem"
                borderRadius="5px"
                transition={"all 0.3s ease"}
                color={theme.colors.button.danger_color}
                backgroundColor={theme.colors.button.danger_backgroundColor}
                _hover={{
                  transform: `${theme.colors.button.hover_transform}`,
                  backgroundColor: `${theme.colors.button.hover_danger_backgroundColor}`,
                }}
                _active={{
                  backgroundColor: `${theme.colors.button.active_danger_backgroundColor}`,
                }}
              >Delete</Button>
            </Flex>
          </Flex>
        </Flex>
      )}
      {/* ---------------------------  Download buttons in floating div  --------------------------- */}


      <Flex w="100%" p="1rem 0.5rem" flexDir="column" >
        <Flex>
          <Flex flexDir="row" alignItems="center" justifyContent="space-between" w="100%" p="1rem 0" borderTop="1px solid #333">
            <Text fontSize="1.5rem" color="#fff">Recent Product</Text>
            <Flex gap="0.5rem">
              <Text color="#fff">Choose All</Text>
              <input
                type="checkbox"
                checked={selectAllCheckbox}
                onChange={handleSelectAllCheckbox}
              />
            </Flex>
          </Flex>
        </Flex>

        <Flex w="100%" flexWrap="wrap" gap="2rem" alignItems="center" justifyContent="center">
          {loadListings ? "Loading..." : (
            magicWandTableData.length > 0 ? (
              magicWandTableData.map((item, index) => (
                <Flex key={index} flexDir="column" w="15rem" h="20rem" backgroundColor="#2a2a2a" border="1px solid #333" borderRadius="5px" p="1rem" gap="1rem" overflow="hidden" justifyContent="center" alignItems="center">
                  <Flex w="100%" justifyContent="flex-end">
                    <input
                      type="checkbox"
                      checked={selectedCheckboxRows.some((row) => row.id === item.id)}
                      onChange={() => handleCheckboxListing(item)}
                    />
                  </Flex>
                  <Flex onClick={() => navigateSingleListing(item)} w="100%" h="100%" objectFit="cover" backgroundColor="#9e9e9e" overflow="hidden" alignItems="center" justifyContent="center" borderRadius="5px" cursor="pointer">
                    {item?.imageUrls.length > 0 ? (
                      <Image src={item.imageUrls[0]} alt="" />
                    ) : (<Text>No Image Found!</Text>)}
                  </Flex>
                  <Flex alignItems="center" justifyContent="center" flexDir="column" gap="0.5rem">
                    <Text color="#fff">{item?.title?.length > 0
                      ? truncateString(item?.title, 15)
                      : "_"}</Text>
                    <Text borderRadius="5px" fontSize="0.9rem" backgroundColor="#fff" p="0 0.5rem" color="#fff" bg="#1cb03d">Done</Text>
                  </Flex>
                </Flex>))) : "No Listings found ☹️")}

          {/* ------------------  Custom Pagination  ---------------- */}
          <Flex flexDir="row" alignItems="center" justifyContent="center" w="100%" mb="4rem">
            <Button onClick={handleClickPrevPage} isDisabled={currPage === 1}>Prev</Button>
            <Text p="1rem" color="#fff">{currPage} of {totalPages}</Text>
            <Button onClick={handleClickNextPage} isDisabled={currPage === totalPages}>
              Next</Button>
          </Flex>
          {/* ------------------  Custom Pagination  ---------------- */}

        </Flex>

      </Flex>

      {/* ----------------  Back to top button  --------------- */}
      <Flex onClick={scrollToTop}
        position="fixed"
        right="2rem"
        bottom="2rem"
        p="1rem"
        borderRadius="50%"
        boxShadow="lg"
        backgroundColor={theme.colors.button.dark_backgroundColor}
        cursor="pointer"
        zIndex="10"
        color="#fff"
        display={isVisible ? "block" : "none"}
      >
        <Text><IoIosArrowUp /></Text>
      </Flex>

    </Flex>
  );
};

export default MagicWand;
