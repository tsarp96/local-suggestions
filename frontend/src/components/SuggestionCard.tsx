import React from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  Badge,
  IconButton,
  useToast,
  HStack,
  Tag,
  TagLeftIcon,
  TagLabel,
  VStack,
} from '@chakra-ui/react';
import { FaThumbsUp, FaThumbsDown, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { voteSuggestion } from '../store/slices/suggestionSlice';
import { Suggestion } from '../types';
import { AppDispatch, RootState } from '../store';

interface SuggestionCardProps {
  suggestion: Suggestion;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestion }) => {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleVote = async (type: 'like' | 'unlike') => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'Please login to vote',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!suggestion._id) return;
    
    try {
        await dispatch(voteSuggestion({ id: suggestion._id, type })).unwrap();
    } catch (error) {
        console.error('Failed to vote:', error);
    }
  };

  // Split location into city and district
  const [city, district] = suggestion.location.split(' - ');

  const isLiked = user && suggestion.votes.likes.includes(user._id);
  const isUnliked = user && suggestion.votes.unlikes.includes(user._id);

  return (
    <Box
      borderWidth={1}
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      minH={{ base: "400px", md: "500px" }}
      position="relative"
      boxShadow="md"
      mx={{ base: 2, md: 0 }}
    >
      <VStack h="100%" spacing={0}>
        {/* Header Section */}
        <Box w="100%" p={{ base: 3, md: 4 }} bg="white">
          <Flex 
            direction={{ base: "column", sm: "row" }} 
            justify="space-between" 
            align={{ base: "start", sm: "center" }} 
            gap={2}
          >
            <Heading size="md" noOfLines={2}>{suggestion.title}</Heading>
            <Badge 
              colorScheme="teal" 
              fontSize="sm" 
              px={2} 
              py={1} 
              borderRadius="full"
              alignSelf={{ base: "flex-start", sm: "center" }}
            >
              {typeof suggestion.category === 'string' ? suggestion.category : suggestion.category.name}
            </Badge>
          </Flex>
        </Box>

        {/* Main Content Section */}
        <Box flex={1} w="100%" p={{ base: 3, md: 4 }} bg="gray.50">
          <Text 
            color="gray.700" 
            fontSize={{ base: "sm", md: "md" }} 
            mb={4}
            noOfLines={{ base: 4, md: 6 }}
          >
            {suggestion.description}
          </Text>

          <VStack spacing={3} align="flex-start">
            <HStack spacing={2} flexWrap="wrap">
              <Tag size={{ base: "sm", md: "md" }} variant="subtle" colorScheme="cyan">
                <TagLeftIcon as={FaMapMarkerAlt} />
                <TagLabel fontWeight="medium">{city}</TagLabel>
              </Tag>
              {district && (
                <Tag size={{ base: "sm", md: "md" }} variant="subtle" colorScheme="blue">
                  <TagLabel>{district}</TagLabel>
                </Tag>
              )}
            </HStack>

            <Tag size="sm" variant="subtle" colorScheme="gray">
              <TagLeftIcon boxSize="3" as={FaUser} />
              <TagLabel fontSize="sm">{suggestion.author.username}</TagLabel>
            </Tag>
          </VStack>
        </Box>

        {/* Footer Section */}
        <Box 
          w="100%" 
          p={{ base: 3, md: 4 }} 
          bg="white" 
          borderTop="1px" 
          borderColor="gray.100"
        >
          <Flex justify="center" align="center" gap={{ base: 8, md: 12 }}>
            <Flex direction="column" align="center">
              <IconButton
                aria-label="Unlike"
                icon={<FaThumbsDown />}
                colorScheme={isUnliked ? 'red' : 'gray'}
                variant={isUnliked ? 'solid' : 'outline'}
                size={{ base: "md", md: "lg" }}
                isRound
                onClick={() => handleVote('unlike')}
              />
              <Text 
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="bold" 
                color="red.500"
                mt={2}
              >
                {suggestion.votes.unlikes.length}
              </Text>
            </Flex>

            <Flex direction="column" align="center">
              <IconButton
                aria-label="Like"
                icon={<FaThumbsUp />}
                colorScheme={isLiked ? 'teal' : 'gray'}
                variant={isLiked ? 'solid' : 'outline'}
                size={{ base: "md", md: "lg" }}
                isRound
                onClick={() => handleVote('like')}
              />
              <Text 
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="bold" 
                color="teal.500"
                mt={2}
              >
                {suggestion.votes.likes.length}
              </Text>
            </Flex>
          </Flex>
        </Box>
      </VStack>
    </Box>
  );
};

export default SuggestionCard; 