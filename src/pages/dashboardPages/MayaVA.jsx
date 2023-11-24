import { Flex, useTheme } from "@chakra-ui/react";
import SidebarTitle from "../../components/dashboard/SidebarTitle";

const MayaVA = () => {
  const theme = useTheme()

  // const [bigScreen, setBigScreen] = useState("");
  // const [selectedImages, setSelectedImages] = useState(null);
  // const [isHovered, setIsHovered] = useState(false);
  // const [imageList2, setImageList2] = useState([
  //   "Image 1",
  //   "Image 2",
  //   "Image 3",
  // ]);

  // const handleImageClick = (image, index) => {
  //   if (selectedImages === index) {
  //     // If the clicked image is already selected, deselect it
  //     setBigScreen("");
  //     setSelectedImages(null);
  //   } else {
  //     // If a different image is clicked, set it as the selected image
  //     setBigScreen(image);
  //     setSelectedImages(index);
  //   }
  // };

  // const handleRemoveBGClick2 = () => {
  //   if (selectedImages !== null) {
  //     const randomNum = Math.floor(Math.random() * 1000); // Generate a random number
  //     const updatedImageList = imageList2.map((url, index) =>
  //       index === selectedImages ? String(randomNum) : url
  //     );

  //     setImageList2(updatedImageList);
  //     setBigScreen(String(randomNum)); // Set bigScreen to the random number
  //     setSelectedImages(null); // Deselect the selected image
  //   }
  // };

  // console.log("Updated Image lists", imageList2);

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
      <Flex w="100%">
        <SidebarTitle
          description=""
          title="Your Project"
        />
      </Flex>
      <Flex w="100%" p="1rem 0.5rem" >

      </Flex>
    </Flex>
    // <Flex
    //   backgroundColor="#fff"
    //   h="100vh"
    //   overflowY="scroll"
    //   width="100%"
    //   flexDir="column"
    //   justifyContent="flex-start"
    //   alignItems="flex-start"
    // >
    //   <DashboardNavbar />
    //   <Flex w="100%">
    //     <SidebarTitle
    //       description={SidebarTitleData[4].description}
    //       title={SidebarTitleData[4].title}
    //     />
    //   </Flex>
    //   <Flex w="100%" p="1rem 0.5rem" flexDir="column">
    //     <Flex height="15rem" width="15rem" flexDir="column" border="1px solid #333" >
    //       <Flex onClick={handleRemoveBGClick2} w="100%" borderBottom="1px solid #333" >RB</Flex>
    //       <Flex w="100%" h="100%" alignItems="center" justifyContent="center" pos="relative" onMouseEnter={() => setIsHovered(true)} // Handle mouse enter event
    //         onMouseLeave={() => setIsHovered(false)}>
    //         {bigScreen}
    //         {isHovered && ( // Render the button conditionally when hovered
    //           <Flex w="100%" h="100%" alignItems="center" justifyContent="center" backgroundColor="yellow" top="0" left="0" pos="absolute">

    //             <button
    //               onClick={handleRemoveBGClick2}
    //               style={{

    //                 backgroundColor: "red",
    //                 color: "white",
    //                 padding: "0.5rem 1rem",
    //                 cursor: "pointer"
    //               }}
    //             >
    //               Your Button
    //             </button>
    //           </Flex>
    //         )}
    //       </Flex>
    //     </Flex>

    //     <Flex gap="1rem">
    //       {imageList2.map((image, index) => (
    //         <Flex
    //           key={index}
    //           onClick={() => {
    //             handleImageClick(image, index);
    //           }}
    //           height="4rem"
    //           width="4rem"
    //           cursor="pointer"
    //           border={selectedImages === index ? "1px solid red" : "1px solid #333"} // Check for -1 explicitly
    //           mt="1rem"
    //         >
    //           {image}
    //         </Flex>
    //       ))}
    //     </Flex>
    //   </Flex>

    // </Flex>
  );
};

export default MayaVA;
