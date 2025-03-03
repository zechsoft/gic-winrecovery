import React, { useState } from "react";
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
  Select,
  useToast,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useHistory } from "react-router-dom";
import signInImage from "assets/img/signInImage.png";

// Sample user credentials
const sampleUsers = {
  admin: {
    "admin@example.com": { password: "Admin123!", role: "admin" },
  },
  client: {
    "client1@example.com": { password: "Client1!", role: "client" },
    "client2@example.com": { password: "Client2!", role: "client" },
    "client3@example.com": { password: "Client3!", role: "client" },
    "client4@example.com": { password: "Client4!", role: "client" },
  },
};

export default function SignIn() {
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");
  const blueShade = useColorModeValue("#0072ff", "#0072ff");

  // State for form values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Toast for notifications
  const toast = useToast();

  // Initialize useHistory
  const history = useHistory();

  // Function to handle sign in
  const handleSignIn = () => {
    // Simple validation
    if (!email || !password || !role) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Check if the email exists in the selected role
    const roleUsers = sampleUsers[role];
    if (!roleUsers || !roleUsers[email]) {
      toast({
        title: "Authentication failed",
        description: "Email not found for selected role",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Check if password is correct
    const user = roleUsers[email];
    if (user.password !== password) {
      toast({
        title: "Authentication failed",
        description: "Invalid password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Success - store user info in localStorage
    const userData = {
      email,
      role: user.role,
      isAuthenticated: true,
    };

    // Store in localStorage if rememberMe is checked
    if (rememberMe) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      // Use sessionStorage if not remembering
      sessionStorage.setItem("user", JSON.stringify(userData));
    }

    // Redirect based on role
    if (user.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/client/dashboard");
    }

    toast({
      title: "Login Successful",
      description: `Welcome ${email}!`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Flex direction="column" align="center" minH="80vh">
      <Flex
        position="relative"
        mt="40px"
        justifyContent="center"
        alignItems="center"
        w="full"
      >
        <Flex
          w={{ base: "90%", md: "1300px" }}
          justifyContent="space-between"
          alignItems="stretch"
          boxShadow={useColorModeValue("0px 5px 14px rgba(67, 55, 226, 0.05)", "unset")}
        >
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
              Sign In
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
              <FormLabel fontSize="sm" fontWeight="normal">Email*</FormLabel>
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
              <FormLabel fontSize="sm" fontWeight="normal">Password*</FormLabel>
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

            {/* Role Dropdown */}
            <FormControl mb="3">
              <FormLabel fontSize="sm" fontWeight="normal">Role*</FormLabel>
              <Select
                placeholder="Select role"
                border="1px solid #e0e0e0"
                borderRadius={7}
                h="50px"
                p="12px"
                fontSize="16px"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="client">Client</option>
              </Select>
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
  onClick={() => history.push("/auth/forgot-password")}
  fontSize="sm"
  fontWeight="medium"
  color={blueShade}
  _hover={{ textDecoration: "underline" }}
  cursor="pointer"
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
            >
              Sign In
            </Button>

            {/* Create Account Link */}
            <Flex mt="5" justify="center">
              <Text fontSize="sm" color={textColor}>Not registered yet?</Text>
              <Link
                ml="1"
                fontSize="sm"
                fontWeight="medium"
                color={blueShade}
                _hover={{ textDecoration: "underline" }}
                onClick={() => history.push("/auth/signup")}
              >
                Create New Account
              </Link>
            </Flex>
          </Flex>

          {/* Right Column (Image Container) */}
          <Box
            w={{ base: "100%", md: "50%" }}
            bgImage={`url(${signInImage})`}
            bgSize="cover"
            bgPosition="center"
            borderTopRightRadius="0px"
            borderBottomRightRadius="0px"
            borderBottomLeftRadius="0px"
            display={{ base: "none", md: "block" }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}