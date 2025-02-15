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

    try {
      await dispatch(voteSuggestion({ id: suggestion.id, type })).unwrap();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to vote',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Split location into city and district
  const [city, district] = suggestion.location.split(' - ');

  const isLiked = user && suggestion.votes.likes.includes(user.id);
  const isUnliked = user && suggestion.votes.unlikes.includes(user.id);
  const voteCount = suggestion.votes.likes.length - suggestion.votes.unlikes.length;

  return (
    <Box
      borderWidth={1}
      borderRadius="xl"
      overflow="hidden"
      bg="white"
      h="500px"
      position="relative"
      boxShadow="xl"
    >
      {/* Card Content */}
      <VStack h="100%" spacing={0}>
        {/* Header Section */}
        <Box w="100%" p={4} bg="white">
          <Flex justify="space-between" align="center" mb={2}>
            <Heading size="md" noOfLines={2}>{suggestion.title}</Heading>
            <Badge colorScheme="teal" fontSize="sm" px={2} py={1} borderRadius="full">
              {suggestion.category.name}
            </Badge>
          </Flex>
        </Box>

        {/* Main Content Section */}
        <Box flex={1} w="100%" p={4} bg="gray.50">
          <Text color="gray.700" fontSize="md" mb={4}>
            {suggestion.description}
          </Text>

          <HStack spacing={2} mb={4}>
            <Tag size="md" variant="subtle" colorScheme="cyan">
              <TagLeftIcon as={FaMapMarkerAlt} />
              <TagLabel fontWeight="medium">{city}</TagLabel>
            </Tag>
            {district && (
              <Tag size="md" variant="subtle" colorScheme="blue">
                <TagLabel>{district}</TagLabel>
              </Tag>
            )}
          </HStack>

          <Flex align="center" gap={2}>
            <Tag size="sm" variant="subtle" colorScheme="gray">
              <TagLeftIcon boxSize="3" as={FaUser} />
              <TagLabel fontSize="sm">{suggestion.author.username}</TagLabel>
            </Tag>
          </Flex>
        </Box>

        {/* Footer Section */}
        <Box w="100%" p={4} bg="white" borderTop="1px" borderColor="gray.100">
          <Flex justify="center" align="center" gap={4}>
            <IconButton
              aria-label="Unlike"
              icon={<FaThumbsDown />}
              colorScheme={isUnliked ? 'red' : 'gray'}
              variant={isUnliked ? 'solid' : 'outline'}
              size="lg"
              isRound
              onClick={() => handleVote('unlike')}
            />
            <Text 
              fontSize="xl" 
              fontWeight="bold" 
              color={voteCount > 0 ? 'teal.500' : voteCount < 0 ? 'red.500' : 'gray.500'}
              minW="40px"
              textAlign="center"
            >
              {voteCount}
            </Text>
            <IconButton
              aria-label="Like"
              icon={<FaThumbsUp />}
              colorScheme={isLiked ? 'teal' : 'gray'}
              variant={isLiked ? 'solid' : 'outline'}
              size="lg"
              isRound
              onClick={() => handleVote('like')}
            />
          </Flex>
        </Box>
      </VStack>
    </Box>
  );
};

export default SuggestionCard; 