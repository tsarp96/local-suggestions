import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Select,
  Heading,
  Text,
  Flex,
  HStack,
  FormControl,
  FormLabel,
  Center,
  VStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuggestions } from '../store/slices/suggestionSlice';
import { fetchCategories } from '../store/slices/categorySlice';
import { fetchCities, fetchDistricts, setSelectedCity, setSelectedDistrict } from '../store/slices/locationSlice';
import { AppDispatch, RootState } from '../store';
import SuggestionCard from '../components/SuggestionCard';
import { Category, City, District } from '../types';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { suggestions, isLoading, error } = useSelector(
    (state: RootState) => state.suggestions
  );
  const { categories } = useSelector((state: RootState) => state.categories);
  const { cities, selectedCity, selectedDistrict } = useSelector((state: RootState) => state.locations);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCities());
  }, [dispatch]);

  const handleCityChange = async (cityId: string) => {
    const city = cities.find((c: City) => c._id === cityId);
    if (city) {
      dispatch(setSelectedCity(city));
      dispatch(fetchDistricts(cityId));
      dispatch(fetchSuggestions({ 
        location: city.name,
        category: undefined 
      }));
    } else {
      dispatch(setSelectedCity(null));
      dispatch(setSelectedDistrict(null));
      dispatch(fetchSuggestions({}));
    }
  };

  const handleDistrictChange = (districtId: string) => {
    if (!selectedCity) return;
    
    const district = selectedCity.districts.find((d: District) => d._id === districtId);
    if (district) {
      dispatch(setSelectedDistrict(district));
      dispatch(fetchSuggestions({ 
        location: `${selectedCity.name} - ${district.name}`,
        category: undefined 
      }));
    } else {
      dispatch(setSelectedDistrict(null));
      dispatch(fetchSuggestions({ 
        location: selectedCity.name,
        category: undefined 
      }));
    }
  };

  const handleCategoryFilter = (categoryId: string) => {
    dispatch(fetchSuggestions({ 
      location: selectedDistrict 
        ? `${selectedCity?.name} - ${selectedDistrict.name}`
        : selectedCity?.name,
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
      <VStack spacing={8}>
        <Heading size="lg">Local Suggestions</Heading>
        
        <HStack spacing={4} wrap="wrap">
          <FormControl maxW="200px">
            <FormLabel>City</FormLabel>
            <Select
              value={selectedCity?._id || ''}
              onChange={(e) => handleCityChange(e.target.value)}
              placeholder="All Cities"
            >
              {cities.map((city: City) => (
                <option key={city._id} value={city._id}>
                  {city.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl maxW="200px" isDisabled={!selectedCity}>
            <FormLabel>District</FormLabel>
            <Select
              value={selectedDistrict?._id || ''}
              onChange={(e) => handleDistrictChange(e.target.value)}
              placeholder="All Districts"
            >
              {selectedCity?.districts.map((district: District) => (
                <option key={district._id} value={district._id}>
                  {district.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl maxW="200px">
            <FormLabel>Category</FormLabel>
            <Select
              placeholder="All Categories"
              onChange={(e) => handleCategoryFilter(e.target.value)}
            >
              {categories.map((category: Category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </HStack>

        {isLoading ? (
          <Center h="60vh">
            <Text>Loading suggestions...</Text>
          </Center>
        ) : suggestions.length === 0 ? (
          <Center h="60vh">
            <Text>No suggestions found for this location.</Text>
          </Center>
        ) : (
          <Box h="60vh" w="100%" maxW="600px" mx="auto" position="relative">
            {suggestions.map((suggestion, index) => (
              <Box
                key={suggestion.id}
                position={index === 0 ? "relative" : "absolute"}
                top="0"
                left="0"
                right="0"
                opacity={index === 0 ? 1 : 0}
                transform={`scale(${1 - index * 0.05})`}
                transition="all 0.3s ease"
                pointerEvents={index === 0 ? "auto" : "none"}
              >
                <SuggestionCard suggestion={suggestion} />
              </Box>
            ))}
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Home; 