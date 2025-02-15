import React from 'react';
import { Box, Flex, Button, Text, Link as ChakraLink } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { logout } from '../store/slices/authSlice';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box bg="teal.500" px={6} py={3}>
      <Flex justify="space-between" align="center" maxW="1400px" mx="auto">
        <Link to="/">
          <Flex
            w="40px"
            h="40px"
            bg="white"
            color="teal.500"
            align="center"
            justify="center"
            borderRadius="md"
            fontSize="24px"
            fontWeight="bold"
            position="relative"
            _hover={{ bg: 'whiteAlpha.900' }}
          >
            <Box
              position="absolute"
              bottom="2px"
              right="2px"
              w="20px"
              h="20px"
              bg="teal.500"
              borderRadius="sm"
            />
            <Text position="relative" zIndex={1}>L</Text>
          </Flex>
        </Link>

        <Flex align="center" gap={4}>
          {user ? (
            <>
              <Text color="white" fontSize="md">
                Welcome, {user.username}
              </Text>
              <Link to="/create-suggestion">
                <Button 
                  colorScheme="whiteAlpha" 
                  size="sm"
                  leftIcon={<Text>✨</Text>}
                >
                  Create
                </Button>
              </Link>
              <Button 
                colorScheme="whiteAlpha" 
                size="sm"
                variant="ghost"
                onClick={handleLogout}
              >
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