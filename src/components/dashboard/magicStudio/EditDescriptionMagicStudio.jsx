import { Button, Flex, Input, Popover, PopoverBody, PopoverContent, PopoverTrigger, Text, Textarea, useTheme, useToast } from '@chakra-ui/react'
import BrandVoiceSelector from './BrandVoiceSelector';
import LanguageSelector from './LanguageSelector';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { GiElectric } from 'react-icons/gi';
import { IoMdMore } from 'react-icons/io';
import { TfiReload } from 'react-icons/tfi';
import { AiFillEdit } from 'react-icons/ai';
import { getErrorMessages } from '../../errorHandling/ErrorMessages';

const EditDescriptionMagicStudio = ({ toggleDescriptionInput, setToggleDescriptionInput, dummyFinalData, setDummyFinalData, listingName, setListingName, singleListingData }) => {
    const theme = useTheme();
    const toast = useToast();
    // Auth Token :
    // const accessToken = useSelector((state) => state.auth.accessToken);
    const [cookies] = useCookies(["KatalisAuth"]);
    const accessToken = cookies["KatalisAuth"];

    // const [listingName, setListingName] = useState(""); // Store the listing name
    const [descriptionEnglishLoading, setDescriptionEnglishLoading] = useState(false); // Store generated description "English" loading status
    const [descriptionBahasaLoading, setDescriptionBahasaLoading] = useState(false); // Store generated description "Bahasa" loading status
    const [descriptionHindiLoading, setDescriptionHindiLoading] = useState(false); // Store generated description "Hindi" loading status
    const [descriptionEditPrompt, setDescriptionEditPrompt] = useState(""); // Store text prompt (Description Editing)
    const [chooseLanguage, setChooseLanguage] = useState([]); // Store the chosen language
    const [brandVoice, setBrandVoice] = useState(""); // Store the brand voice
    const [selectLanguage, setSelectLanguage] = useState("english"); // Store the language TAB (English/Bahasa)
    const [booleanTabPresent, setBooleanTabPresent] = useState(["false", "false", "false"]); // Store the boolean status of TAB (English/Bahasa)
    // const [toggleDescriptionInput, setToggleDescriptionInput] = useState(true); // Store the toggle status (Description Editing)
    const [keywordsPrompt, setKeywordsPrompt] = useState(""); // Store keyword points
    const [productKeyPointsPrompt, setProductKeyPointsPrompt] = useState(""); // Store product key points
    const [promptSetting, setPromptSetting] = useState(""); // Store product key points
    const [booleanEditDescription, setBooleanEditDescription] = useState(false); // Store the boolean status of Desc edit

    // const [dummyFinalData, setDummyFinalData] = useState({
    //     id: singleListingData?.id || "",
    //     title: listingName,
    //     imageUrls: selectedBrowsedLocalImages,
    //     description: {
    //         english: singleListingData?.description?.english || "",
    //         bahasa: singleListingData?.description?.bahasa || "",
    //         hindi: singleListingData?.description?.hindi || "",
    //     },
    // });

    // Handle Listing Name :
    const handleListingName = (e) => {
        setListingName(e.target.value);
    };

    // [[ OpenAI api call for generating "English" description ]] :
    const generateEnglishBtn = async () => {
        setDescriptionEnglishLoading(true);
        dummyFinalData.description.english = "";
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/magic/description`,
                {
                    language: "english",
                    prompt: descriptionEditPrompt,
                    brandVoice: brandVoice,
                    keywords: keywordsPrompt.split(","),
                    keyPoints: productKeyPointsPrompt.split(","),
                    promptSetting: promptSetting,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setDescriptionEnglishLoading(false);
            if (res.status === 200) {
                toast({
                    title: "English description generated successfully!",
                    variant: "left-accent",
                    position: "top",
                    isClosable: true,
                    duration: 2000,
                    status: "success",
                });
                if (selectLanguage === "english") {
                    // Saving into English Div
                    const responseData = res.data.data;
                    const updatedDummyFinalData = { ...dummyFinalData }; // Saving into "FinalData"
                    updatedDummyFinalData.description.english = responseData;
                } else {
                    // Saving into English Div
                    const responseData = res.data.data;
                    const updatedDummyFinalData = { ...dummyFinalData }; // Saving into "FinalData"
                    updatedDummyFinalData.description.english = responseData;
                }
            }
        } catch (err) {
            setDescriptionEnglishLoading(false);
            const statusCode = err.response ? err.response.status : null;
            const errorMessage = statusCode ? getErrorMessages(statusCode) : "An unexpected error occurred.";

            toast({
                title: errorMessage,
                variant: "left-accent",
                position: "top",
                isClosable: true,
                duration: 2000,
                status: "error",
            });
        }
    };

    // [[ OpenAI api call for generating "Bahasa" description ]] :
    const generateBahasaBtn = async () => {
        setDescriptionBahasaLoading(true);
        dummyFinalData.description.bahasa = "";
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/magic/description`,
                {
                    language: "bahasa",
                    prompt: descriptionEditPrompt,
                    brandVoice: brandVoice,
                    keywords: keywordsPrompt.split(","),
                    keyPoints: productKeyPointsPrompt.split(","),
                    promptSetting: promptSetting,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setDescriptionBahasaLoading(false);
            if (res.status === 200) {
                toast({
                    title: "Bahasa description generated successfully!",
                    variant: "left-accent",
                    position: "top",
                    isClosable: true,
                    duration: 2000,
                    status: "success",
                });
                if (selectLanguage === "bahasa") {
                    // Saving into Bahasa Div
                    const responseData = res.data.data;
                    const updatedDummyFinalData = { ...dummyFinalData }; // Saving into "FinalData"
                    updatedDummyFinalData.description.bahasa = responseData;
                } else {
                    // Saving into Bahasa Div
                    const responseData = res.data.data;
                    const updatedDummyFinalData = { ...dummyFinalData }; // Saving into "FinalData"
                    updatedDummyFinalData.description.bahasa = responseData;
                }
            }
        } catch (err) {
            setDescriptionBahasaLoading(false);
            const statusCode = err.response ? err.response.status : null;
            const errorMessage = statusCode ? getErrorMessages(statusCode) : "An unexpected error occurred.";

            toast({
                title: errorMessage,
                variant: "left-accent",
                position: "top",
                isClosable: true,
                duration: 2000,
                status: "error",
            });
        }
    };

    // [[ OpenAI api call for generating "Hindi" description ]] :
    const generateHindiBtn = async () => {
        setDescriptionHindiLoading(true);
        dummyFinalData.description.hindi = "";
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/magic/description`,
                {
                    language: "hindi",
                    prompt: descriptionEditPrompt,
                    brandVoice: brandVoice,
                    keywords: keywordsPrompt.split(","),
                    keyPoints: productKeyPointsPrompt.split(","),
                    promptSetting: promptSetting,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setDescriptionHindiLoading(false);
            if (res.status === 200) {
                toast({
                    title: "Hindi description generated successfully!",
                    variant: "left-accent",
                    position: "top",
                    isClosable: true,
                    duration: 2000,
                    status: "success",
                });
                if (selectLanguage === "hindi") {
                    // Saving into Hindi Div
                    const responseData = res.data.data;
                    const updatedDummyFinalData = { ...dummyFinalData }; // Saving into "FinalData"
                    updatedDummyFinalData.description.hindi = responseData;
                } else {
                    // Saving into Hindi Div
                    const responseData = res.data.data;
                    const updatedDummyFinalData = { ...dummyFinalData }; // Saving into "FinalData"
                    updatedDummyFinalData.description.hindi = responseData;
                }
            }
        } catch (err) {
            setDescriptionHindiLoading(false);
            const statusCode = err.response ? err.response.status : null;
            const errorMessage = statusCode ? getErrorMessages(statusCode) : "An unexpected error occurred.";

            toast({
                title: errorMessage,
                variant: "left-accent",
                position: "top",
                isClosable: true,
                duration: 2000,
                status: "error",
            });
        }
    };

    const handleGenerateDescriptionBtn = () => {
        if (!descriptionEditPrompt || chooseLanguage === "" || brandVoice === "") {
            setDescriptionEnglishLoading(false);
            let errorMessage = null;
            if (!descriptionEditPrompt) {
                errorMessage = "Please write a product description!";
            } else if (!chooseLanguage.length > 0) {
                errorMessage = "Please select a language!";
            } else if (!brandVoice.length > 0) {
                errorMessage = "Please select a brand voice!";
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
            setToggleDescriptionInput(false);

            const bahasaLanguage = chooseLanguage.find(language => language.value === "bahasa");
            const englishLanguage = chooseLanguage.find(language => language.value === "english");
            const hindiLanguage = chooseLanguage.find(language => language.value === "hindi");

            if (bahasaLanguage) {
                setBooleanTabPresent((prev) => {
                    return prev.map((item, index) => {
                        if (index === 1) {
                            return "true";
                        } else {
                            return item;
                        }
                    });
                })
                generateBahasaBtn();
            }
            if (englishLanguage) {
                setBooleanTabPresent((prev) => {
                    return prev.map((item, index) => {
                        if (index === 0) {
                            return "true";
                        } else {
                            return item;
                        }
                    });
                })
                generateEnglishBtn();
            }
            if (hindiLanguage) {
                setBooleanTabPresent((prev) => {
                    return prev.map((item, index) => {
                        if (index === 2) {
                            return "true";
                        } else {
                            return item;
                        }
                    });
                })
                generateHindiBtn();
            }

        }
    }

    const handleEnglishDescriptionChange = (e) => {
        const updatedDummyFinalData = {
            ...dummyFinalData,
            description: {
                ...dummyFinalData.description,
                english: e.target.value, // Update the English description
            },
        };
        setDummyFinalData(updatedDummyFinalData);
    };
    const handleBahasaDescriptionChange = (e) => {
        const updatedDummyFinalData = {
            ...dummyFinalData,
            description: {
                ...dummyFinalData.description,
                bahasa: e.target.value, // Update the Bahasa description
            },
        };
        setDummyFinalData(updatedDummyFinalData);
    };
    const handleHindiDescriptionChange = (e) => {
        const updatedDummyFinalData = {
            ...dummyFinalData,
            description: {
                ...dummyFinalData.description,
                hindi: e.target.value, // Update the Hindi description
            },
        };
        setDummyFinalData(updatedDummyFinalData);
    };


    return (
        <Flex
            className="editDescription"
            p="2rem 0"
            flexDir="column"
            // backgroundColor="yellow"
            h="100%"
            alignItems="center"
            justifyContent="flex-start"
        >
            <Input
                value={listingName}
                onChange={(e) => handleListingName(e)}
                color={theme.colors.navColor}
                border={`1px solid ${theme.colors.border}`}
                p="0.5rem 1rem"
                _focus={{ border: "1px solid #e2e8f0" }}
                _hover={{ border: "1px solid #e2e8f0" }}
                variant="unstyled"
                borderRadius="5px"
                w="32rem"
                placeholder="Product Title"
            />
            {toggleDescriptionInput === true && (
                <Flex
                    p="2rem 0"
                    flexDir="column"
                    // backgroundColor="yellow"
                    h="100%"
                    alignItems="center"
                    justifyContent="flex-start"
                    gap="1rem"
                >
                    <BrandVoiceSelector
                        brandVoice={brandVoice}
                        setBrandVoice={setBrandVoice}
                    />
                    <LanguageSelector
                        chooseLanguage={chooseLanguage}
                        setChooseLanguage={setChooseLanguage}
                    />
                    <Flex
                        flexDir="column"
                        width="32rem"
                        border={`1px solid ${theme.colors.border}`}
                        p="0.5rem"
                        borderRadius="5px"
                    >
                        <Textarea
                            variant="unstyled"
                            color={theme.colors.inputTypeColor}
                            value={keywordsPrompt}
                            onChange={(e) => setKeywordsPrompt(e.target.value)}
                            placeholder="Keywords (Optional): Comma seperated Eg. cat, cute"
                            w="100%"
                            height="100%"
                            maxH="10rem"
                        />
                    </Flex>
                    <Flex
                        flexDir="column"
                        width="32rem"
                        border={`1px solid ${theme.colors.border}`}
                        p="0.5rem"
                        borderRadius="5px"
                    >
                        <Textarea
                            variant="unstyled"
                            value={productKeyPointsPrompt}
                            onChange={(e) => setProductKeyPointsPrompt(e.target.value)}
                            color={theme.colors.inputTypeColor}
                            placeholder="Product Key points (Optional): Comma seperated Eg. cute and fluppy, shiny black fur"
                            w="100%"
                            height="100%"
                            maxH="10rem"
                        />
                    </Flex>
                    <Flex
                        flexDir="column"
                        width="32rem"
                        border={`1px solid ${theme.colors.border}`}
                        p="0.5rem"
                        borderRadius="5px"
                    >
                        <Textarea
                            value={promptSetting}
                            onChange={(e) => setPromptSetting(e.target.value)}
                            variant={"unstyled"}
                            color={theme.colors.inputTypeColor}
                            placeholder="System Setting Input here..."
                            width="100%"
                            height="100%"
                            maxH="10rem"
                        />
                    </Flex>
                    <Flex
                        flexDir="column"
                        width="32rem"
                        border={`1px solid ${theme.colors.border}`}
                        p="0.5rem"
                        borderRadius="5px"
                    >
                        <Textarea
                            value={descriptionEditPrompt}
                            onChange={(e) => setDescriptionEditPrompt(e.target.value)}
                            variant={"unstyled"}
                            color={theme.colors.inputTypeColor}
                            placeholder="Paste your sample Product Description here..."
                            width="100%"
                            height="100%"
                            maxH="10rem"
                        />
                    </Flex>

                    <Flex
                        flexDir="row"
                        width="32rem"
                        justifyContent="space-between"
                        borderRadius="5px"
                    >
                        <Flex></Flex>
                        <Button
                            onClick={() => {
                                handleGenerateDescriptionBtn();
                            }}
                            isLoading={descriptionEnglishLoading || descriptionBahasaLoading || descriptionHindiLoading}
                            loadingText="Generating..."
                            gap="0.5rem"
                            borderRadius="5px"
                            w="fit-content"
                            transition={"all 0.3s ease"}
                            color={theme.colors.button.dark_color}
                            backgroundColor={
                                descriptionEnglishLoading
                                    ? `${theme.colors.button.hover_dark_backgroundColor}`
                                    : `${theme.colors.button.dark_backgroundColor}`
                            }
                            _hover={{
                                backgroundColor: `${theme.colors.button.hover_dark_backgroundColor}`,
                                transform: `${theme.colors.button.hover_transform}`,
                            }}
                            _active={{
                                backgroundColor: `${theme.colors.button.active_dark_backgroundColor}`,
                            }}
                        >
                            <Text display="flex" alignItems="center" gap="0.5rem">
                                <GiElectric /> Generate
                            </Text>
                        </Button>
                    </Flex>
                </Flex>
            )}
            {toggleDescriptionInput === false && (
                <Flex
                    p="2rem 0"
                    flexDir="column"
                    // backgroundColor="yellow"
                    h="100%"
                    alignItems="center"
                    justifyContent="flex-start"
                    gap="1rem"
                >
                    <Flex flexDir="column" width="32rem">
                        <Flex alignSelf="flex-end">
                            {(booleanTabPresent[0] === "true" || singleListingData?.description?.english) && (
                                <Flex
                                    onClick={() => setSelectLanguage("english")}
                                    borderTopLeftRadius="5px"
                                    borderTopRightRadius="5px"
                                    borderBottomLeftRadius="none"
                                    borderBottomRightRadius="none"
                                    border={
                                        selectLanguage === "english"
                                            ? `2px solid transparent`
                                            : `2px solid ${theme.colors.border}`
                                    }
                                    cursor="pointer"
                                    p="0.4rem 2rem"
                                    color="#fff"
                                    backgroundColor={
                                        selectLanguage === "english"
                                            ? `${theme.colors.button.dark_backgroundColor}`
                                            : "transparent"
                                    }
                                    borderBottom="none"
                                >
                                    English
                                </Flex>
                            )}
                            {(booleanTabPresent[1] === "true" || singleListingData?.description?.bahasa) && (
                                <Flex
                                    onClick={() => setSelectLanguage("bahasa")}
                                    borderTopLeftRadius="5px"
                                    borderTopRightRadius="5px"
                                    borderBottomLeftRadius="none"
                                    borderBottomRightRadius="none"
                                    border={
                                        selectLanguage === "bahasa"
                                            ? `2px solid transparent`
                                            : `2px solid ${theme.colors.border}`
                                    }
                                    cursor="pointer"
                                    p="0.4rem 2rem"
                                    color="#fff"
                                    backgroundColor={
                                        selectLanguage === "bahasa"
                                            ? `${theme.colors.button.dark_backgroundColor}`
                                            : "transparent"
                                    }
                                    borderBottom="none"
                                >
                                    Bahasa
                                </Flex>
                            )}
                            {(booleanTabPresent[2] === "true" || singleListingData?.description?.hindi) && (
                                <Flex
                                    onClick={() => setSelectLanguage("hindi")}
                                    borderTopLeftRadius="5px"
                                    borderTopRightRadius="5px"
                                    borderBottomLeftRadius="none"
                                    borderBottomRightRadius="none"
                                    border={
                                        selectLanguage === "hindi"
                                            ? `2px solid transparent`
                                            : `2px solid ${theme.colors.border}`
                                    }
                                    cursor="pointer"
                                    p="0.4rem 2rem"
                                    color="#fff"
                                    backgroundColor={
                                        selectLanguage === "hindi"
                                            ? `${theme.colors.button.dark_backgroundColor}`
                                            : "transparent"
                                    }
                                    borderBottom="none"
                                >
                                    Hindi
                                </Flex>
                            )}
                        </Flex>
                        <Flex
                            flexDir="column"
                            zIndex="1"
                            border={`1px solid ${theme.colors.border}`}
                            className="editedPromptDescription"
                            height="32rem"
                            width="100%"
                            borderRadius="5px"
                            p="1rem"
                            overflowY={"scroll"}
                            alignItems="flex-start"
                            justifyContent="space-between"
                            gap="1rem"
                            color={theme.colors.inputTypeColor}
                        >
                            <Flex w="100%" justifyContent="space-between">
                                <Flex></Flex>
                                <Popover placement="bottom">
                                    <PopoverTrigger>
                                        <Button variant="unstyled">
                                            <IoMdMore />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        w="8rem"
                                        bg={theme.colors.navBG}
                                        border={`1px solid ${theme.colors.border}`}
                                        color={theme.colors.navColor}
                                    >
                                        <PopoverBody
                                            display="flex"
                                            flexDir="column"
                                            gap="0.5rem"
                                            fontSize="0.8rem"
                                        >
                                            <Flex
                                                gap="1rem"
                                                alignItems="center"
                                                cursor="pointer"
                                                onClick={() => {
                                                    setToggleDescriptionInput(true);
                                                    setBooleanTabPresent(["false", "false", "false"]);
                                                    setBooleanEditDescription(false);
                                                }}
                                            >
                                                <TfiReload /> Regenerate
                                            </Flex>
                                            <Flex
                                                gap="1rem"
                                                alignItems="center"
                                                cursor="pointer"
                                                onClick={() => setBooleanEditDescription(true)}
                                            >
                                                <AiFillEdit /> Edit
                                            </Flex>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </Flex>
                            <Flex h="100%" w="100%" flexDir="column">

                                {(selectLanguage === "english" && descriptionEnglishLoading) ? (
                                    <Flex
                                        h="100%"
                                        w="100%"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Button
                                            isLoading={descriptionEnglishLoading}
                                            variant="unstyled"
                                        ></Button>
                                    </Flex>
                                ) : (
                                    dummyFinalData?.description?.english.length > 0 && selectLanguage === "english" &&
                                    (
                                        <Flex w="100%" h="100%">
                                            {booleanEditDescription ? (
                                                <Textarea
                                                    value={dummyFinalData?.description?.english}
                                                    isReadOnly={!booleanEditDescription}
                                                    onChange={handleEnglishDescriptionChange}
                                                    variant={"unstyled"}
                                                    color={theme.colors.inputTypeColor}
                                                    placeholder="Paste your sample Product Description here..."
                                                    width="100%"
                                                    height="100%"
                                                    maxH="100%"
                                                />
                                            ) : (
                                                <Flex
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            dummyFinalData?.description?.english.replace(
                                                                /\n/g,
                                                                "<br>"
                                                            ),
                                                    }}
                                                ></Flex>
                                            )}
                                        </Flex>
                                    )
                                )}

                                {(selectLanguage === "bahasa" && descriptionBahasaLoading) ? (
                                    <Flex
                                        h="100%"
                                        w="100%"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Button
                                            isLoading={descriptionBahasaLoading}
                                            variant="unstyled"
                                        ></Button>
                                    </Flex>
                                ) : (
                                    dummyFinalData?.description?.bahasa.length > 0 && selectLanguage === "bahasa" &&
                                    (
                                        <Flex w="100%" h="100%">
                                            {booleanEditDescription ? (
                                                <Textarea
                                                    value={dummyFinalData?.description?.bahasa}
                                                    isReadOnly={!booleanEditDescription}
                                                    onChange={handleBahasaDescriptionChange}
                                                    variant={"unstyled"}
                                                    color={theme.colors.inputTypeColor}
                                                    placeholder="Paste your sample Product Description here..."
                                                    width="100%"
                                                    height="100%"
                                                    maxH="100%"
                                                />
                                            ) : (
                                                <Flex
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            dummyFinalData?.description?.bahasa.replace(
                                                                /\n/g,
                                                                "<br>"
                                                            ),
                                                    }}
                                                ></Flex>
                                            )}
                                        </Flex>
                                    )
                                )}

                                {(selectLanguage === "hindi" && descriptionHindiLoading) ? (
                                    <Flex
                                        h="100%"
                                        w="100%"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Button
                                            isLoading={descriptionHindiLoading}
                                            variant="unstyled"
                                        ></Button>
                                    </Flex>
                                ) : (
                                    dummyFinalData?.description?.hindi.length > 0 && selectLanguage === "hindi" &&
                                    (
                                        <Flex w="100%" h="100%">
                                            {booleanEditDescription ? (
                                                <Textarea
                                                    value={dummyFinalData?.description?.hindi}
                                                    isReadOnly={!booleanEditDescription}
                                                    onChange={handleHindiDescriptionChange}
                                                    variant={"unstyled"}
                                                    color={theme.colors.inputTypeColor}
                                                    placeholder="Paste your sample Product Description here..."
                                                    width="100%"
                                                    height="100%"
                                                    maxH="100%"
                                                />
                                            ) : (
                                                <Flex
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            dummyFinalData?.description?.hindi.replace(
                                                                /\n/g,
                                                                "<br>"
                                                            ),
                                                    }}
                                                ></Flex>
                                            )}
                                        </Flex>
                                    )
                                )}

                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            )}
        </Flex>
    )
}

export default EditDescriptionMagicStudio
