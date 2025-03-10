import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Avatar,
  useColorModeValue,
  FormControl,
  InputGroup,
  InputRightElement,
  Icon,
  Divider,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { FiSearch, FiSend, FiPaperclip, FiMoreVertical } from "react-icons/fi";

// Sample data for the demo
const SAMPLE_USERS = [
  {
    username: "JohnDoe",
    lastMessage: "Looking forward to our meeting tomorrow!",
    unread: true,
    isOnline: true,
    avatar: "https://i.pravatar.cc/150?u=john"
  },
  {
    username: "SarahSmith",
    lastMessage: "Thanks for sending over those files.",
    unread: false,
    isOnline: true,
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    username: "MikeBrown",
    lastMessage: "Did you review the quarterly report?",
    unread: true,
    isOnline: false,
    avatar: "https://i.pravatar.cc/150?u=mike"
  },
  {
    username: "EmilyJohnson",
    lastMessage: "The client loved our presentation!",
    unread: false,
    isOnline: true,
    avatar: "https://i.pravatar.cc/150?u=emily"
  },
  {
    username: "AlexWilliams",
    lastMessage: "Let's schedule a call for next week.",
    unread: false,
    isOnline: false,
    avatar: "https://i.pravatar.cc/150?u=alex"
  }
];

const SAMPLE_MESSAGES = {
  "JohnDoe": [
    { sender: "JohnDoe", receiver: "AjayClg", message: "Hey Ajay, how's the project coming along?", timestamp: "2025-03-09T10:30:00Z" },
    { sender: "AjayClg", receiver: "JohnDoe", message: "Going well! We're on track to finish by Friday.", timestamp: "2025-03-09T10:32:00Z" },
    { sender: "JohnDoe", receiver: "AjayClg", message: "That's great to hear! Do you need any resources?", timestamp: "2025-03-09T10:35:00Z" },
    { sender: "AjayClg", receiver: "JohnDoe", message: "I think we're all set, but I'll let you know if anything comes up.", timestamp: "2025-03-09T10:40:00Z" },
    { sender: "JohnDoe", receiver: "AjayClg", message: "Looking forward to our meeting tomorrow!", timestamp: "2025-03-09T14:25:00Z" }
  ],
  "SarahSmith": [
    { sender: "SarahSmith", receiver: "AjayClg", message: "Hi Ajay, I've sent you the design files.", timestamp: "2025-03-08T15:10:00Z" },
    { sender: "AjayClg", receiver: "SarahSmith", message: "Thanks Sarah, I'll take a look right away.", timestamp: "2025-03-08T15:15:00Z" },
    { sender: "SarahSmith", receiver: "AjayClg", message: "Let me know if you need any clarifications.", timestamp: "2025-03-08T15:17:00Z" },
    { sender: "AjayClg", receiver: "SarahSmith", message: "The designs look great! Just a couple of questions about the navigation.", timestamp: "2025-03-08T16:30:00Z" },
    { sender: "SarahSmith", receiver: "AjayClg", message: "Thanks for sending over those files.", timestamp: "2025-03-08T17:05:00Z" }
  ],
  "MikeBrown": [
    { sender: "MikeBrown", receiver: "AjayClg", message: "Ajay, have you seen the quarterly report?", timestamp: "2025-03-07T09:10:00Z" },
    { sender: "AjayClg", receiver: "MikeBrown", message: "Yes, I reviewed it yesterday. Looks like we're exceeding our targets!", timestamp: "2025-03-07T09:20:00Z" },
    { sender: "MikeBrown", receiver: "AjayClg", message: "Excellent! Can you prepare a summary for the board meeting?", timestamp: "2025-03-07T09:25:00Z" },
    { sender: "AjayClg", receiver: "MikeBrown", message: "Sure thing. I'll have it ready by tomorrow.", timestamp: "2025-03-07T09:30:00Z" },
    { sender: "MikeBrown", receiver: "AjayClg", message: "Did you review the quarterly report?", timestamp: "2025-03-07T14:45:00Z" }
  ],
  "EmilyJohnson": [
    { sender: "EmilyJohnson", receiver: "AjayClg", message: "Hi Ajay! Just got out of the client meeting.", timestamp: "2025-03-06T11:30:00Z" },
    { sender: "AjayClg", receiver: "EmilyJohnson", message: "How did it go?", timestamp: "2025-03-06T11:32:00Z" },
    { sender: "EmilyJohnson", receiver: "AjayClg", message: "They loved our presentation! They want to move forward with the project.", timestamp: "2025-03-06T11:35:00Z" },
    { sender: "AjayClg", receiver: "EmilyJohnson", message: "That's fantastic news! Great job on the presentation.", timestamp: "2025-03-06T11:40:00Z" },
    { sender: "EmilyJohnson", receiver: "AjayClg", message: "The client loved our presentation!", timestamp: "2025-03-06T13:15:00Z" }
  ],
  "AlexWilliams": [
    { sender: "AlexWilliams", receiver: "AjayClg", message: "Ajay, we need to discuss the upcoming product launch.", timestamp: "2025-03-05T14:10:00Z" },
    { sender: "AjayClg", receiver: "AlexWilliams", message: "Sure, I'm available this afternoon or tomorrow morning.", timestamp: "2025-03-05T14:15:00Z" },
    { sender: "AlexWilliams", receiver: "AjayClg", message: "Let's do tomorrow at 10am?", timestamp: "2025-03-05T14:20:00Z" },
    { sender: "AjayClg", receiver: "AlexWilliams", message: "That works for me. I'll send a calendar invite.", timestamp: "2025-03-05T14:25:00Z" },
    { sender: "AlexWilliams", receiver: "AjayClg", message: "Let's schedule a call for next week.", timestamp: "2025-03-05T16:40:00Z" }
  ]
};

