import { Flex, Input, useTheme } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";

const DashboardNavbar = () => {
  const theme = useTheme();
  return (
    <Flex
      // backgroundColor="yellow"
      w="100%"
      p="1rem 0.5rem"
      border={`1px solid ${theme.colors.border}`}
      >
      <Flex
      border={`1px solid ${theme.colors.border}`}
        backgroundColor="#f2f2f4"
        p="0.5rem 1rem"
        alignItems="center"
        borderRadius="20px"
        width="30rem"
      >
        <AiOutlineSearch size={20} color="#333" />
        <Input
          outline="0"
          p="0 0.2rem"
          border="0"
          variant="unstyled"
          width="100%"
          placeholder="Search your listings here..."
        />
      </Flex>
    </Flex>
  );
};

export default DashboardNavbar;
