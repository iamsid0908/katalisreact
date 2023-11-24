import { Flex, Heading, Text } from "@chakra-ui/react";

const SidebarTitle = ({ description, title }) => {
  return (
    <Flex
      w="100%"
      flexDir="column"
      gap="0.5rem"
      // p="1rem 0.5rem"
      color="#fff"
    >
     <Text fontSize="1.5rem" color="#fff">{title}</Text>
    </Flex>
  );
};

export default SidebarTitle;
