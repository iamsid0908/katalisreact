import { useState } from "react";
import { Box, Flex, Text, Select } from "@chakra-ui/react";
import theme from "../../ChakraTheme";
function BrandVoiceSelector({brandVoice, setBrandVoice}) {
  // const [brandVoice, setBrandVoice] = useState("");

  const options = [
    { value: "neutral", label: "Neutral" },
    { value: "funny", label: "Funny" },
    { value: "serious", label: "Serious" },
    { value: "formal", label: "Formal" },
    { value: "casual", label: "Casual" },
    { value: "irreverent", label: "Irreverent" },
    { value: "respectful", label: "Respectful" },
    { value: "enthusiastic", label: "Enthusiastic" },
    { value: "matter-of-fact", label: "Matter-of-fact" },
  ];

  const handleSelectBrandVoiceChange = (event) => {
    setBrandVoice(event.target.value);
  };
  // console.log("Selected Language shown here =>", brandVoice);

  return (
    <Flex>
      <Flex
        flexDir="row"
        w="32rem"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text color={theme.colors.navColor}>Whats your brand voice</Text>
        <Select
          value={brandVoice}
          onChange={handleSelectBrandVoiceChange}
          color={theme.colors.navColor}
          w="12rem"
          gap="1rem"
          justifyContent="space-between"
          bg={theme.colors.navBG}
          border={`1px solid ${theme.colors.border}`}
          placeholder="Select an option"
        >
          {options.map((option) => (
            <option
              style={{
                color: theme.colors.navColor,
                backgroundColor: theme.colors.navBG,
                borderRadius: "5px",
              }}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </Select>
      </Flex>
    </Flex>
  );
}

export default BrandVoiceSelector;
