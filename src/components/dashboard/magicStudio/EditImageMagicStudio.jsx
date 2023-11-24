import { Button, Flex, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Portal, Skeleton, Text, useDisclosure, useTheme, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AiFillEdit, AiFillEye, AiOutlineClear } from 'react-icons/ai'
import { BiSolidDownload, BiSolidSave } from 'react-icons/bi'
import { BsArrowReturnLeft, BsImages, BsInfoCircleFill } from 'react-icons/bs'
import { PiSelectionBackgroundDuotone } from 'react-icons/pi'
import { RxText } from 'react-icons/rx'
import { fabric } from "fabric";
import { useCookies } from 'react-cookie'
import { IoIosAdd } from 'react-icons/io'
import { MdDeleteForever } from 'react-icons/md'
import { LiaTimesSolid } from 'react-icons/lia'

const EditImageMagicStudio = ({ selectedBrowsedLocalImages, setSelectedBrowsedLocalImages, setDummyFinalData, listingName }) => {
    const theme = useTheme()
    const canvasRef = useRef(null);
    const canvas = useRef(null);
    const toast = useToast();

    // Auth Token :
    // const accessToken = useSelector((state) => state.auth.accessToken);
    const [cookies] = useCookies(["KatalisAuth"]);
    const accessToken = cookies["KatalisAuth"];

    const [generatedFile, setGeneratedFile] = useState(""); // Store uploaded file (Image Editing)
    const [imageEditPrompt, setImageEditPrompt] = useState(""); // Store text prompt (Image Editing)
    const [imageUrls, setImageUrls] = useState([]); // Store generated image urls
    const [imageEditLoading, setImageEditLoading] = useState(false); // Store generated images loading status
    const [largeScreenImage, setLargeScreenImage] = useState(""); // Store the url of the selected/deselected generated image (in large screen div)
    const [selectedGeneratedImage, setSelectedGeneratedImage] = useState(false); // Store if generated image is selected/deselected
    const [IsOpenModalViewImage, setIsOpenModalViewImage] = useState(false); // Store the modal open status (view Image)
    const [viewImageModalData, setViewImageModalData] = useState(null); // Store the data passed to the modal (view Image)
    const [canvasBgColor, setCanvasBgColor] = useState("");
    const [removeBackgroundLoader, setRemoveBackgroundLoader] = useState(false); // Store the remove background loader status

    // [[ Update dummyFinalData.imageUrls whenever selectedBrowsedLocalImages changes ]] :
    useEffect(() => {
        setDummyFinalData((prevData) => ({
            ...prevData,
            imageUrls: selectedBrowsedLocalImages,
            title: listingName,
        }));
    }, [selectedBrowsedLocalImages, listingName]);
    // console.log("Final Data =>", dummyFinalData);

    // [[ Function to handle the text input ]] :
    const handleTextChange = (e) => {
        setImageEditPrompt(e.target.value);
    };

    // [[ OpenAI api call for "Image Edit" ]] :
    const handleImagePromptSubmit = async (e) => {
        e.preventDefault();
        setImageEditLoading(true);
        // setImageUrls([]);
        const dataURL = canvas.current.toDataURL({
            format: "png",
            quality: 1,
        });
        // console.log(dataURL)
        const formData = new FormData();
        formData.append("image", dataURL);
        formData.append("prompt", imageEditPrompt);
        formData.append("mask", "");
        formData.append("imageUrl", generatedFile);
        // (selectedBrowsedLocalImages.length > 0 && file && imageEditPrompt) are mandatory, but (file || generatedFile) either can be passed :
        if (!imageEditPrompt) {
            setImageEditLoading(false);
            let errorMessage = null;
            if (!imageEditPrompt) {
                errorMessage = "Please write a prompt!";
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
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_SERVER_URL}/magic/image`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                if (response.status === 200) {
                    setImageEditLoading(false);
                    toast({
                        title: "Image generated successfully",
                        variant: "left-accent",
                        position: "top",
                        isClosable: true,
                        duration: 2000,
                        status: "success",
                    });
                    const newUrls = response?.data?.data || [];
                    setImageUrls((prevUrls) => [
                        ...newUrls.map((item) => item.url),
                        ...prevUrls,
                    ]);
                } else {
                    setImageEditLoading(false);
                    toast({
                        title: "Internal Server Error",
                        variant: "left-accent",
                        position: "top",
                        isClosable: true,
                        duration: 2000,
                        status: "error",
                    });
                }
            } catch (err) {
                setImageEditLoading(false);
                console.log(err)
                toast({
                    title: `${err.message}`,
                    variant: "left-accent",
                    position: "top",
                    isClosable: true,
                    duration: 2000,
                    status: "error",
                });
            }
        }
    };

    // [[ Function to delete the "OpenAI" image ]] :
    const handleDeleteGeneratedImage = (index) => {
        // Create a new array with the selected image removed
        const updatedImageUrls = [...imageUrls];
        updatedImageUrls.splice(index, 1);
        setImageUrls(updatedImageUrls);
    };

    // [[ Function to select/deselect the "OpenAI generated" image ]] :
    const handleRemoveAndInsertGeneratedImage = (index) => {
        // Generated image gets removed and inserted into browsed array
        const updatedImageUrls = [...imageUrls];
        updatedImageUrls.splice(index, 1);
        setImageUrls(updatedImageUrls);
    };

    // [[ Function to select the "Locally Browsed" images ]] :
    const handleImageUpload = (files) => {
        // Convert FileList to an array and update the state
        setSelectedBrowsedLocalImages((prev) => [...prev, ...Array.from(files)]);
    };

    // [[ Handling Drag Drop Feature ]] :
    const handleDropImage = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        handleImageUpload(files);
    };

    // [[ Browse Image + Drag and Drop Iamge Feature ]] :
    const handleDragDropFeature = (e) => {
        const files = e.target.files;
        handleImageUpload(files);
    };

    // [[ Whenever I browse images, by default the first image index should go inside largeScreenImage ]] :
    useEffect(() => {
        if (largeScreenImage === "" && selectedBrowsedLocalImages.length > 0) {
            if (
                typeof selectedBrowsedLocalImages[0] === "string" &&
                selectedBrowsedLocalImages[0].startsWith("http")
            ) {
                // generated image
                setLargeScreenImage(selectedBrowsedLocalImages[0]);
                setSelectedGeneratedImage(0);
            } else {
                // browsed image
                setLargeScreenImage(URL.createObjectURL(selectedBrowsedLocalImages[0]));
                setSelectedGeneratedImage(0);
            }
        } else if (selectedBrowsedLocalImages.length === 0) {
            setLargeScreenImage("");
        }
    }, [selectedBrowsedLocalImages]);
    const handleSelectBrowsedImages = (index) => {
        setLargeScreenImage(URL.createObjectURL(selectedBrowsedLocalImages[index]));
    };

    // [[ Function to delete the "Locally Browsed" image ]]
    const handleDeleteBrowsedLocalImage = (index) => {
        // Create a new array with the selected image removed
        const updatedSelectedBrowsedLocalImages = [...selectedBrowsedLocalImages];
        updatedSelectedBrowsedLocalImages.splice(index, 1);
        setSelectedBrowsedLocalImages(updatedSelectedBrowsedLocalImages);
    };

    // [[ Function to select/deselect the "Locally Browsed" image ]]
    const handleSelectBrowsedLocalImage = (index) => {
        if (selectedGeneratedImage === index) {
            // If the clicked div is already selected, deselect it.
            setLargeScreenImage("");
            setSelectedGeneratedImage(null);
            setGeneratedFile("");
        } else {
            // Otherwise, select the clicked div.
            setGeneratedFile("");
            setSelectedGeneratedImage(index);
            setLargeScreenImage(
                URL.createObjectURL(selectedBrowsedLocalImages[index])
            );
        }
    };

    // [[ Function to store the "generated image" into "browsed images" ]]
    const handleGeneratedImageIntoBrowse = (index, imageUrl) => {
        setSelectedBrowsedLocalImages([...selectedBrowsedLocalImages, imageUrl]);
        // setOnlyGeneratedImagesArray([...onlyGeneratedImagesArray, imageUrl]);
    };

    // [[ Function to select/deselect the "generated image" from Browsed image array section]]
    const handleSelectGeneratedImageFromBrowse = (index) => {
        if (selectedGeneratedImage === index) {
            // If the clicked div is already selected, deselect it.
            setLargeScreenImage("");
            setSelectedGeneratedImage(null);
            setGeneratedFile(""); // generated image
        } else {
            // Otherwise, select the clicked div.
            setSelectedGeneratedImage(index);
            setLargeScreenImage(selectedBrowsedLocalImages[index]);
            setGeneratedFile(selectedBrowsedLocalImages[index]);
        }
    };

    const openModalViewImage = (data) => {
        setViewImageModalData(data); // Set the data before opening the modal
        setIsOpenModalViewImage(true);
    };
    const closeModalViewImage = () => {
        setIsOpenModalViewImage(false);
        setViewImageModalData(null); // Clear the data when closing the modal
    };


    // **********************************************************************


    useEffect(() => {
        canvas.current = new fabric.Canvas(canvasRef.current, {
            width: 500,
            height: 500,
            // backgroundColor: canvasBgColor, // Set initial background color
        });
        canvas.current.on("object:selected", (e) => {
            const activeObject = e.target;
            activeObject.setControlsVisibility({
                tl: true,
                tr: true,
                br: true,
                bl: true,
                mt: false,
                mb: false,
                ml: false,
                mr: false,
                mtr: true,
            });
        });

        // Double click helps in selecting the current object
        canvas.current.on("mouse:dblclick", (e) => {
            const target = e.target;
            if (target) {
                canvas.current.setActiveObject(target);
                canvas.current.renderAll();
            }
        });

        // Clicking (outside + inside) helps in deselect the object
        const handleOutsideClick = (e) => {
            if (canvas.current.getActiveObject()) {
                canvas.current.discardActiveObject();
                canvas.current.renderAll();
            }
        };

        // Add event listener when the component mounts
        document.addEventListener("mousedown", handleOutsideClick);
        // 'keydown' event to delete selected object
        window.addEventListener("keydown", handleKeyDown);
        // Cleanup canvas when component unmounts
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            window.removeEventListener("keydown", handleKeyDown);
            canvas.current.dispose();
        };
    }, []);

    // [[ Function to delete selected object from canvas ]] :
    const handleKeyDown = useCallback((e) => {
        if (e.key === "Delete" || e.key === "Backspace") {
            const activeObject = canvas.current.getActiveObject();
            if (activeObject) {
                canvas.current.remove(activeObject);
                canvas.current.discardActiveObject();
                canvas.current.renderAll();
            }
        }
    }, []);

    // [[ Add Image into canvas ]] :
    const addImageIntoCanvas = useCallback(
        (index) => () => {
            const file = selectedBrowsedLocalImages[index];
            if (typeof file === "string" && file.startsWith("http")) {
                // If Image is external
                fabric.Image.fromURL(
                    file + "?a=1",
                    (img) => {
                        img.scaleToWidth(400);
                        img.scaleToHeight(400);
                        canvas.current.add(img);
                    },
                    {
                        crossOrigin: "anonymous",
                    }
                );
            } else if (file instanceof Blob) {
                // If Image is browsed locally
                const reader = new FileReader();
                reader.onload = (event) => {
                    fabric.Image.fromURL(event.target.result, (img) => {
                        img.scaleToWidth(400);
                        img.scaleToHeight(400);
                        canvas.current.add(img);
                    });
                };
                reader.readAsDataURL(file);
            } else {
                toast({
                    title: "Invalid File",
                    variant: "left-accent",
                    position: "top",
                    isClosable: true,
                    duration: 2000,
                    status: "warning",
                });
            }
        },
        [selectedBrowsedLocalImages, canvas]
    );

    // [[ Clear everything within Canvas ]] :
    const handleClearCanvas = () => {
        canvas.current.clear(); // This will remove all objects from the canvas
        canvas.current.renderAll(); // Render the canvas after clearing objects
    };

    // [[ Remove Background of Canvas Image ]] :
    const handleRemoveBackground = async () => {
        setRemoveBackgroundLoader(true);
        const dataURL = canvas.current.toDataURL({
            format: "png",
            quality: 1,
        });
        // console.log(dataURL);
        const formData = new FormData();
        formData.append("image", dataURL);
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/magic/remove-bg`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (res.status === 200) {
                setRemoveBackgroundLoader(false);
                // console.log(res.data.imageUrl);
                const newImageUrl = res.data.imageUrl;
                fabric.Image.fromURL(
                    newImageUrl,
                    (img) => {
                        // img.scaleToWidth(400);
                        // img.scaleToHeight(400);
                        canvas.current.clear(); // This will remove all objects from the canvas
                        canvas.current.add(img);
                        canvas.current.renderAll(); // Render the canvas after clearing objects
                        toast({
                            title: "Background removed successfully",
                            variant: "left-accent",
                            position: "top",
                            isClosable: true,
                            duration: 2000,
                            status: "success",
                        });
                    },
                    {
                        crossOrigin: "anonymous",
                    }
                );
            }
        } catch (err) {
            setRemoveBackgroundLoader(false);
            toast({
                title: `${err.message}`,
                variant: "left-accent",
                position: "top",
                isClosable: true,
                duration: 2000,
                status: "error",
            });
        }
    };

    // [[ Add Text to Canvas ]] :
    const addTextIntoCanvas = () => {
        const text = new fabric.IText("Enter your text", {
            left: 50,
            top: 50,
        });
        canvas.current.add(text);
    };

    // [[ Upload Images directly to Canvas ]] :
    const handleUploadImagesIntoCanvas = (event) => {
        const files = event.target.files;
        const imageArray = Array.from(files);
        imageArray.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                fabric.Image.fromURL(event.target.result, (img) => {
                    img.scaleToWidth(250);
                    img.scaleToHeight(250);
                    canvas.current.add(img);
                    canvas.current.renderAll(); // Render the canvas after adding the image
                });
            };
            reader.readAsDataURL(file);
        });
    };

    // [[ Download as PNG ]] :
    const downloadCanvasAsPNG = () => {
        const dataURL = canvas.current.toDataURL({
            format: "png",
            quality: 1,
        });

        const a = document.createElement("a");
        a.href = dataURL;
        a.download = "canvas.png";
        document.body.appendChild(a);

        a.click();
        document.body.removeChild(a);
    };

    // [[ Download as SVG ]] :
    const handleDownloadCanvasSVG = () => {
        canvas.current.setBackgroundColor(canvasBgColor, () => {
            canvas.current.renderAll();
            const svgData = canvas.current.toSVG();
            const blob = new Blob([svgData], { type: "image/svg+xml" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "canvas.svg";
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(url); // Cleanup
            document.body.removeChild(a); // Cleanup
            // Revert canvas background color
            canvas.current.setBackgroundColor("transparent", () => {
                canvas.current.renderAll();
            });
        });
    };

    // [[ Saving Current Canvas state in Final List ]] :
    const handleSaveAsPNG = async () => {
        const dataURL = canvas.current.toDataURL({
            format: "png",
            quality: 1,
        });
        // console.log(dataURL);
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/convert_base64_image`,
                { base64_image: dataURL }
            );
            if (res.status === 200) {
                // console.log("Response =>", res.data.imageUrl)
                setSelectedBrowsedLocalImages([
                    ...selectedBrowsedLocalImages,
                    res.data.imageUrl,
                ]);
            }
        } catch (err) {
            toast({
                title: `${err.message}`,
                variant: "left-accent",
                position: "top",
                isClosable: true,
                duration: 2000,
                status: "error",
            });
        }
    };

    // [[ Function to store the generated "White Background" image ]]
    const handleGeneratedWhiteBackground = (index, imageUrl) => {
        setSelectedBrowsedLocalImages([...selectedBrowsedLocalImages, imageUrl]);
    };
    // [[ Function to store the generated "Studio Background" image ]]
    const handleGeneratedStudioBackground = (index, imageUrl) => {
        setSelectedBrowsedLocalImages([...selectedBrowsedLocalImages, imageUrl]);
    };

    return (
        <Flex
            flexDir="column"
            p="2rem 0"
            // h="100%"
            alignItems="flex-start"
            justifyContent="flex-start"
            gap="1rem"
        >

            {/* --------------------------  (View Selected Image) Modal  ------------------------------- */}
            <Modal
                isOpen={IsOpenModalViewImage}
                onClose={closeModalViewImage}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody p="0" borderRadius="5px" overflow="hidden">
                        {viewImageModalData && (
                            <Image src={viewImageModalData?.viewImageUrl} />
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
            {/* --------------------------  (View Selected Image) Modal  ------------------------------- */}

            <Text color={theme.colors.navColor}>Final List</Text>

            {/* -----------------------------  Browsed Images  ----------------------------- */}
            <Flex
                flexDir="row"
                width="32rem"
                // width="90%"
                overflowX={`${selectedBrowsedLocalImages?.length > 3 ? "scroll" : "none"
                    }`}
                borderRadius="5px"
                gap="1rem"
                alignItems="flex-start"
                justifyContent="flex-start"
            >
                <Flex>
                    <label
                        htmlFor="imageFile"
                        className="custom-imageFile-input-magicWand"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDropImage(e)}
                    >
                        <Text>
                            <IoIosAdd size={40} color={theme.colors.border} />
                        </Text>
                        <input
                            multiple
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={handleDragDropFeature} // browsed images
                            id="imageFile"
                        />
                    </label>
                </Flex>
                <Flex flexDir="row" borderRadius="5px" gap="1rem">
                    {selectedBrowsedLocalImages.map((image, index) => (
                        <Flex
                            key={index + 100}
                            height="6rem"
                            width="6rem"
                            objectFit="cover"
                            borderRadius="5px"
                            backgroundColor="#CCD5DE"
                            position="relative"
                            className="image-container"
                        >
                            {(typeof image === "string" && !image.startsWith("http")) ||
                                (typeof image === "string" && image.startsWith("data")) ? (
                                // ----------------- Browsed Images (after URL got converted) -----------------
                                <Image
                                    onClick={() => {
                                        setLargeScreenImage(selectedBrowsedLocalImages[index]);
                                    }}
                                    src={image}
                                    alt={`Selected ${index + 1}`}
                                    borderRadius="5px"
                                    cursor="pointer"
                                />
                            ) : typeof image === "string" && image.startsWith("http") ? (
                                // ------------------------ Only Generated Images -------------------------
                                <Image
                                    onClick={() => {
                                        handleSelectGeneratedImageFromBrowse(index);
                                    }}
                                    src={image}
                                    alt={`Selected ${index + 1}`}
                                    borderRadius="5px"
                                    cursor="pointer"
                                />
                            ) : (
                                // -------------------------- Only Browsed Images ---------------------------
                                <Image
                                    onClick={() => {
                                        handleSelectBrowsedImages(index);
                                        handleSelectBrowsedLocalImage(index);
                                    }}
                                    // src={image}
                                    src={URL.createObjectURL(image)}
                                    alt={`Selected ${index + 1}`}
                                    borderRadius="5px"
                                    cursor="pointer"
                                />
                            )}
                            <Flex className="image-overlay">
                                <button
                                    onClick={() =>
                                        openModalViewImage(
                                            typeof image === "string" && !image.startsWith("http")
                                                ? { viewImageUrl: URL.createObjectURL(image) }
                                                : typeof image === "string" &&
                                                    image.startsWith("http")
                                                    ? { viewImageUrl: image }
                                                    : { viewImageUrl: URL.createObjectURL(image) }
                                        )
                                    }
                                    style={{
                                        height: "fit-content",
                                        color: "#fff",
                                        cursor: "pointer",
                                        backgroundColor: "transparent",
                                        border: "none",
                                    }}
                                >
                                    <AiFillEye size={20} />
                                </button>
                                <button
                                    onClick={addImageIntoCanvas(index)}
                                    style={{
                                        height: "fit-content",
                                        color: "#fff",
                                        cursor: "pointer",
                                    }}
                                >
                                    <AiFillEdit size={20} />
                                </button>
                                <button
                                    onClick={() => handleDeleteBrowsedLocalImage(index)}
                                    style={{
                                        height: "fit-content",
                                        color: "#fff",
                                        cursor: "pointer",
                                    }}
                                >
                                    <MdDeleteForever size={20} />
                                </button>
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
            </Flex>
            {/* -----------------------------  Browsed Images  ----------------------------- */}

            {/* -------------------  Canvas Div  ----------------- */}
            <Flex
                flexDir="column"
                borderRadius="5px"
                overflow="hidden"
                h="500px"
                border={`2px solid ${theme.colors.border}`}
            >
                <Flex p="1rem 1.5rem" justifyContent="space-between">
                    <Flex gap="1.5rem">
                        <Popover trigger="hover" placement="right" boxShadow="lg">
                            <PopoverTrigger p="0">
                                <Button
                                    size="0"
                                    variant="unstyled"
                                    color={theme.colors.button.light_color}
                                    _hover={{ color: `${theme.colors.active_navColor}` }}
                                >
                                    <BsInfoCircleFill />
                                </Button>
                            </PopoverTrigger>
                            <Portal>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverBody>
                                        <Text>Instructions :</Text>
                                        <Text>(i) Double Click on Object to select it</Text>
                                        <Text>
                                            (ii) Click outside the object (either inside or
                                            outside the canvas) to deselect it
                                        </Text>
                                    </PopoverBody>
                                </PopoverContent>
                            </Portal>
                        </Popover>
                        <label htmlFor="canvasUploadImageId">
                            <Flex
                                cursor="pointer"
                                color={theme.colors.button.light_color}
                                _hover={{ color: `${theme.colors.active_navColor}` }}
                            >
                                <BsImages title="Upload Images" />
                            </Flex>
                        </label>
                        <input
                            id="canvasUploadImageId"
                            hidden
                            type="file"
                            multiple
                            onChange={handleUploadImagesIntoCanvas}
                        />
                        <Button
                            isLoading={removeBackgroundLoader}
                            variant="unstyled"
                            size="0"
                            onClick={handleRemoveBackground}
                            color={theme.colors.button.light_color}
                            _hover={{ color: `${theme.colors.active_navColor}` }}
                        >
                            <PiSelectionBackgroundDuotone
                                title="remove background"
                            />
                        </Button>
                        <Flex
                            cursor="pointer"
                            color={theme.colors.button.light_color}
                            _hover={{ color: `${theme.colors.active_navColor}` }}
                        >
                            <RxText
                                onClick={addTextIntoCanvas}
                                title="add Text"
                            />
                        </Flex>
                        <Flex
                            cursor="pointer"
                            color={theme.colors.button.light_color}
                            _hover={{ color: `${theme.colors.active_navColor}` }}
                        >
                            <AiOutlineClear
                                onClick={handleClearCanvas}
                                title="clear canvas"
                            />
                        </Flex>
                    </Flex>
                    <Flex
                        gap="1.5rem"
                    >
                        <Flex
                            cursor="pointer"
                            color={theme.colors.button.light_color}
                            _hover={{ color: `${theme.colors.active_navColor}` }}
                        >
                            <BiSolidSave
                                onClick={handleSaveAsPNG}
                                title="save to final list"
                            />
                        </Flex>
                        <Flex
                            cursor="pointer"
                            color={theme.colors.button.light_color}
                            _hover={{ color: `${theme.colors.active_navColor}` }}
                        >
                            <BiSolidDownload
                                onClick={downloadCanvasAsPNG}
                                title="download"
                            />
                        </Flex>
                    </Flex>
                </Flex>
                <Flex
                    bg={theme.colors.navBG}
                    borderTop={`2px solid ${theme.colors.border}`}
                >
                    <canvas
                        ref={canvasRef}
                        style={{
                            backgroundColor: `${canvasBgColor}`,
                            width: "512px",
                            height: "512px",
                        }}
                    ></canvas>
                </Flex>
            </Flex>
            {/* -------------------  Canvas Div  ----------------- */}

            {/* ------------------------------------  Model generated Image  --------------------------------- */}
            {(imageUrls.length > 0 || imageEditLoading) && (
                <Flex
                    flexDir="row"
                    width="32rem"
                    gap="1rem"
                    borderRadius="5px"
                    overflowX={`${((imageUrls?.length > 2 && imageEditLoading) ||
                        imageUrls?.length > 5) === true
                        ? "scroll"
                        : "none"
                        }`}
                >
                    <Flex gap="0.5rem">
                        <Flex
                            flexDir="row"
                            border={`1px solid ${theme.colors.border}`}
                            p="1rem"
                            borderRadius="5px"
                            cursor="pointer"
                            mr="0.5rem"
                            onClick={(e) => handleImagePromptSubmit(e)}
                        >
                            <IoIosAdd size={30} color={theme.colors.border} />
                        </Flex>
                        {imageEditLoading === true && (
                            <Flex gap="1rem">
                                <Skeleton
                                    height="4rem"
                                    width="4rem"
                                    objectFit="cover"
                                    borderRadius="5px"
                                    backgroundColor="#e3e3e3"
                                />
                                <Skeleton
                                    height="4rem"
                                    width="4rem"
                                    objectFit="cover"
                                    borderRadius="5px"
                                    backgroundColor="#e3e3e3"
                                />
                                <Skeleton
                                    height="4rem"
                                    width="4rem"
                                    objectFit="cover"
                                    borderRadius="5px"
                                    backgroundColor="#e3e3e3"
                                />
                            </Flex>
                        )}
                        {imageUrls.map((imageUrl, index) => (
                            <Flex
                                key={index}
                                height="4rem"
                                width="4rem"
                                objectFit="cover"
                                borderRadius="5px"
                                backgroundColor="#CCD5DE"
                                position="relative"
                            >
                                <Image
                                    onClick={() => { handleGeneratedImageIntoBrowse(index, imageUrl); handleRemoveAndInsertGeneratedImage(index) }
                                    }
                                    src={imageUrl}
                                    alt={`Image ${index}`}
                                    borderRadius="5px"
                                    cursor="pointer"
                                />
                                <button
                                    onClick={() => handleDeleteGeneratedImage(index)}
                                    className="delete-button"
                                    style={{
                                        position: "absolute",
                                        top: "0",
                                        right: "0",
                                        backgroundColor: "#ff00009d",
                                        color: "#fff",
                                        padding: "0.2rem",
                                        borderRadius: "5px",
                                        border: "none",
                                        outline: "none",
                                        cursor: "pointer",
                                        margin: "0.2rem",
                                    }}
                                >
                                    <LiaTimesSolid size={12} />
                                </button>
                            </Flex>
                        ))}
                    </Flex>
                </Flex>
            )}
            {/* ------------------------------------  Model generated Image  --------------------------------- */}

            <Flex
                width="512px"
                // width="90%"
                flexDir="row"
                alignItems="center"
                justifyContent="space-between"
                p="0.5rem"
                border={`2px solid ${theme.colors.border}`}
                bg={theme.colors.canvasBgColor}
                borderRadius="5px"
                gap="0.5rem"
            >
                <Text color={theme.colors.navColor}>Prompt: </Text>
                <Input
                    color={theme.colors.inputTypeColor}
                    value={imageEditPrompt}
                    onChange={handleTextChange}
                    variant="unstyled"
                    borderRadius="0px"
                    placeholder="Write your prompt here.."
                />
                <Button
                    onClick={(e) => handleImagePromptSubmit(e)}
                    isLoading={imageEditLoading}
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
                    fontSize="1.2rem"
                    fontWeight="bold"
                >
                    <BsArrowReturnLeft />
                </Button>
            </Flex>

            <Flex
                flexDir="row"
                alignItems="center"
                justifyContent="space-between"
                gap="0.5rem"
                w="32rem"
            >
                <Text w="15rem" color={theme.colors.navColor}>
                    White Background
                </Text>
                <Flex
                    w="100%"
                    justifyContent="space-between"
                    alignItems="center"
                    gap="0.5rem"
                >
                    <Flex flexDir="row" gap="0.5rem" width="19rem">
                        <Image
                            crossOrigin="anonymous"
                            onClick={() => {
                                handleGeneratedWhiteBackground(
                                    0,
                                    "https://magic-studio-images.s3.ap-south-1.amazonaws.com/white_back.jpeg"
                                );
                            }}
                            src="https://magic-studio-images.s3.ap-south-1.amazonaws.com/white_back.jpeg"
                            alt=""
                            borderRadius="5px"
                            cursor="pointer"
                            w="3rem"
                        />
                    </Flex>
                    <Flex
                        flexDir="row"
                        border={`1px solid ${theme.colors.border}`}
                        p="0.5rem"
                        borderRadius="5px"
                        cursor="pointer"
                    >
                        {" "}
                        <IoIosAdd size={30} color={theme.colors.border} />
                    </Flex>
                </Flex>
            </Flex>

            <Flex
                flexDir="row"
                alignItems="center"
                justifyContent="space-between"
                gap="0.5rem"
                w="32rem"
            >
                <Text w="15rem" color={theme.colors.navColor}>
                    Studio Background
                </Text>
                <Flex
                    w="100%"
                    justifyContent="space-between"
                    alignItems="center"
                    gap="0.5rem"
                >
                    <Flex flexDir="row" gap="0.5rem" width="19rem">
                        <Image
                            crossOrigin="anonymous"
                            onClick={() => {
                                handleGeneratedStudioBackground(
                                    0,
                                    "https://magic-studio-images.s3.ap-south-1.amazonaws.com/studio_image.jpeg"
                                );
                            }}
                            src="https://magic-studio-images.s3.ap-south-1.amazonaws.com/studio_image.jpeg"
                            alt=""
                            borderRadius="5px"
                            cursor="pointer"
                            w="3rem"
                        />
                    </Flex>
                    <Flex
                        flexDir="row"
                        border={`1px solid ${theme.colors.border}`}
                        p="0.5rem"
                        borderRadius="5px"
                        cursor="pointer"
                    >
                        {" "}
                        <IoIosAdd size={30} color={theme.colors.border} />
                    </Flex>
                </Flex>
            </Flex>

        </Flex>
    )
}

export default EditImageMagicStudio
