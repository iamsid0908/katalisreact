import {
  Button,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useTheme } from "@emotion/react";
import { useEffect, useState, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BsCheckLg,
} from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { FiAlertTriangle } from "react-icons/fi";
import {
  AiOutlineClose,
} from "react-icons/ai";
import { useCookies } from "react-cookie";
import EditDescriptionMagicStudio from "../../components/dashboard/magicStudio/EditDescriptionMagicStudio.jsx";
import EditImageMagicStudio from "../../components/dashboard/magicStudio/EditImageMagicStudio.jsx";

const EditImageMagicWand = () => {
  const theme = useTheme();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [importListingLink, setImportListingLink] = useState(""); // Store the import listing link
  const [selectedBrowsedLocalImages, setSelectedBrowsedLocalImages] = useState([]); // Store the locally browsed images
  const [listingName, setListingName] = useState(""); // Store the listing name
  const [toggleDescriptionInput, setToggleDescriptionInput] = useState(true); // Store the toggle status (Description Editing)
  const { isOpen, onOpen, onClose } = useDisclosure(); // Store the modal status

  const singleListingData = location?.state?.singleListingData || "";
  // console.log("Listing Data =>", singleListingData);

  // Update selectedBrowsedLocalImages with the "singleListingData.imageUrls"
  useEffect(() => {
    if (
      singleListingData.imageUrls &&
      Array.isArray(singleListingData.imageUrls)
    ) {
      setSelectedBrowsedLocalImages((prevData) => [
        ...prevData,
        ...singleListingData.imageUrls.filter((item) => item),
      ]);
    }
    if (singleListingData.title) {
      setListingName(singleListingData.title);
    }
    if (singleListingData?.description?.english.length > 0 || singleListingData?.description?.bahasa.length > 0 || singleListingData?.description?.hindi.length) {
      setToggleDescriptionInput(false);
    }
  }, []);

  // Structure of the single product listing :
  const [dummyFinalData, setDummyFinalData] = useState({
    id: singleListingData?.id || "",
    title: listingName,
    imageUrls: selectedBrowsedLocalImages,
    description: {
      english: singleListingData?.description?.english || "",
      bahasa: singleListingData?.description?.bahasa || "",
      hindi: singleListingData?.description?.hindi || "",
    },
  });

  // [[ Function to handle the "save & next" button ]] :
  const handleSaveAndNextBtn = async () => {
    // navigate("/main/magic-wand/check-image", {
    navigate("/main/magic-wand/check-image", {
      state: { finalData: dummyFinalData },
    });
  };

  // [[ Function to check if 3 important fields are filled or not ]] :
  const handleCheckFieldsFilled = () => {
    if (
      !dummyFinalData.title ||
      !dummyFinalData.description.english.length > 0 ||
      !dummyFinalData.imageUrls.length > 0
    ) {
      let errorMessage = null;
      if (!dummyFinalData.title) {
        errorMessage = "Please enter the product title";
      } else if (!dummyFinalData.imageUrls.length > 0) {
        errorMessage = "Please browse/generate some product images";
      } else if (!dummyFinalData.description.english.length > 0) {
        errorMessage = "Please enter or generate the product description";
      }
      if (errorMessage) {
        toast({
          title: errorMessage,
          variant: "left-accent",
          position: "top",
          isClosable: true,
          duration: 2000,
          status: "warning",
        });
        return;
      }
    } else {
      onOpen(); // Call the modal
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
      {/* --------------------------------  MODAL  ------------------------------------ */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent backgroundColor={theme.colors.navBG} color="#fff">
          <ModalHeader
            display="flex"
            flexDir="row"
            alignItems="center"
            justifyContent="flex-start"
            gap="1rem"
          >
            <FiAlertTriangle /> Alert
          </ModalHeader>
          <ModalCloseButton color={theme.colors.navColor} />
          <ModalBody>
            <Text>
              Are you sure you want to continue, you won't be able to revisit
              this page
            </Text>
          </ModalBody>
          <ModalFooter gap="1rem">
            <Button
              onClick={onClose}
              gap="0.5rem"
              borderRadius="5px"
              transition={"all 0.3s ease"}
              color={theme.colors.button.light_color}
              boxShadow={theme.colors.button.light_boxShadow}
              backgroundColor={theme.colors.button.light_backgroundColor}
              _hover={{
                boxShadow: `${theme.colors.button.hover_light_boxShadow}`,
                transform: `${theme.colors.button.hover_transform}`,
              }}
              _active={{
                backgroundColor: `${theme.colors.button.active_light_backgroundColor}`,
              }}
            >
              <AiOutlineClose /> Close
            </Button>
            <Button
              onClick={() => handleSaveAndNextBtn()}
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
              <BsCheckLg /> Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* --------------------------------  MODAL  ------------------------------------ */}
      {/* ----------------------  Back & Save-Next Button  --------------------- */}
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
        <Button
          onClick={() => {
            // onOpen();
            handleCheckFieldsFilled();
          }}
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
          <BsCheckLg /> Save & Next
        </Button>
      </Flex>
      {/* ----------------------  Back & Save-Next Button  --------------------- */}
      <Flex
        w="100%"
        alignItems="center"
        margin="1rem 0"
        justifyContent="space-between"
      >
        <Flex
          border={`1px solid ${theme.colors.border}`}
          p="0.5rem 0.5rem"
          pl="1rem"
          gap="1rem"
          borderRadius="5px"
        >
          <Input
            value={importListingLink}
            onChange={(e) => setImportListingLink(e.target.value)}
            color={theme.colors.navColor}
            _focus={{ border: "none" }}
            _hover={{ border: "none" }}
            variant="unstyled"
            borderRadius="5px"
            width="20rem"
            placeholder="Put your listing link here(optional)"
          />
          <Button
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
            Import
          </Button>
        </Flex>
      </Flex>
      <Flex
        w="100%"
        flexDir="row"
        alignItems="flex-start"
        justifyContent="center"
        gap="5rem"
      >
        {/* ---------------- Image-Edit Generate Div  ---------------- */}
        <EditImageMagicStudio
          selectedBrowsedLocalImages={selectedBrowsedLocalImages}
          setSelectedBrowsedLocalImages={setSelectedBrowsedLocalImages}
          setDummyFinalData={setDummyFinalData}
          listingName={listingName}
        />
        {/* ---------------- Image-Edit Generate Div  ---------------- */}

        {/* ----------------  Description Generate Div ---------------- */}
        <EditDescriptionMagicStudio
          toggleDescriptionInput={toggleDescriptionInput}
          setToggleDescriptionInput={setToggleDescriptionInput}
          dummyFinalData={dummyFinalData}
          setDummyFinalData={setDummyFinalData}
          listingName={listingName}
          setListingName={setListingName}
          singleListingData={singleListingData}
        />
        {/* ----------------  Description Generate Div ---------------- */}

      </Flex>
    </Flex>
  );
};
export default EditImageMagicWand;
