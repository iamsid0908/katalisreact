import {
  Button,
  Card,
  CardBody,
  Center,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
  useTheme,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
const Register = () => {
  const theme = useTheme();
  const toast = useToast();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitRegisterForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!registerEmail || !registerPassword) {
      setLoading(false);
      toast({
        title: "Please fill all the fields",
        variant: "left-accent",
        position: "top",
        isClosable: true,
        duration: 2000,
        status: "error",
      });
      return;
    } else {
      setLoading(false)
      toast({
        title: "We are not accepting new users right now! ",
        variant: "left-accent",
        position: "top",
        isClosable: true,
        duration: 2000,
        status: "error",
      });
      return
    }

  }

  return (
    <Container>
      <Center>
        <VStack as="header" spacing={6} mt="8">
          <Card
            bg="#f6f8fa"
            variant="outline"
            borderColor="#d8dee4"
            width={"25rem"}
            p={"1.2rem"}
          >
            <Stack>
              <Heading
                as="h1"
                fontWeight={500}
                fontSize={24}
                textAlign={"center"}
              >
                Sign up.
              </Heading>
              <Text textAlign={"center"}>
              </Text>
            </Stack>
            <CardBody>
              <form onSubmit={submitRegisterForm}>
                <Stack spacing="4">
                  <FormControl>
                    <FormLabel size="sm" fontWeight={400}>
                      Username or Email*
                    </FormLabel>
                    <Input
                      type="text"
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                      p={"1.2rem"}
                      placeholder="julie@example.com"
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      _focus={{ borderColor: "#8b3dff", boxShadow: "none" }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel size="sm" fontWeight={400}>
                      Password*
                    </FormLabel>
                    <Input
                      type="password"
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                      p={"1.2rem"}
                      //   placeholder="Password *"
                      placeholder="1234"
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      _focus={{ borderColor: "#8b3dff", boxShadow: "none" }}
                    />
                  </FormControl>
                  <Button type="submit" isLoading={loading} loadingText="Signing in..."
                    gap="0.5rem"
                    borderRadius="20px"
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
                    Sign Up
                  </Button>
                </Stack>
              </form>
            </CardBody>
          </Card>

          <Card variant="outline" borderColor="#d0d7de" width={"25rem"}>
            <CardBody>
              <HStack fontSize="sm" spacing={1} justifyContent="space-between">
                <Text>Aleady have an account?</Text>

                <ChakraLink color={"#8b3dff"} as={ReactRouterLink} to="/login">
                  Sign in.
                </ChakraLink>
              </HStack>
            </CardBody>
          </Card>
        </VStack>
      </Center>
    </Container>
  );
};

export default Register;
