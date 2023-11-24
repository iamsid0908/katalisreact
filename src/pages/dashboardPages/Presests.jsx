import { Flex, useTheme } from "@chakra-ui/react";
import SidebarTitle from "../../components/dashboard/SidebarTitle";
import { useState } from "react";

const Presets = () => {
  const theme = useTheme()

  const [isEmojiPopoverOpen, setIsEmojiPopoverOpen] = useState(false);
  const [emojis, setEmojis] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const emojiAccessKey = "b000290a6ccc09f6ea8096b285e25a805bff7882";
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  // useEffect(() => {
  //   const fetchEmojis = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://emoji-api.com/emojis?search=${debouncedSearchQuery}&access_key=${emojiAccessKey}`
  //       );
  //       if (response.status === 200) {
  //         if (response.data.status === "error") {
  //           // Handle error response
  //           setEmojis([]);
  //           console.log("No results found");
  //         } else {
  //           // Set emojis state with the array of emojis
  //           setEmojis(response.data);
  //         }
  //       } else {
  //         console.log("Error fetching emojis");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching emojis:", error);
  //     }
  //   };
  //   // [[ Call the API after debounce timeout ]] :
  //   const debounceTimeout = setTimeout(() => {
  //     fetchEmojis();
  //   }, 500); // Debounce time: 500 milliseconds
  //   return () => {
  //     clearTimeout(debounceTimeout); // Cleanup timeout on component re-render, input change, or unmount
  //   };
  // }, [debouncedSearchQuery, emojiAccessKey]);
  // const handleSearchChange = (event) => {
  //   setSearchQuery(event.target.value); // Update search query immediately
  //   const newDebounceTimeout = setTimeout(() => {
  //     setDebouncedSearchQuery(event.target.value);
  //   }, 500); // Debounce time: 500 milliseconds
  //   clearTimeout(debounceTimeout); // Clear the previous debounceTimeout
  //   setDebounceTimeout(newDebounceTimeout); // Set the new debounceTimeout
  // };
  // const handleEmojiClick = (emojiUrl) => {
  //   // Create a text object with the emoji character
  //   const textObject = new fabric.Textbox(emojiUrl.character, {
  //     left: 50,
  //     top: 50,
  //     fontSize: 50,
  //   });
  //   // Add the text object to the canvas
  //   canvas.current.add(textObject);
  //   canvas.renderAll(); // Render the canvas after adding the emoji
  // };

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
          title="Templates"
        />
      </Flex>
      <Flex w="100%" p="1rem 0.5rem" >

        {/* <BsEmojiSmile
          onClick={() => setIsEmojiPopoverOpen(!isEmojiPopoverOpen)}
          color={theme.colors.button.light_color}
          id="canvas-emoji-modal-container"
          title="emojis"
        /> */}
        {/* {isEmojiPopoverOpen === true && (
          <Flex id="canvas-emoji-modal" zIndex="10" shadow="lg">
            <Flex>
              <Flex
                overflowY={emojis.length > 30 ? "scroll" : "none"}
                gap="1rem"
                display="flex"
                flexDir="column"
              >
                <Input
                  p="1rem"
                  type="text"
                  placeholder="Search Emojis..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e)}
                />
                {emojis.length === 0 ? (
                  <div>No results found</div>
                ) : (
                  <Flex flexWrap="wrap" gap="0.5rem">
                    {emojis.map((emojiUrl, index) => (
                      <Flex
                        cursor="pointer"
                        key={index}
                        role="img"
                        aria-label={`emoji-${index}`}
                        className="emoji-icon"
                        onClick={() => handleEmojiClick(emojiUrl)}
                        fontSize="1.2rem"
                      >
                        {emojiUrl?.character}
                      </Flex>
                    ))}
                  </Flex>
                )}
              </Flex>
            </Flex>
          </Flex>
        )} */}

      </Flex>
    </Flex>
  );
};

export default Presets;
