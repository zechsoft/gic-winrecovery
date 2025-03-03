import React from "react";
import { Box, Flex, Text, Button, Input, FormLabel, useColorModeValue } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

export default function ForgotPassword() {
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");
  const history = useHistory();

  const handleResetPassword = () => {
    // Add your password reset logic here
    alert("Password reset link sent to your email!");
    history.push("/auth/signin");
  };

  return (
    <Flex direction="column" align="center" minH="80vh">
      <Box
        w="100%"
        maxW="500px"
        bg={bgForm}
        p="60px"
        borderRadius="20px"
        boxShadow="0px 5px 14px rgba(67, 55, 226, 0.05)"
      >
        <Text fontSize="4xl" color={textColor} fontWeight="bold" textAlign="center" mb="22px">
          Forgot Password
        </Text>
        <Text mb="9" textAlign="center" color={textColor}>
          Enter your email to reset your password.
        </Text>

        <FormLabel fontSize="sm" fontWeight="normal">
          Email*
        </FormLabel>
        <Input
          type="email"
          placeholder="mail@example.com"
          border="1px solid #e0e0e0"
          borderRadius={7}
          h="50px"
          p="12px"
          fontSize="16px"
          mb="3"
        />

        <Button
          w="full"
          rounded="xl"
          bg="linear-gradient(to right, #00c6ff, #0072ff)"
          color="white"
          py="12px"
          _hover={{ bg: "linear-gradient(to right, #00a1cc, #005bbb)" }}
          onClick={handleResetPassword}
        >
          Reset Password
        </Button>

        <Flex mt="5" justify="center">
          <Text fontSize="sm" color={textColor}>
            Remember your password?
          </Text>
          <Button
            ml="1"
            fontSize="sm"
            fontWeight="medium"
            color="blue.500"
            _hover={{ textDecoration: "underline" }}
            onClick={() => history.push("/auth/signin")}
          >
            Sign In
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}