import React from "react";
// Chakra imports
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
} from "@chakra-ui/react";
// Assets
import signInImage from "assets/img/signInImage.png";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");
  const titleColor = useColorModeValue("gray.700", "blue.500");
  const blueShade = useColorModeValue("#0072ff", "#0072ff"); // Blue color for buttons/links

  // State to manage the selected role
  const [role, setRole] = React.useState("");

  return (
    <Flex position="relative" mb="40px">
      <Flex
        minH={{ md: "1000px" }}
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1100px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        alignItems="flex-start" // Align containers to the top
      >
        {/* Left Column (Login Content) */}
        <Flex
          w={{ base: "100%", md: "50%" }}
          h="100%"
          alignItems="flex-start" // Align content to the top
          justifyContent="flex-start" // Align content to the top
          mb="60px"
          mt="0" // Ensure no margin at the top
        >
          <Flex
            zIndex="2"
            direction="column"
            w="700px"
            h="auto" // Adjust height to fit content
            justifyContent="flex-start" // Align content to the top
            padding={"40px"}
            background="transparent"
            borderBottomLeftRadius="20px"
            borderTopLeftRadius="20px"
            p="60px"
            mx={{ base: "90px" }}
            m={{ base: "10px", md: "auto" }}
            bg={bgForm}
            boxShadow={useColorModeValue(
              "0px 5px 14px rgba(67, 55, 226, 0.05)",
              "unset"
            )}
          >
            <Text
              fontSize="4xl"
              color={textColor}
              fontWeight="bold"
              textAlign="center"
              mb="22px"
            >
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
              <Text mx="2" color={textColor}>
                or
              </Text>
              <Box w="full" borderBottom="1px" borderColor="gray.200" />
            </Flex>

            {/* Email Field */}
            <FormControl mb="3">
              <FormLabel fontSize="sm" fontWeight="normal">
                Email*
              </FormLabel>
              <Input
                variant="flushed"
                type="text"
                placeholder="  mail@simmmple.com"
                mb="3"
                border="1px solid #e0e0e0"
                borderRadius={7}
                h="50px" // Increased height
                p="12px" // Increased padding
                fontSize="16px"
              />
            </FormControl>

            {/* Password Field */}
            <FormControl mb="3">
              <FormLabel fontSize="sm" fontWeight="normal">
                Password*
              </FormLabel>
              <Input
                variant="flushed"
                type="password"
                placeholder="Min. 8 characters"
                mb="3"
                border="1px solid #e0e0e0"
                borderRadius={7}
                h="50px" // Increased height
                p="12px" // Increased padding
                fontSize="16px"
              />
            </FormControl>

            {/* Role Dropdown */}
            <FormControl mb="3">
              <FormLabel fontSize="sm" fontWeight="normal">
                Role*
              </FormLabel>
              <Select
                placeholder="Select role"
                mb="3"
                border="1px solid #e0e0e0"
                borderRadius={7}
                h="50px" // Increased height
                p="12px" // Increased padding
                fontSize="16px"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                sx={{
                  fontSize: "sm", // Reduced font size
                  _hover: {
                    borderColor: "blue.500", // Change hover border color to blue
                  },
                  _focus: {
                    borderColor: "blue.500", // Change focus border color to blue
                    boxShadow: "none", // Remove shadow
                  },
                  "& option": {
                    fontSize: "sm", // Reduced font size of dropdown options
                  },
                }}
              >
                <option value="admin">Admin</option>
                <option value="client">Client</option>
                <option value="worker">Worker</option>
              </Select>
            </FormControl>

            {/* Remember Me Checkbox */}
            <Flex mb="5" justify="space-between" align="center">
              <Flex align="center">
                <Checkbox />
                <Text ml="3" fontSize="sm" color={textColor} p={"px"}>
                  Keep me logged In
                </Text>
              </Flex>
              <Link
                href="#"
                fontSize="sm"
                fontWeight="medium"
                color={blueShade} // Updated color
                _hover={{ textDecoration: "underline" }}
              >
                Forgot Password?
              </Link>
            </Flex>

            {/* Sign In Button with Gradient */}
            <Button
              w="full"
              rounded="xl"
              bg="linear-gradient(to right, #00c6ff, #0072ff)" // Applying the gradient
              color="white"
              py="12px"
              _hover={{ bg: "linear-gradient(to right, #00a1cc, #005bbb)" }} // Optional: adjust hover color to a similar gradient
            >
              Sign In
            </Button>

            {/* Create Account Link */}
            <Flex mt="5" justify="center">
              <Text fontSize="sm" color={textColor}>
                Not registered yet?
              </Text>
              <Link
                href="#"
                fontSize="sm"
                fontWeight="bold"
                color={blueShade} // Updated color
                ml="1"
              >
                Create an account
              </Link>
            </Flex>
          </Flex>
        </Flex>

        {/* Right Column (Image Container with Same Color and Shadow as Left Column) */}
        <Flex
          w={{ base: "100%", md: "60%" }}
          h={{ base: "auto", md: "80%" }} // Set a reduced height here
          position="relative"
          overflowX="hidden"
          bg={bgForm} // Set background color to match left column
          boxShadow={useColorModeValue(
            "0px 5px 14px rgba(67, 55, 226, 0.05)", // Same shadow as left column
            "unset"
          )}
          alignItems="flex-start" // Align content to the top
        >
          {/* Image with bottom-left curve */}
          <Box
            w="100%"
            h="100%"
            bgImage={`url(${signInImage})`}
            bgSize="cover"
            bgPosition="center"
            opacity="0.8"
            zIndex="0"
            borderBottomLeftRadius="300px" // Apply bottom-left curve radius
          ></Box>
        </Flex>
      </Flex>
    </Flex>
  );
}