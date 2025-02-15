import React, { useEffect } from 'react';
import { Box, Flex, Button, Text, Select, HStack, FormControl } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { logout } from '../store/slices/authSlice';
import { fetchCities, fetchDistricts, setSelectedCity, setSelectedDistrict } from '../store/slices/locationSlice';
import { fetchSuggestions } from '../store/slices/suggestionSlice';
import { City, District } from '../types';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { cities, selectedCity, selectedDistrict } = useSelector((state: RootState) => state.locations);

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleCityChange = async (cityId: string) => {
    const city = cities.find((c: City) => c._id === cityId);
    if (city) {
      dispatch(setSelectedCity(city));
      dispatch(fetchDistricts(cityId));
      // Fetch suggestions with new city filter
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
      // Fetch suggestions with city and district filter
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

  return (
    <Box bg="teal.500" px={4} py={2}>
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        <Flex align="center" gap={4}>
          <Link to="/">
            <Text fontSize="xl" color="white" fontWeight="bold">
              Local Suggestions
            </Text>
          </Link>
          
          {user && (
            <HStack spacing={2}>
              <FormControl maxW="150px">
                <Select
                  size="sm"
                  bg="white"
                  value={selectedCity?._id || ''}
                  onChange={(e) => handleCityChange(e.target.value)}
                  placeholder="Select City"
                >
                  {cities.map((city: City) => (
                    <option key={city._id} value={city._id}>
                      {city.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl maxW="150px" isDisabled={!selectedCity}>
                <Select
                  size="sm"
                  bg="white"
                  value={selectedDistrict?._id || ''}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  placeholder="Select District"
                >
                  {selectedCity?.districts.map((district: District) => (
                    <option key={district._id} value={district._id}>
                      {district.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </HStack>
          )}
        </Flex>
        
        <Flex align="center" gap={4}>
          {user ? (
            <>
              <Text color="white">
                Welcome, {user.username}
              </Text>
              <Link to="/create-suggestion">
                <Button colorScheme="whiteAlpha" size="sm">
                  Create Suggestion
                </Button>
              </Link>
              <Button colorScheme="whiteAlpha" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button colorScheme="whiteAlpha" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button colorScheme="whiteAlpha" size="sm">
                  Register
                </Button>
              </Link>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar; 