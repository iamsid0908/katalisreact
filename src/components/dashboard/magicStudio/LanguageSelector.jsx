import { useState } from "react";
import { Flex, Text, Popover, PopoverTrigger, PopoverContent, PopoverBody } from "@chakra-ui/react";
import theme from "../../ChakraTheme";
import { MdKeyboardArrowDown } from "react-icons/md";

function LanguageSelector({ chooseLanguage, setChooseLanguage }) {

  const [selectedLanguageValues, setSelectedLanguageValues] = useState([]);
  // console.log("Selected Checkbox Rows =>", chooseLanguage);

  const languageOptions = [
    { value: "bahasa", label: "Bahasa" },
    { value: "english", label: "English" },
    { value: "hindi", label: "Hindi" },
  ];


  // [[ Handle Checkbox Id ]] :
  const handleCheckboxListing = (rowData) => {
    if (selectedLanguageValues.includes(rowData.value)) {
      // If value not present, remove it
      setSelectedLanguageValues((prevSelected) => prevSelected.filter(value => value !== rowData.value));
    } else {
      // else add it
      setSelectedLanguageValues((prevSelected) => [...prevSelected, rowData.value]);
    }
    const index = chooseLanguage.findIndex((row) => row.value === rowData.value);

    if (index !== -1) {
      // If value already present, remove it
      const updatedRows = [...chooseLanguage];
      updatedRows.splice(index, 1);
      setChooseLanguage(updatedRows);
    } else {
      // else add it
      setChooseLanguage([...chooseLanguage, rowData]);
    }
  };

  return (
    <Flex>
      <Flex
        flexDir="row"
        w="32rem"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text color={theme.colors.navColor}>Choose the language</Text>
        <Popover
          placement='bottom'
          closeOnBlur={true}
        >
          <PopoverTrigger>
            <Flex
              p="0.5rem 0.8rem"
              borderRadius="5px"
              w="12rem"
              gap="1rem"
              justifyContent="space-between"
              bg={theme.colors.navBG}
              border={`1px solid ${theme.colors.border}`}
              color={theme.colors.navColor}
              cursor="pointer"
            > Choose <MdKeyboardArrowDown size={20} /> </Flex>
          </PopoverTrigger>
          <PopoverContent w="12rem" m="-0.5rem" bg={theme.colors.navBG} border={`1px solid ${theme.colors.border}`} color={theme.colors.navColor}>
            <PopoverBody display="flex" flexDir="column" gap="0.5rem">
              {languageOptions.map((item, index) => (
                <Flex key={index} border="1px solid #333" borderRadius="5px" p="0.1rem 0.5rem" gap="0.5rem"><input type="checkbox"
                  checked={chooseLanguage.some((row) => row.value === item.value)}
                  onChange={() => handleCheckboxListing(item)} /> <Text>{item.label}</Text></Flex>
              ))}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </Flex>
  );
}

export default LanguageSelector;
