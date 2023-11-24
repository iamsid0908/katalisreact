import React from 'react'
import { FiArrowRight } from "react-icons/fi"
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Text,
  useTheme,
} from '@chakra-ui/react';



const MagicStudio = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      title: "AI Product Listing Generator",
      description: "Effortless product listings, powered by AI. List your products on marketplaces with ease",
    },
    {
      id: 2,
      title: "AI Product Ads Generator",
      description: "Increase conversion and revenue. Generate ad creatives with a single image upload.",
    },
    {
      id: 3,
      title: "AI Social Media Generator",
      description: "Experience the power of AI with our Social Media Generator! Say goodbye to social media stress and hello to easy, engaging content.",
    },
  ]

  return (
    <Box w="100%" h="100vh" bg={theme.colors.dashboardBG} color="white">
      <Box mt="50px" ml="50px" h="auto" maxW="900px">
        <Heading fontSize="25px" fontWeight="500">Welcome to Catalis.ai!</Heading>
        <Text mt="20px">What would you like to create today?</Text>
        <Flex flexWrap="wrap">
          {data.map((item) => (
            <Box
              key={item.id}
              w="400px"
              h="220px"
              mr="30px"
              mt="30px"
              display="flex"
              alignItems="flex-start"
              justifyContent="center"
              flexDirection="column"
              bgGradient="linear(135deg, #4F0087, #D101E4)"
              color="white"
              borderRadius="20px"
              onClick={() => {
                navigate('/main/magic-wand');
              }}
              cursor="pointer"
            >
              <Box ml="5%">
                <Box pos="relative" left="320px" w="30px">
                  <FiArrowRight style={{ fontSize: '30px' }} />
                </Box>
                <Heading w="200px" fontSize="20px" fontWeight="600">{item.title}</Heading>
                <Text>{item.description}</Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
}

export default MagicStudio
