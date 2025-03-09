import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
  Select,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import { useHistory } from "react-router-dom";

function SignUp() {
  const bgForm = useColorModeValue("white", "navy.800");
  const titleColor = useColorModeValue("gray.700", "blue.500");
  const textColor = useColorModeValue("gray.700", "white");
  const colorIcons = useColorModeValue("gray.700", "white");
  const bgIcons = useColorModeValue("transparent", "navy.700");
  const bgIconsHover = useColorModeValue("gray.50", "whiteAlpha.100");

  // State for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state for API call

  const toast = useToast();
  const history = useHistory();

  const handleSignUp = async () => {
    // Simple validation
    if (!name || !email || !password || !role) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Password validation (min 8 characters)
    if (password.length < 8) {
      toast({
        title: "Invalid password",
        description: "Password must be at least 8 characters long",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true); // Start loading

    try {
      // Make API call to backend
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Registration failed");
      }

      // Store user data in localStorage or sessionStorage
      const userData = {
        email,
        role,
        isAuthenticated: true,
        token: data.token, // Store the JWT token
      };

      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        sessionStorage.setItem("user", JSON.stringify(userData));
      }

      toast({
        title: "Registration Successful",
        description: `Welcome ${name}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Redirect based on role
      if (role === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/client/dashboard");
      }
    } catch (err) {
      toast({
        title: "Registration Failed",
        description: err.message || "An error occurred during registration",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleNavigateToSignIn = () => {
    history.push("/auth/signin");
  };

  return (
    <Flex direction="column" alignSelf="center" justifySelf="center" overflow="hidden">
      <Box
        position="absolute"
        minH={{ base: "70vh", md: "50vh" }}
        maxH={{ base: "70vh", md: "50vh" }}
        w={{ md: "calc(100vw - 50px)" }}
        maxW={{ md: "calc(100vw - 50px)" }}
        left="0"
        right="0"
        bgRepeat="no-repeat"
        overflow="hidden"
        zIndex="-1"
        top="0"
        bgImage="assets/img/BgSignUp.png"
        bgSize="cover"
        mx={{ md: "auto" }}
        mt={{ md: "14px" }}
        borderRadius={{ base: "0px", md: "20px" }}
      >
        <Box w="100vw" h="100vh" bg="blue.500" opacity="0.8"></Box>
      </Box>
      <Flex
        direction="column"
        textAlign="center"
        justifyContent="center"
        align="center"
        mt="125px"
        mb="30px"
      >
        <Text fontSize="4xl" color="white" fontWeight="bold">
          Welcome!
        </Text>
        <Text
          fontSize="md"
          color="white"
          fontWeight="normal"
          mt="10px"
          mb="26px"
          w={{ base: "90%", sm: "60%", lg: "40%", xl: "333px" }}
        >
          Use these awesome forms to login or create a new account in your project for free.
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
        <Flex
          direction="column"
          w="445px"
          background="transparent"
          borderRadius="15px"
          p="40px"
          mx={{ base: "100px" }}
          bg={bgForm}
          boxShadow={useColorModeValue("0px 5px 14px rgba(0, 0, 0, 0.05)", "unset")}
        >
          <Text fontSize="xl" color={textColor} fontWeight="bold" textAlign="center" mb="22px">
            Register With
          </Text>
          <HStack spacing="15px" justify="center" mb="22px">
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="8px"
              border={useColorModeValue("1px solid", "0px")}
              borderColor="gray.200"
              cursor="pointer"
              transition="all .25s ease"
              bg={bgIcons}
              _hover={{ bg: bgIconsHover }}
            >
              <Link href="#">
                <Icon as={FaFacebook} color={colorIcons} w="30px" h="30px" />
              </Link>
            </Flex>
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="8px"
              border={useColorModeValue("1px solid", "0px")}
              borderColor="gray.200"
              cursor="pointer"
              transition="all .25s ease"
              bg={bgIcons}
              _hover={{ bg: bgIconsHover }}
            >
              <Link href="#">
                <Icon as={FaApple} color={colorIcons} w="30px" h="30px" _hover={{ filter: "brightness(120%)" }} />
              </Link>
            </Flex>
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="8px"
              border={useColorModeValue("1px solid", "0px")}
              borderColor="gray.200"
              cursor="pointer"
              transition="all .25s ease"
              bg={bgIcons}
              _hover={{ bg: bgIconsHover }}
            >
              <Link href="#">
                <Icon as={FaGoogle} color={colorIcons} w="30px" h="30px" _hover={{ filter: "brightness(120%)" }} />
              </Link>
            </Flex>
          </HStack>
          <Text fontSize="lg" color="gray.400" fontWeight="bold" textAlign="center" mb="22px">
            or
          </Text>
          <FormControl>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Name
            </FormLabel>
            <Input
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="text"
              placeholder="Your full name"
              mb="24px"
              size="lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Email
            </FormLabel>
            <Input
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="email"
              placeholder="Your email address"
              mb="24px"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Password
            </FormLabel>
            <Input
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="password"
              placeholder="Your password"
              mb="24px"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Role
            </FormLabel>
            <Select
              placeholder="Select role"
              mb="24px"
              size="lg"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              sx={{
                fontSize: "sm",
                _hover: {
                  borderColor: "blue.500",
                },
                _focus: {
                  borderColor: "blue.500",
                  boxShadow: "none",
                },
                "& option": {
                  fontSize: "sm",
                },
              }}
            >
              <option value="admin">Admin</option>
              <option value="client">Client</option>
            </Select>
            <FormControl display="flex" alignItems="center" mb="24px">
              <Switch
                id="remember-login"
                colorScheme="blue"
                me="10px"
                isChecked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <FormLabel htmlFor="remember-login" mb="0" fontWeight="normal">
                Remember me
              </FormLabel>
            </FormControl>
            <Button
              fontSize="10px"
              variant="dark"
              fontWeight="bold"
              w="100%"
              h="45"
              mb="24px"
              onClick={handleSignUp}
              isLoading={isLoading}
            >
              SIGN UP
            </Button>
          </FormControl>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColor} fontWeight="medium">
              Already have an account?
              <Link
                color={titleColor}
                as="span"
                ms="5px"
                href="#"
                fontWeight="bold"
                onClick={handleNavigateToSignIn}
              >
                Sign In
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignUp;