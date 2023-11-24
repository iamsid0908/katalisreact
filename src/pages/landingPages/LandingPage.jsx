import { Button, Flex, Heading, Text, useTheme } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { GiElectric } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [cookies] = useCookies(["KatalisAuth"]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthenticated = cookies.KatalisAuth !== undefined;
    setIsAuthenticated(isAuthenticated);
  }, [cookies]);

  return (
    <Flex
      width="100%"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Flex
        maxW={"6xl"}
        height="100vh"
        width="100%"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        // backgroundColor="yellow"
      >
        <Flex flexDir="column" textAlign="center">
          <Heading color={theme.colors.button.buttonColor}>
            Welcome to Katalis.AI
          </Heading>

          <Text my="3">Explore Now !</Text>
        </Flex>
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          gap="1rem"
        >
          {isAuthenticated ? (
            <Button
              onClick={() => navigate("/main/magic-wand")}
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
              <GiElectric /> Go to Dashboard
            </Button>
          ) : (
            <Flex gap="1rem">
              <Button
                onClick={() => navigate("/login")}
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
                <GiElectric /> Sign In.
              </Button>

              <Button
                onClick={() => navigate("/register")}
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
                <GiElectric /> Sign Up.
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LandingPage;
