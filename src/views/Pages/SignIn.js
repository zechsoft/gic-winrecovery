import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Link,
  Checkbox,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  CloseButton,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useHistory } from "react-router-dom";
import signInImage from "assets/img/signInImage.png";

export default function SignIn() {
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");
  const blueShade = useColorModeValue("#0072ff", "#0072ff");

  // State for form values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Scroll animation states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(true);
  const [isOpened, setIsOpened] = useState(false);

  // Toast for notifications
  const toast = useToast();

  // Initialize useHistory
  const history = useHistory();

  // Scroll event handler - similar to the original JS code
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 3 && !isOpened) {
        setIsOpened(true);
        setShowScrollDown(false);
        openModal();
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpened]);

  // Modal controls
  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "initial";
  };

  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 27) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Function to handle sign in
  const handleSignIn = async () => {
    // Simple validation
    if (!email || !password) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true); // Start loading

    try {
      // Make API call to backend
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Login failed");
      }

      // Extract user role from the response
      const userRole = data.user.role;

      // Success - store user info in localStorage or sessionStorage
      const userData = {
        email: email,
        role: userRole, // Use the role from server response
        isAuthenticated: true,
        token: data.token, // Store the JWT token
      };

      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        sessionStorage.setItem("user", JSON.stringify(userData));
      }

      // Redirect based on role from server response
      if (userRole === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/client/dashboard");
      }

      toast({
        title: "Login Successful",
        description: `Welcome back!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Login Failed",
        description: err.message || "Invalid email or password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <Flex direction="column" align="center" minH="200vh">
      {/* Background container that spans full height to enable scrolling */}
      <Box 
        w="full" 
        h="200vh" 
        position="absolute" 
        bgImage="url(https://images.unsplash.com/photo-1538137524007-21e48fa42f3f)"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        zIndex="-1"
      />
      
      {/* Scroll down indicator */}
      {showScrollDown && (
        <Flex
          position="fixed"
          top="50%"
          left="50%"
          direction="column"
          align="center"
          textAlign="center"
          color={blueShade}
          fontSize="32px"
          fontWeight="800"
          transform="translate(-50%, -50%)"
          zIndex="2"
        >
          SCROLL DOWN
          <Box as="svg" mt="16px" w="52px" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path d="M16 3C8.832031 3 3 8.832031 3 16s5.832031 13 13 13 13-5.832031 13-13S23.167969 3 16 3zm0 2c6.085938 0 11 4.914063 11 11 0 6.085938-4.914062 11-11 11-6.085937 0-11-4.914062-11-11C5 9.914063 9.914063 5 16 5zm-1 4v10.28125l-4-4-1.40625 1.4375L16 23.125l6.40625-6.40625L21 15.28125l-4 4V9z"/>
          </Box>
        </Flex>
      )}

      {/* Modal Button */}
      <Button
        position="fixed"
        left="0"
        bottom="0"
        w="full"
        h="60px"
        bg="rgba(51, 51, 51, 0.5)"
        color={blueShade}
        fontFamily="Nunito, sans-serif"
        fontSize="18px"
        borderRadius="0"
        _hover={{ bg: "rgba(51, 51, 51, 0.6)" }}
        onClick={openModal}
        display={isModalOpen ? "none" : "flex"}
      >
        Click here to login
      </Button>

      {/* Login Modal using Chakra UI */}
      <Modal isOpen={isModalOpen} onClose={closeModal} size="5xl" isCentered>
        <ModalOverlay backdropFilter="blur(5px)" bg="rgba(51, 51, 51, 0.85)" />
        <ModalContent borderRadius="10px" overflow="hidden" maxW="1300px">
          <CloseButton 
            position="absolute" 
            right="10px" 
            top="10px" 
            zIndex="10" 
            onClick={closeModal}
          />
          <ModalBody p="0">
            <Flex w="full" justifyContent="space-between" alignItems="stretch">
              {/* Left Column (Login Form) */}
              <Flex
                w={{ base: "100%", md: "50%" }}
                direction="column"
                bg={bgForm}
                p="60px"
                borderTopLeftRadius="20px"
                borderBottomLeftRadius="20px"
                justifyContent="center"
              >
                <Text fontSize="4xl" color={textColor} fontWeight="bold" textAlign="center" mb="22px">
                  Welcome!
                </Text>
                <Text mb="9" ml="1" textAlign="center" color={textColor}>
                  Enter your email and password to sign in!
                </Text>

                {/* Google Sign-In Button */}
                <Button
                  leftIcon={<FcGoogle />}
                  variant="outline"
                  w="full"
                  h="50px"
                  mb="6"
                  rounded="xl"
                  fontWeight="medium"
                  _hover={{ bg: "gray.200" }}
                >
                  Sign In with Google
                </Button>

                {/* Divider */}
                <Flex mb="6" align="center" justify="center">
                  <Box w="full" borderBottom="1px" borderColor="gray.200" />
                  <Text mx="2" color={textColor}>or</Text>
                  <Box w="full" borderBottom="1px" borderColor="gray.200" />
                </Flex>

                {/* Email Field */}
                <FormControl mb="3">
                  <FormLabel fontSize="sm" fontWeight="normal">Email</FormLabel>
                  <Input
                    variant="flushed"
                    type="email"
                    placeholder="mail@example.com"
                    border="1px solid #e0e0e0"
                    borderRadius={7}
                    h="50px"
                    p="12px"
                    fontSize="16px"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>

                {/* Password Field */}
                <FormControl mb="3">
                  <FormLabel fontSize="sm" fontWeight="normal">Password</FormLabel>
                  <Input
                    variant="flushed"
                    type="password"
                    placeholder="Min. 8 characters"
                    border="1px solid #e0e0e0"
                    borderRadius={7}
                    h="50px"
                    p="12px"
                    fontSize="16px"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>

                {/* Remember Me and Forgot Password */}
                <Flex mb="5" justify="space-between" align="center">
                  <Flex align="center">
                    <Checkbox
                      isChecked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <Text ml="3" fontSize="sm" color={textColor}>Keep me logged In</Text>
                  </Flex>
                  <Link
                    href="/auth/forgot-password"
                    fontSize="sm"
                    fontWeight="medium"
                    color={blueShade}
                    _hover={{ textDecoration: "underline" }}
                  >
                    Forgot Password?
                  </Link>
                </Flex>

                {/* Sign In Button */}
                <Button
                  w="full"
                  rounded="xl"
                  bg="linear-gradient(to right, #00c6ff, #0072ff)"
                  color="white"
                  py="12px"
                  _hover={{ bg: "linear-gradient(to right, #00a1cc, #005bbb)" }}
                  onClick={handleSignIn}
                  isLoading={isLoading}
                >
                  Login
                </Button>

                {/* Create Account Link */}
                <Flex mt="5" justify="center">
                  <Text fontSize="sm" color={textColor}>Don't have an account?</Text>
                  <Link
                    ml="1"
                    fontSize="sm"
                    fontWeight="medium"
                    color={blueShade}
                    _hover={{ textDecoration: "underline" }}
                    onClick={() => history.push("/auth/signup")}
                  >
                    Sign up now
                  </Link>
                </Flex>
              </Flex>

              {/* Right Column (Image Container) */}
              <Box
                w={{ base: "0%", md: "50%" }}
                bgImage="url(https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dfd2ec5a01006fd8c4d7592a381d3776&auto=format&fit=crop&w=1000&q=80)"
                bgSize="cover"
                bgPosition="center"
                display={{ base: "none", md: "block" }}
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}