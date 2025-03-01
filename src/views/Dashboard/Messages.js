import React, { useState, useEffect } from "react";
import { Flex, Text, Input, Button, Avatar, Box } from "@chakra-ui/react";
import axios from "axios";

export default function Messages() {
  const [search, setSearch] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const currentUser = "AjayClg"; // Replace with actual user

  // Fetch users
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        console.log("Fetched Users:", response.data);
        setChats(response.data);
      } catch (error) {
        console.error("Error fetching chat users:", error);
      }
    };

    fetchChats();
  }, []);

  // Fetch messages when a user is selected
  useEffect(() => {
    if (selectedChat) {
      setMessages([]);  // Clear previous messages first
      axios
        .get(`http://localhost:5000/api/messages/${currentUser}/${selectedChat.username}`)
        .then((response) => {
          console.log("Fetched Messages:", response.data);
          setMessages(response.data);
        })
        .catch((error) => console.error("Error fetching messages:", error));
    }
  }, [selectedChat]);

  // Send message
  const sendMessage = async () => {
    if (!newMessage.trim()) {
      alert("Message cannot be empty!");
      return;
    }

    try {
      const payload = { sender: currentUser, receiver: selectedChat.username, message: newMessage };
      console.log("Sending Message:", payload);

      const response = await axios.post("http://localhost:5000/api/messages/send", payload);
      console.log("Message Sent Response:", response.data);

      setMessages([...messages, payload]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Box mt={16} bg="white" p={6} boxShadow="md" borderRadius="15px" maxW="1200px" mx="auto">
      <Flex direction="row" height="80vh">
        {/* Sidebar */}
        <Box w="30%" borderRight="1px solid" borderColor="gray.200" p={4}>
          <Input placeholder="Search or start a new chat" value={search} onChange={(e) => setSearch(e.target.value)} borderRadius="lg" bg="gray.100" mb={4} />
          <Flex direction="column" gap={3} overflowY="auto">
            {chats.filter(chat => chat.username.toLowerCase().includes(search.toLowerCase())).map((chat, index) => (
              <Flex key={index} align="center" p={3} bg={selectedChat?.username === chat.username ? "gray.200" : "gray.50"} borderRadius="md" _hover={{ bg: "gray.100" }} onClick={() => setSelectedChat(chat)} cursor="pointer">
                <Avatar size="sm" mr={3} />
                <Box flex="1">
                  <Text fontWeight="bold">{chat.username}</Text>
                  <Text fontSize="sm" color="gray.500">Click to chat</Text>
                </Box>
              </Flex>
            ))}
          </Flex>
        </Box>

        {/* Chat Area */}
        <Box w="70%" p={4} display="flex" flexDirection="column">
          {selectedChat ? (
            <Flex align="center" justify="space-between" p={2} borderBottom="1px solid" borderColor="gray.200">
              <Flex align="center">
                <Avatar size="sm" mr={3} />
                <Text fontWeight="bold">{selectedChat.username}</Text>
              </Flex>
            </Flex>
          ) : (
            <Flex direction="column" align="center" justify="center" height="100%">
              <Text color="gray.500" textAlign="center" mb={4}>Send and receive messages.</Text>
              <Text fontSize="sm" color="gray.400">🔒 End-to-end encrypted</Text>
            </Flex>
          )}

          {selectedChat && (
            <Box flex="1" overflowY="auto" p={4} bg="gray.50" borderRadius="md" maxH="500px">
              {messages.map((msg, i) => (
                <Text key={i} color={msg.sender === currentUser ? "blue.600" : "gray.700"} mb={2}>
                  <strong>{msg.sender}:</strong> {msg.message}
                </Text>
              ))}
            </Box>
          )}

          {selectedChat && (
            <Flex mt={4}>
              <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message" borderRadius="lg" flex="1" mr={2} />
              <Button colorScheme="blue" onClick={sendMessage}>Send</Button>
            </Flex>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
