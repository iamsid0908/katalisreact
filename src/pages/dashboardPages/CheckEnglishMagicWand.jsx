import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Flex,
  Text,
  Textarea,
  useTheme,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { GiElectric } from "react-icons/gi";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const CheckEnglishMagicWand = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const oldData = location.state.finalData;
  // console.log("Finalize Data =>", oldData);

  const [newData, setNewData] = useState(oldData);

  // [[ Navigate to the next page ]]
  const handleCheckEnglishBtn = () => {
    navigate("/main/magic-wand/check-bahasa", {
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
            backgroundColor={theme.colors.button.hover_dark_backgroundColor}
          ></Flex>
          <Flex flexDir="column" alignItems="center">
            <Flex
              p="1rem"
              borderRadius="50%"
              
              border={`3px solid ${theme.colors.button.hover_dark_backgroundColor}`}
            >
              <BsCheckLg size={20} color={theme.colors.button.hover_dark_backgroundColor}/>
            </Flex>
            <Text pt="0.2rem" fontSize="xs" color={theme.colors.button.hover_dark_backgroundColor}>
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
              <BsCheckLg size={20}  />
            </Flex>
            <Text pt="0.2rem" fontSize="xs" color="white">
              Bahasa
            </Text>
          </Flex>
        </Flex>

        <Flex p="2rem" width={"30rem"}>
          <Text fontSize={"sm"} color={theme.colors.button.light_color}>
            Finally check if you want to edit your product description (in
            English)
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
            h="25rem"
            borderRadius="5px"
          >
            <Textarea
              value={newData?.description?.english}
              onChange={(e) =>
                setNewData({
                  ...newData,
                  description: {
                    ...newData.description,
                    english: e.target.value,
                  },
                })
              }
              p="1rem"
              variant={"unstyled"}
              backgroundColor={theme.colors.navBG}
              placeholder="Your Product Description in English language..."
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
              onClick={() => handleCheckEnglishBtn()}
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

export default CheckEnglishMagicWand;
