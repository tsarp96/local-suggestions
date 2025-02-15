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
import { fetchCities, fetchDistricts, setSelectedCity, setSelectedDistrict } from '../store/slices/locationSlice';
import { AppDispatch, RootState } from '../store';
import { Category } from '../types';

const CreateSuggestion: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [coordinates] = useState<[number, number]>([0, 0]);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const toast = useToast();
  
  const { categories } = useSelector((state: RootState) => state.categories);
  const { cities, selectedCity, selectedDistrict } = useSelector((state: RootState) => state.locations);
  const { isLoading } = useSelector((state: RootState) => state.suggestions);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCities());
  }, [dispatch]);

  const handleCityChange = async (cityId: string) => {
    const city = cities.find(c => c._id === cityId);
    if (city) {
      dispatch(setSelectedCity(city));
      dispatch(fetchDistricts(cityId));
    }
  };

  const handleDistrictChange = (districtId: string) => {
    const district = selectedCity?.districts.find(d => d._id === districtId);
    if (district) {
      dispatch(setSelectedDistrict(district));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCity || !selectedDistrict) {
      toast({
        title: 'Error',
        description: 'Please select both city and district',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const selectedCategory = categories.find(c => c._id === categoryId);
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

      const suggestionData = {
        title,
        description,
        category: selectedCategory._id,
        location: `${selectedCity.name} - ${selectedDistrict.name}`,
        coordinates: {
          type: "Point" as const,
          coordinates,
        },
      };
      
      console.log('Creating suggestion with data:', suggestionData);
      
      await dispatch(createSuggestion(suggestionData)).unwrap();
      
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
          <FormLabel>City</FormLabel>
          <Select
            value={selectedCity?._id || ''}
            onChange={(e) => handleCityChange(e.target.value)}
            placeholder="Select city"
          >
            {cities.map((city) => (
              <option key={city._id} value={city._id}>
                {city.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired isDisabled={!selectedCity}>
          <FormLabel>District</FormLabel>
          <Select
            value={selectedDistrict?._id || ''}
            onChange={(e) => handleDistrictChange(e.target.value)}
            placeholder="Select district"
          >
            {selectedCity?.districts.map((district) => (
              <option key={district._id} value={district._id}>
                {district.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Category</FormLabel>
          <Select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            placeholder="Select category"
          >
            {categories.map((category: Category) => (
              <option key={category._id} value={category._id}>
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