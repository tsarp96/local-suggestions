import React from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Icon,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaMapMarkerAlt, FaThumbsUp, FaComments, FaUsers, FaTags, FaCity } from 'react-icons/fa';

const Feature = ({ title, text, icon }: { title: string; text: string; icon: any }) => {
  return (
    <VStack
      p={5}
      bg={useColorModeValue('white', 'gray.800')}
      rounded="lg"
      shadow="md"
      borderWidth="1px"
      spacing={3}
      align="start"
      h="full"
    >
      <Flex
        w={12}
        h={12}
        align="center"
        justify="center"
        rounded="full"
        bg="teal.500"
        color="white"
      >
        <Icon as={icon} boxSize={6} />
      </Flex>
      <Heading size="md">{title}</Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>{text}</Text>
    </VStack>
  );
};

const LandingPage = () => {
  const features = [
    {
      icon: FaCity,
      title: 'Local Focus',
      text: 'Discover and share suggestions specific to your city and district.',
    },
    {
      icon: FaTags,
      title: 'Categories',
      text: 'Browse suggestions by categories like restaurants, shopping, entertainment, and more.',
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location-Based',
      text: 'Find suggestions relevant to your area with our location-based filtering.',
    },
    {
      icon: FaThumbsUp,
      title: 'Voting System',
      text: 'Vote on suggestions to help the best ones stand out in the community.',
    },
    {
      icon: FaUsers,
      title: 'Community Driven',
      text: 'Join a community of locals sharing their knowledge and experiences.',
    },
    {
      icon: FaComments,
      title: 'Share Ideas',
      text: 'Create and share your own suggestions to help others discover local gems.',
    },
  ];

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh">
      {/* Hero Section */}
      <Box 
        bg="teal.500" 
        color="white" 
        py={{ base: 16, md: 24 }} 
        px={4}
      >
        <Container maxW="container.xl">
          <VStack spacing={6} align="center" textAlign="center">
            <Heading
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="bold"
              lineHeight="shorter"
            >
              Discover Your City's Hidden Gems
            </Heading>
            <Text 
              fontSize={{ base: 'lg', md: 'xl' }}
              maxW="2xl"
              opacity={0.9}
            >
              Local Suggestions connects you with your community's best recommendations. 
              Share, discover, and vote on local places and experiences.
            </Text>
            <Button
              as={RouterLink}
              to="/register"
              size="lg"
              colorScheme="white"
              variant="outline"
              _hover={{ bg: 'whiteAlpha.200' }}
              fontSize="md"
              height="14"
              px="8"
            >
              Join the Community
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="container.xl" py={{ base: 12, md: 20 }}>
        <VStack spacing={12}>
          <Heading 
            textAlign="center"
            size="xl"
            color={useColorModeValue('gray.700', 'white')}
          >
            Everything You Need to Explore Local Places
          </Heading>
          
          <SimpleGrid 
            columns={{ base: 1, md: 2, lg: 3 }} 
            spacing={8} 
            w="full"
          >
            {features.map((feature, index) => (
              <Feature
                key={index}
                icon={feature.icon}
                title={feature.title}
                text={feature.text}
              />
            ))}
          </SimpleGrid>

          <Button
            as={RouterLink}
            to="/login"
            size="lg"
            colorScheme="teal"
            fontSize="md"
            height="14"
            px="8"
            mt={8}
          >
            Start Exploring
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default LandingPage; 