import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Flex,
  Image,
  SimpleGrid,
  Text,
  useTheme,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { GiElectric } from "react-icons/gi";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const CheckImageMagicWand = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const oldData = location?.state?.finalData;
  // console.log("Old data =>", oldData);

  // [[ State for storing the boolean value in image indices ]]
  const [selectedIndices, setSelectedIndices] = useState(
    Array(oldData?.imageUrls?.length).fill(true)
  );

  const toggleImageSelection = (index) => {
    setSelectedIndices((prevIndices) => {
      const newIndices = [...prevIndices];
      newIndices[index] = !newIndices[index];
      return newIndices;
    });
  };

  // Create a new data object with the selected image URLs
  const newData = {
    ...oldData,
    imageUrls: oldData?.imageUrls?.filter((url, index) => selectedIndices[index]),
  };

  // [[ Navigate to the next page ]]
  const handleCheckImageBtn = () => {
    navigate("/main/magic-wand/check-english", {
      state: { finalData: newData },
    });
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
              // color={theme.colors.active_navColor}
              border={`3px solid ${theme.colors.button.hover_dark_backgroundColor}`}
            >
              <BsCheckLg size={20}  color={theme.colors.button.hover_dark_backgroundColor}/>
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
            backgroundColor="#e2e8f0"
          ></Flex>
          <Flex flexDir="column" alignItems="center">
            <Flex
              p="1rem"
              borderRadius="50%"
              color="#333"
              border="3px solid #e2e8f0"
            >
              <BsCheckLg size={20} color="#e2e8f0"/>
            </Flex>
            <Text pt="0.2rem" fontSize="xs" color="white">
              English
            </Text>
          </Flex>
          <Flex
            width="6rem"
            height="0.2rem"
            transform={"translateY(-0.6rem)"}
            backgroundColor="#e2e8f0"
          ></Flex>
          <Flex flexDir="column" alignItems="center">
            <Flex
              p="1rem"
              borderRadius="50%"
              color="#333"
              border="3px solid #e2e8f0"
            >
              <BsCheckLg size={20}  color="#e2e8f0"/>
            </Flex>
            <Text pt="0.2rem" fontSize="xs" color="white">
              Bahasa
            </Text>
          </Flex>
        </Flex>

        <Flex p="2rem" width={"30rem"}>
          <Text fontSize={"sm"} color={theme.colors.button.light_color}>
            Finally check if you want to deselect any of your edited images
            below and then click on Save & Next button to continue
          </Text>
        </Flex>

        <Flex
          flexDir="column"
          p="1rem"
          borderRadius="5px"
          backgroundColor={theme.colors.navBG}
        >
          <SimpleGrid
            columns={3}
            border="2px solid #1A1A1A"
            backgroundColor={theme.colors.navBG}
            p="1rem"
            gap="1rem"
            overflowY="scroll"
            h="25rem"
            borderRadius="5px"
          >
            {oldData?.imageUrls.map((item, index) =>
              typeof item === "string" && !item.startsWith("http") ? (
                // ----------------- Browsed Images (after URL got converted) -----------------
                <Box
                  key={index}
                  height="8rem"
                  width="8rem"
                  backgroundColor="#e2e8f0"
                  borderRadius="5px"
                  position="relative"
                  cursor="pointer"
                  onClick={() => toggleImageSelection(index)}
                >
                  <Image
                    src={item}
                    borderRadius="5px"
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    transform={`${selectedIndices[index] ? "scale(95%)" : "scale(100%)"
                      }`}
                    opacity={`${selectedIndices[index] ? "1" : "0.3"}`}
                  />

                  {!selectedIndices[index] ? (
                    <Text
                      position={"absolute"}
                      top="0"
                      left="0"
                      fontSize="0.8rem"
                      color="#333"
                      height="100%"
                      width="100%"
                      borderRadius="5px"
                      alignItems="center"
                      display="flex"
                      justifyContent="center"
                    >
                      Deselected
                    </Text>
                  ) : (
                    ""
                  )}
                </Box>
              ) : typeof item === "string" && item.startsWith("http") ? (
                // ------------------------ Only Generated Images -------------------------
                <Box
                  key={index}
                  height="8rem"
                  width="8rem"
                  backgroundColor="#e2e8f0"
                  borderRadius="5px"
                  position="relative"
                  cursor="pointer"
                  onClick={() => toggleImageSelection(index)}
                >
                  <Image
                    src={item}
                    borderRadius="5px"
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    transform={`${selectedIndices[index] ? "scale(95%)" : "scale(100%)"
                      }`}
                    opacity={`${selectedIndices[index] ? "1" : "0.3"}`}
                  />

                  {!selectedIndices[index] ? (
                    <Text
                      position={"absolute"}
                      top="0"
                      left="0"
                      fontSize="0.8rem"
                      color="#333"
                      height="100%"
                      width="100%"
                      borderRadius="5px"
                      alignItems="center"
                      display="flex"
                      justifyContent="center"
                    >
                      Deselected
                    </Text>
                  ) : (
                    ""
                  )}
                </Box>
              ) : (
                // -------------------------- Only Browsed Images ---------------------------
                <Box
                  key={index}
                  height="8rem"
                  width="8rem"
                  backgroundColor="#e2e8f0"
                  borderRadius="5px"
                  position="relative"
                  cursor="pointer"
                  onClick={() => toggleImageSelection(index)}
                >
                  <Image
                    src={URL.createObjectURL(item)}
                    borderRadius="5px"
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    transform={`${selectedIndices[index] ? "scale(95%)" : "scale(100%)"
                      }`}
                    opacity={`${selectedIndices[index] ? "1" : "0.3"}`}
                  />

                  {!selectedIndices[index] ? (
                    <Text
                      position={"absolute"}
                      top="0"
                      left="0"
                      fontSize="0.8rem"
                      color="#333"
                      height="100%"
                      width="100%"
                      borderRadius="5px"
                      alignItems="center"
                      display="flex"
                      justifyContent="center"
                    >
                      Deselected
                    </Text>
                  ) : (
                    ""
                  )}
                </Box>
              )
            )}
          </SimpleGrid>

          <Flex
            justifyContent="flex-end"
            alignItems="flex-end"
            width="28rem"
            mt="1rem"
            borderRadius="5px"
          >
            <Button
              onClick={() => handleCheckImageBtn()}
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
              <GiElectric /> Save & Next
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CheckImageMagicWand;
