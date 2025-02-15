import React from 'react';
import { Box, Flex, Button, Text, Select } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout, setLocation } from '../store/slices/authSlice';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLocation(e.target.value));
  };

  return (
    <Box bg="teal.500" px={4} py={2}>
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto">
        <Flex align="center">
          <Link to="/">
            <Text fontSize="xl" color="white" fontWeight="bold" mr={8}>
              Local Suggestions
            </Text>
          </Link>
          {user && (
            <Select
              w="200px"
              bg="white"
              value={user.location || ''}
              onChange={handleLocationChange}
              placeholder="Select location"
            >
              <option value="istanbul">Istanbul</option>
              <option value="ankara">Ankara</option>
              <option value="izmir">Izmir</option>
              {/* Add more cities as needed */}
            </Select>
          )}
        </Flex>
        
        <Flex align="center">
          {user ? (
            <>
              <Text color="white" mr={4}>
                Welcome, {user.username}
              </Text>
              <Link to="/create-suggestion">
                <Button colorScheme="whiteAlpha" mr={4}>
                  Create Suggestion
                </Button>
              </Link>
              <Button colorScheme="whiteAlpha" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button colorScheme="whiteAlpha" mr={4}>
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button colorScheme="whiteAlpha">
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