import React from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  Badge,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
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

  const isLiked = user && suggestion.votes.likes.includes(user.id);
  const isUnliked = user && suggestion.votes.unlikes.includes(user.id);
  const voteCount = suggestion.votes.likes.length - suggestion.votes.unlikes.length;

  return (
    <Box
      borderWidth={1}
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="sm"
      bg="white"
    >
      <Flex justify="space-between" align="start" mb={2}>
        <Heading size="md">{suggestion.title}</Heading>
        <Badge colorScheme="teal">{suggestion.category.name}</Badge>
      </Flex>

      <Text mb={4} color="gray.600">
        {suggestion.description}
      </Text>

      <Text fontSize="sm" color="gray.500" mb={2}>
        Location: {suggestion.location}
      </Text>

      <Text fontSize="sm" color="gray.500" mb={4}>
        Posted by: {suggestion.author.username}
      </Text>

      <Flex justify="space-between" align="center">
        <Flex align="center" gap={2}>
          <IconButton
            aria-label="Like"
            icon={<FaThumbsUp />}
            colorScheme={isLiked ? 'teal' : 'gray'}
            variant={isLiked ? 'solid' : 'outline'}
            onClick={() => handleVote('like')}
          />
          <Text>{voteCount}</Text>
          <IconButton
            aria-label="Unlike"
            icon={<FaThumbsDown />}
            colorScheme={isUnliked ? 'red' : 'gray'}
            variant={isUnliked ? 'solid' : 'outline'}
            onClick={() => handleVote('unlike')}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default SuggestionCard; 