import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Select,
  Heading,
  Text,
  Flex,
  Button,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuggestions } from '../store/slices/suggestionSlice';
import { fetchCategories } from '../store/slices/categorySlice';
import { AppDispatch, RootState } from '../store';
import SuggestionCard from '../components/SuggestionCard';
import { Category } from '../types';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { suggestions, isLoading, error } = useSelector(
    (state: RootState) => state.suggestions
  );
  const { categories } = useSelector((state: RootState) => state.categories);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (user?.location) {
      dispatch(fetchSuggestions({ location: user.location }));
    }
  }, [dispatch, user?.location]);

  const handleCategoryFilter = (categoryId: string) => {
    dispatch(fetchSuggestions({ 
      location: user?.location,
      category: categoryId 
    }));
  };

  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text color="red.500">{error}</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading size="lg">Local Suggestions</Heading>
        <Select
          w="200px"
          placeholder="Filter by category"
          onChange={(e) => handleCategoryFilter(e.target.value)}
        >
          {categories.map((category: Category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </Flex>

      {isLoading ? (
        <Text>Loading suggestions...</Text>
      ) : suggestions.length === 0 ? (
        <Text>No suggestions found for this location.</Text>
      ) : (
        <Grid
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          gap={6}
        >
          {suggestions.map((suggestion) => (
            <SuggestionCard
              key={suggestion.id}
              suggestion={suggestion}
            />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home; 