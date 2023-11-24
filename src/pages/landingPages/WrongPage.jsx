import { Center, Container, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

const WrongPage = () => {
  return (
    <Container maxW={"6xl"}>
    <Center>
      <VStack>
        <Heading color={"#8b3dff"}>4O4, Page not found</Heading>
        <Text>Sorry, the page you are looking for doesn't exist.</Text>
        <HStack mt={3}>
        <Text >Back to</Text>
          <ChakraLink
            as={ReactRouterLink}
            to="/"
            color={"#8b3dff"}
          >
            Home
          </ChakraLink>
          </HStack>
      </VStack>
    </Center>
  </Container>
  );
};

export default WrongPage;
