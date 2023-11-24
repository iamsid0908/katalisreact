import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Flex,
  Text,
  Textarea,
  useTheme,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { BsCheckLg } from "react-icons/bs";
import { GiElectric } from "react-icons/gi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";


const CheckBahasaMagicWand = () => {
  const theme = useTheme();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const oldData = location.state.finalData;
  const [loading, setLoading] = useState(false);

  // Auth Token :
  const [cookies] = useCookies(["KatalisAuth"]);
  const accessToken = cookies["KatalisAuth"];

  const [newData, setNewData] = useState(oldData);

  // Segregation of Binary data and "http" urls :
  const httpUrls = oldData?.imageUrls?.filter(
    (item) => typeof item === "string" && item.startsWith("http")
  );
  const binaryData = oldData?.imageUrls?.filter(
    (item) => !(typeof item === "string" && item.startsWith("http"))
  );
  // console.log("Binary Data image format =>", binaryData);
  // console.log("Original array (http url) =>", httpUrls);

  const handleCheckBahasa = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("id", newData.id);
    formData.append("title", newData.title);
    // formData.append("title", JSON.stringify(newData.title));
    formData.append("imageUrls", JSON.stringify(httpUrls));
    binaryData.forEach((file, index) => {
      formData.append(`imageFiles`, file, file.name);
    });
    formData.append("description", JSON.stringify(newData.description));

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/magic/listing`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        setLoading(false);
        navigate("/main/magic-wand", {
          state: { finalData: newData },
        });

        toast({
          title: "Your listing is saved! ",
          variant: "left-accent",
          position: "top",
          isClosable: true,
          duration: 2000,
          status: "success",
        });
      }
      else if (res.status === 429) {
        setLoading(false)
        toast({
          title: "Request timeout, please check your connection!",
          variant: "left-accent",
          position: "top",
          isClosable: true,
          duration: 2000,
          status: "error",
        });
      } else {
        setLoading(false)
        toast({
          title: "Try again later ",
          variant: "left-accent",
          position: "top",
          isClosable: true,
          duration: 2000,
          status: "error",
        });
      }
    } catch (err) {
      setLoading(false)
      toast({
        title: "Sorry couldn't save, try again later ",
        variant: "left-accent",
        position: "top",
        isClosable: true,
        duration: 2000,
        status: "error",
      });
    }
  };

  return (
    <Flex
    backgroundColor={theme.colors.dashboardBG}
      h="100vh"
      overflowY="scroll"
      width="100%"
      flexDir="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      p="1.5rem"
    >
       <Flex w="100%" alignItems="center" justifyContent="space-between">
        <Button
          onClick={() => navigate("/main/magic-wand")}
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
          <IoIosArrowBack /> Back
        </Button>

      </Flex>
      <Flex
        w="100%"
        alignItems="center"
        flexDir="column"
        margin="1rem 0"
        p="5rem"
        justifyContent="center"
      >
        <Flex alignItems="center" flexDir="row">
          <Flex flexDir="column" alignItems="center">
            <Flex
              p="1rem"
              borderRadius="50%"
              border={`3px solid ${theme.colors.button.hover_dark_backgroundColor}`}
              color={theme.colors.button.hover_dark_backgroundColor}
            >
              <BsCheckLg size={20} />
            </Flex>
            <Text
              pt="0.2rem"
              fontSize="xs"
              color={theme.colors.button.hover_dark_backgroundColor}
            >
              Image
            </Text>
          </Flex>
          <Flex
            width="6rem"
            height="0.2rem"
            transform={"translateY(-0.6rem)"}
            background={theme.colors.button.hover_dark_backgroundColor}
          ></Flex>
          <Flex flexDir="column" alignItems="center">
            <Flex
              p="1rem"
              borderRadius="50%"
              border={`3px solid ${theme.colors.button.hover_dark_backgroundColor}`}
              // backgroundColor={theme.colors.button.hover_dark_backgroundColor}
              color={theme.colors.button.hover_dark_backgroundColor}
            >
              <BsCheckLg size={20} />
            </Flex>
            <Text pt="0.2rem" fontSize="xs" color={theme.colors.button.hover_dark_backgroundColor}>
              English
            </Text>
          </Flex>
          <Flex
            width="6rem"
            height="0.2rem"
            transform={"translateY(-0.6rem)"}
            backgroundColor={theme.colors.button.hover_dark_backgroundColor}
          ></Flex>
          <Flex flexDir="column" alignItems="center">
            <Flex
              p="1rem"
              borderRadius="50%"
              color="#333"
              border={`3px solid ${theme.colors.button.hover_dark_backgroundColor}`}
            >
              <BsCheckLg size={20} color={theme.colors.button.hover_dark_backgroundColor}/>
            </Flex>
            <Text pt="0.2rem" fontSize="xs" color={theme.colors.button.hover_dark_backgroundColor}>
              Bahasa
            </Text>
          </Flex>
        </Flex>

        <Flex p="2rem" width={"30rem"}>
          <Text fontSize={"sm"} color={theme.colors.button.light_color}>
            Finally check if you want to edit your product description (in
            Bahasa)
          </Text>
        </Flex>

        <Flex
          flexDir="column"
          p="1rem"
          borderRadius="5px"
          backgroundColor={theme.colors.navBG}
        >
          <Flex
            columns={3}
            border="2px solid #1A1A1A"
            backgroundColor={theme.colors.navBG}
            
            gap="1rem"
            overflowY="scroll"
            h="25rem"
            borderRadius="5px"
          >
            <Textarea
              value={newData?.description?.bahasa}
              onChange={(e) =>
                setNewData({
                  ...newData,
                  description: {
                    ...newData.description,
                    bahasa: e.target.value,
                  },
                })
              }
              p="1rem"
              variant={"unstyled"}
              backgroundColor={theme.colors.navBG}
              placeholder="Your Product Description in Bahasa language..."
              width="100%"
              height="100%"
              maxH="25rem"
              color="white"
            />
          </Flex>

          <Flex
            justifyContent="flex-end"
            alignItems="flex-end"
            width="28rem"
            mt="1rem"
            borderRadius="5px"
          >
            <Button
              isLoading={loading}
              loadingText="Saving..."
              onClick={() => handleCheckBahasa()}
              gap="0.5rem"
              borderRadius="5px"
              transition={"all 0.3s ease"}
              color={theme.colors.button.dark_color}
              backgroundColor={theme.colors.button.dark_backgroundColor}
              _hover={{
                backgroundColor: `${theme.colors.button.hover_dark_backgroundColor}`,
                transform: `${theme.colors.button.hover_transform}`,
              }}
              _active={{
                backgroundColor: `${theme.colors.button.active_dark_backgroundColor}`,
              }}
            >
              <GiElectric /> Done
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CheckBahasaMagicWand;