export default function Messages() {
  const [search, setSearch] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const currentUser = "AjayClg"; // This would normally come from auth
  const toast = useToast();

  // Chakra color mode values
  const bgForm = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const inputBg = useColorModeValue("gray.50", "navy.900");
  const sidebarBg = useColorModeValue("gray.50", "navy.800");
  const selectedChatBg = useColorModeValue("blue.50", "blue.900");
  const chatHoverBg = useColorModeValue("gray.100", "navy.700");
  const messageBubbleSent = useColorModeValue("blue.500", "blue.400");
  const messageBubbleReceived = useColorModeValue("gray.100", "gray.700");

  // Initialize with sample data
  useEffect(() => {
    setChats(SAMPLE_USERS);
  }, []);

  // Load messages when a chat is selected
  useEffect(() => {
    if (selectedChat) {
      const chatMessages = SAMPLE_MESSAGES[selectedChat.username] || [];
      setMessages(chatMessages);
      
      // Mark as read (would update to the server in a real app)
      if (selectedChat.unread) {
        setChats(prevChats => 
          prevChats.map(chat => 
            chat.username === selectedChat.username 
              ? { ...chat, unread: false } 
              : chat
          )
        );
      }
    }
  }, [selectedChat]);

  // Send message function
  const sendMessage = () => {
    if (!newMessage.trim()) {
      toast({
        title: "Empty message",
        description: "Message cannot be empty!",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newMsg = {
      sender: currentUser,
      receiver: selectedChat.username,
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    // Add message to the current conversation
    setMessages(prevMessages => [...prevMessages, newMsg]);
    
    // Update the last message in the chat list
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.username === selectedChat.username 
          ? { ...chat, lastMessage: newMessage } 
          : chat
      )
    );

    // Clear the input
    setNewMessage("");

    // Show success toast
    toast({
      title: "Message sent",
      status: "success",
      duration: 1000,
      isClosable: true,
      position: "top-right",
    });
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box mt={16} bg={bgForm} p={6} boxShadow="xl" borderRadius="20px" maxW="1300px" mx="auto">
      <Flex direction="row" height="80vh">
        {/* Sidebar */}
        <Box
          w={{ base: "100%", md: "30%" }}
          borderRight="1px solid"
          borderColor={borderColor}
          p={4}
          bg={sidebarBg}
          borderTopLeftRadius="20px"
          borderBottomLeftRadius="20px"
        >
          <Text fontSize="2xl" color={textColor} fontWeight="bold" mb={4}>
            Messages
          </Text>

          <InputGroup mb={4}>
            <Input
              placeholder="Search or start a new chat"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              borderRadius="lg"
              bg={inputBg}
              border="1px solid"
              borderColor={borderColor}
              _focus={{
                borderColor: "blue.400",
                boxShadow: "0 0 0 1px blue.400",
              }}
            />
            <InputRightElement>
              <Icon as={FiSearch} color="gray.500" />
            </InputRightElement>
          </InputGroup>

          <Divider mb={4} />

          <Text fontSize="sm" color="gray.500" mb={2} fontWeight="medium">
            RECENT CONVERSATIONS
          </Text>

          <Flex direction="column" gap={2} overflowY="auto" maxH="calc(80vh - 180px)">
            {chats
              .filter((chat) => chat.username.toLowerCase().includes(search.toLowerCase()))
              .map((chat, index) => (
                <Flex
                  key={index}
                  align="center"
                  p={3}
                  bg={selectedChat?.username === chat.username ? selectedChatBg : "transparent"}
                  color={selectedChat?.username === chat.username ? "blue.500" : textColor}
                  borderRadius="md"
                  _hover={{ bg: chatHoverBg }}
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  transition="all 0.2s"
                >
                  <Avatar size="md" mr={3} name={chat.username} src={chat.avatar} />
                  <Box flex="1">
                    <Text fontWeight="bold">{chat.username}</Text>
                    <Text fontSize="sm" color="gray.500" noOfLines={1}>
                      {chat.lastMessage || "Start a conversation"}
                    </Text>
                  </Box>
                  {chat.unread && (
                    <Box bg="blue.500" borderRadius="full" w="6px" h="6px" ml={2} />
                  )}
                </Flex>
              ))}
          </Flex>
        </Box>

        {/* Chat Area */}
        <Box
          w={{ base: "0%", md: "70%" }}
          p={0}
          display="flex"
          flexDirection="column"
          borderTopRightRadius="20px"
          borderBottomRightRadius="20px"
          bg={useColorModeValue("white", "gray.800")}
          overflow="hidden"
        >
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <Flex
                align="center"
                justify="space-between"
                p={4}
                borderBottom="1px solid"
                borderColor={borderColor}
                bg={useColorModeValue("white", "gray.800")}
              >
                <Flex align="center">
                  <Avatar size="md" mr={3} name={selectedChat.username} src={selectedChat.avatar} />
                  <Box>
                    <Text fontWeight="bold">{selectedChat.username}</Text>
                    <Text fontSize="xs" color="gray.500">
                      {selectedChat.isOnline ? "Online" : "Last seen recently"}
                    </Text>
                  </Box>
                </Flex>
                <Tooltip label="More options" placement="left">
                  <Button variant="ghost" borderRadius="full" size="sm">
                    <Icon as={FiMoreVertical} />
                  </Button>
                </Tooltip>
              </Flex>

              {/* Messages Area */}
              <Box
                flex="1"
                overflowY="auto"
                p={4}
                bg={useColorModeValue("gray.50", "gray.900")}
                css={{
                  "&::-webkit-scrollbar": {
                    width: "4px",
                  },
                  "&::-webkit-scrollbar-track": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "gray.300",
                    borderRadius: "24px",
                  },
                }}
              >
                {messages.map((msg, i) => (
                  <Flex
                    key={i}
                    justify={msg.sender === currentUser ? "flex-end" : "flex-start"}
                    mb={4}
                  >
                    {msg.sender !== currentUser && (
                      <Avatar 
                        size="sm" 
                        mr={2} 
                        name={msg.sender} 
                        src={
                          chats.find(chat => chat.username === msg.sender)?.avatar
                        }
                      />
                    )}
                    <Box
                      bg={
                        msg.sender === currentUser ? messageBubbleSent : messageBubbleReceived
                      }
                      color={msg.sender === currentUser ? "white" : textColor}
                      borderRadius="lg"
                      px={4}
                      py={2}
                      maxW="70%"
                    >
                      <Text>{msg.message}</Text>
                      <Text fontSize="xs" textAlign="right" mt={1} opacity={0.7}>
                        {new Date(msg.timestamp || Date.now()).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Text>
                    </Box>
                  </Flex>
                ))}
              </Box>

              {/* Message Input */}
              <FormControl p={4} borderTop="1px solid" borderColor={borderColor}>
                <Flex>
                  <Tooltip label="Attach file" placement="top">
                    <Button variant="ghost" borderRadius="full" mr={2}>
                      <Icon as={FiPaperclip} />
                    </Button>
                  </Tooltip>
                  <InputGroup>
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message"
                      borderRadius="full"
                      bg={inputBg}
                      flex="1"
                      border="1px solid"
                      borderColor={borderColor}
                      _focus={{
                        borderColor: "blue.400",
                        boxShadow: "0 0 0 1px blue.400",
                      }}
                    />
                    <InputRightElement width="4rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        colorScheme="blue"
                        borderRadius="full"
                        onClick={sendMessage}
                      >
                        <Icon as={FiSend} />
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Flex>
              </FormControl>
            </>
          ) : (
            <Flex
              direction="column"
              align="center"
              justify="center"
              height="100%"
              bg={useColorModeValue("gray.50", "gray.800")}
              p={10}
            >
              <Box bg="blue.50" p={6} borderRadius="full" mb={4}>
                <Icon as={FiSend} color="blue.500" boxSize={10} />
              </Box>
              <Text fontSize="xl" fontWeight="bold" color={textColor} textAlign="center" mb={4}>
                Select a chat to start messaging
              </Text>
              <Text color="gray.500" textAlign="center" mb={4}>
                Choose from your existing conversations or search for someone new.
              </Text>
              <Text fontSize="sm" color="gray.400">
                🔒 End-to-end encrypted
              </Text>
            </Flex>
          )}
        </Box>
      </Flex>
    </Box>
  );
}