import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  Select,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createSuggestion } from '../store/slices/suggestionSlice';
import { fetchCategories } from '../store/slices/categorySlice';
import { AppDispatch, RootState } from '../store';
import { Category } from '../types';

const CreateSuggestion: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [coordinates, setCoordinates] = useState<[number, number]>([0, 0]);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const toast = useToast();
  
  const { categories } = useSelector((state: RootState) => state.categories);
  const { user } = useSelector((state: RootState) => state.auth);
  const { isLoading } = useSelector((state: RootState) => state.suggestions);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.location) {
      toast({
        title: 'Error',
        description: 'Please select a location first',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const selectedCategory = categories.find(c => c.id === categoryId);
      if (!selectedCategory) {
        toast({
          title: 'Error',
          description: 'Please select a valid category',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      await dispatch(createSuggestion({
        title,
        description,
        category: selectedCategory,
        location: user.location,
        coordinates: {
          type: 'Point',
          coordinates,
        },
      })).unwrap();
      
      toast({
        title: 'Success',
        description: 'Suggestion created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create suggestion',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Heading>Create Suggestion</Heading>

        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            rows={4}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Category</FormLabel>
          <Select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            placeholder="Select category"
          >
            {categories.map((category: Category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          colorScheme="teal"
          width="full"
          isLoading={isLoading}
        >
          Create Suggestion
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateSuggestion; 