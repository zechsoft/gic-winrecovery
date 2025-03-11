import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Input, Button, Avatar, useColorModeValue, FormControl, InputGroup, InputRightElement, Icon, Divider, Tooltip, useToast, } from "@chakra-ui/react";
import { FiSearch, FiSend, FiPaperclip, FiMoreVertical } from "react-icons/fi";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, onSnapshot, serverTimestamp, where } from "firebase/firestore";

// Firebase configuration - replace with your own firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDwKcKJfvyyx7rD8LWwxUKsTb4nboN-CzM",
    authDomain: "react-chat-86893.firebaseapp.com",
    projectId: "react-chat-86893",
    storageBucket: "react-chat-86893.firebasestorage.app",
    messagingSenderId: "724015888956",
    appId: "1:724015888956:web:dfed69575abd6c1c5b2139",
    measurementId: "G-5Y64BMHJ9M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Messages() {
  const [search, setSearch] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
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

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setChats(usersList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Fallback to sample data if Firebase fails
        setChats(SAMPLE_USERS);
        setLoading(false);
      }
    };

    fetchUsers();
    
    // Set up a listener for online status changes
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const updatedUsers = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setChats(updatedUsers);
    });
    
    return () => unsubscribe();
  }, []);

  // Load messages when a chat is selected
  useEffect(() => {
    if (selectedChat) {
      // Create a query to get messages between the current user and selected chat
      const messagesQuery = query(
        collection(db, "messages"),
        where("participants", "array-contains", currentUser),
        orderBy("timestamp", "asc")
      );
      
      const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        const fetchedMessages = snapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          .filter(msg => 
            (msg.sender === currentUser && msg.receiver === selectedChat.username) ||
            (msg.sender === selectedChat.username && msg.receiver === currentUser)
          );
        
        setMessages(fetchedMessages);
        
        // Mark messages as read in Firebase
        // This would be implemented here
      });
      
      return () => unsubscribe();
    }
  }, [selectedChat, currentUser]);

  // Send message function
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) {
      toast({
        title: "Empty message",
        description: "Message cannot be empty!",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      // Add message to Firestore
      await addDoc(collection(db, "messages"), {
        sender: currentUser,
        receiver: selectedChat.username,
        message: newMessage,
        timestamp: serverTimestamp(),
        read: false,
        participants: [currentUser, selectedChat.username]
      });

      // Update last message in users collection
      // This would typically be done via a Cloud Function in Firebase
      
      // Clear the input field
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Search functionality
  const filteredChats = chats.filter(chat => 
    chat.username.toLowerCase().includes(search.toLowerCase())
  );

  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    
    const date = typeof timestamp === 'string' 
      ? new Date(timestamp) 
      : timestamp.toDate();
      
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
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
          
          {/* Search bar */}
          <InputGroup mb={4}>
            <Input
              placeholder="Search contacts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              bg={inputBg}
              borderRadius="full"
            />
            <InputRightElement>
              <Icon as={FiSearch} color="gray.500" />
            </InputRightElement>
          </InputGroup>
          
          {/* Contacts list */}
          <Box overflowY="auto" height="calc(80vh - 120px)">
            {loading ? (
              <Text textAlign="center" mt={4}>Loading contacts...</Text>
            ) : filteredChats.length === 0 ? (
              <Text textAlign="center" mt={4}>No contacts found</Text>
            ) : (
              filteredChats.map((chat) => (
                <Flex
                  key={chat.username}
                  alignItems="center"
                  p={3}
                  borderRadius="md"
                  cursor="pointer"
                  bg={selectedChat?.username === chat.username ? selectedChatBg : "transparent"}
                  _hover={{ bg: chatHoverBg }}
                  onClick={() => setSelectedChat(chat)}
                  mb={2}
                >
                  <Box position="relative">
                    <Avatar size="md" src={chat.avatar} name={chat.username} />
                    {chat.isOnline && (
                      <Box
                        position="absolute"
                        bottom="0"
                        right="0"
                        width="12px"
                        height="12px"
                        bg="green.400"
                        borderRadius="full"
                        border="2px solid"
                        borderColor={sidebarBg}
                      />
                    )}
                  </Box>
                  <Box ml={3} flex="1">
                    <Flex justifyContent="space-between" alignItems="center">
                      <Text fontWeight="bold" color={textColor}>
                        {chat.username}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {chat.timestamp ? formatTime(chat.timestamp) : ""}
                      </Text>
                    </Flex>
                    <Text
                      fontSize="sm"
                      color={chat.unread ? textColor : "gray.500"}
                      fontWeight={chat.unread ? "bold" : "normal"}
                      noOfLines={1}
                    >
                      {chat.lastMessage}
                    </Text>
                  </Box>
                  {chat.unread && (
                    <Box
                      borderRadius="full"
                      bg="blue.500"
                      w={2}
                      h={2}
                      ml={2}
                    />
                  )}
                </Flex>
              ))
            )}
          </Box>
        </Box>

        {/* Chat Window */}
        <Box w={{ base: "0%", md: "70%" }} p={4} position="relative">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <Flex
                alignItems="center"
                p={3}
                borderBottom="1px solid"
                borderColor={borderColor}
                position="relative"
              >
                <Avatar size="md" src={selectedChat.avatar} name={selectedChat.username} />
                <Box ml={3}>
                  <Text fontWeight="bold" color={textColor}>
                    {selectedChat.username}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {selectedChat.isOnline ? "Online" : "Offline"}
                  </Text>
                </Box>
                <Tooltip label="More options" placement="top">
                  <Button
                    variant="ghost"
                    colorScheme="blue"
                    borderRadius="full"
                    ml="auto"
                  >
                    <Icon as={FiMoreVertical} />
                  </Button>
                </Tooltip>
              </Flex>

              {/* Messages */}
              <Box
                overflowY="auto"
                height="calc(80vh - 180px)"
                py={4}
                px={2}
              >
                {messages.length === 0 ? (
                  <Text textAlign="center" color="gray.500" mt={10}>
                    No messages yet. Start the conversation!
                  </Text>
                ) : (
                  messages.map((msg, index) => {
                    const isSender = msg.sender === currentUser;
                    const showTimestamp = index === 0 || 
                      (messages[index - 1].sender !== msg.sender) ||
                      (new Date(msg.timestamp).getTime() - new Date(messages[index - 1].timestamp).getTime() > 5 * 60 * 1000);
                    
                    return (
                      <Box key={msg.id || index}>
                        {showTimestamp && (
                          <Text
                            fontSize="xs"
                            color="gray.500"
                            textAlign="center"
                            my={2}
                          >
                            {formatTime(msg.timestamp)}
                          </Text>
                        )}
                        <Flex
                          justifyContent={isSender ? "flex-end" : "flex-start"}
                          mb={2}
                        >
                          {!isSender && (
                            <Avatar
                              size="sm"
                              src={selectedChat.avatar}
                              name={selectedChat.username}
                              mr={2}
                              alignSelf="flex-end"
                            />
                          )}
                          <Box
                            maxW="70%"
                            p={3}
                            borderRadius="lg"
                            bg={isSender ? messageBubbleSent : messageBubbleReceived}
                            color={isSender ? "white" : textColor}
                          >
                            <Text>{msg.message}</Text>
                          </Box>
                        </Flex>
                      </Box>
                    );
                  })
                )}
              </Box>

              {/* Message Input */}
              <Box
                position="absolute"
                bottom={4}
                left={4}
                right={4}
                p={2}
                borderTop="1px solid"
                borderColor={borderColor}
                bg={bgForm}
              >
                <FormControl>
                  <InputGroup>
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      bg={inputBg}
                      borderRadius="full"
                      pr="4.5rem"
                    />
                    <InputRightElement width="4.5rem">
                      <Tooltip label="Attach file" placement="top">
                        <Button
                          h="1.75rem"
                          size="sm"
                          variant="ghost"
                          colorScheme="blue"
                          mr={1}
                        >
                          <Icon as={FiPaperclip} />
                        </Button>
                      </Tooltip>
                      <Tooltip label="Send message" placement="top">
                        <Button
                          h="1.75rem"
                          size="sm"
                          colorScheme="blue"
                          onClick={sendMessage}
                        >
                          <Icon as={FiSend} />
                        </Button>
                      </Tooltip>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Box>
            </>
          ) : (
            <Flex
              height="100%"
              justifyContent="center"
              alignItems="center"
              direction="column"
            >
              <Text fontSize="xl" color="gray.500" textAlign="center">
                Select a chat to start messaging
              </Text>
            </Flex>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

// Sample data for the demo (used as fallback)
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
    {
      sender: "JohnDoe",
      receiver: "AjayClg",
      message: "Hey Ajay, how's the project coming along?",
      timestamp: "2025-03-09T10:30:00Z"
    },
    {
      sender: "AjayClg",
      receiver: "JohnDoe",
      message: "Going well! We're on track to finish by Friday.",
      timestamp: "2025-03-09T10:32:00Z"
    },
    {
      sender: "JohnDoe",
      receiver: "AjayClg",
      message: "That's great to hear! Do you need any resources?",
      timestamp: "2025-03-09T10:35:00Z"
    },
    {
      sender: "AjayClg",
      receiver: "JohnDoe",
      message: "I think we're all set, but I'll let you know if anything comes up.",
      timestamp: "2025-03-09T10:40:00Z"
    },
    {
      sender: "JohnDoe",
      receiver: "AjayClg",
      message: "Looking forward to our meeting tomorrow!",
      timestamp: "2025-03-09T14:25:00Z"
    }
  ],
  "SarahSmith": [
    {
      sender: "SarahSmith",
      receiver: "AjayClg",
      message: "Hi Ajay, I've sent you the design files.",
      timestamp: "2025-03-08T15:10:00Z"
    },
    {
      sender: "AjayClg",
      receiver: "SarahSmith",
      message: "Thanks Sarah, I'll take a look right away.",
      timestamp: "2025-03-08T15:15:00Z"
    },
    {
      sender: "SarahSmith",
      receiver: "AjayClg",
      message: "Let me know if you need any clarifications.",
      timestamp: "2025-03-08T15:17:00Z"
    },
    {
      sender: "AjayClg",
      receiver: "SarahSmith",
      message: "The designs look great! Just a couple of questions about the navigation.",
      timestamp: "2025-03-08T16:30:00Z"
    },
    {
      sender: "SarahSmith",
      receiver: "AjayClg",
      message: "Thanks for sending over those files.",
      timestamp: "2025-03-08T17:05:00Z"
    }
  ],
  "MikeBrown": [
    {
      sender: "MikeBrown",
      receiver: "AjayClg",
      message: "Ajay, have you seen the quarterly report?",
      timestamp: "2025-03-07T09:10:00Z"
    },
    {
      sender: "AjayClg",
      receiver: "MikeBrown",
      message: "Yes, I reviewed it yesterday. Looks like we're exceeding our targets!",
      timestamp: "2025-03-07T09:20:00Z"
    },
    {
      sender: "MikeBrown",
      receiver: "AjayClg",
      message: "Excellent! Can you prepare a summary for the board meeting?",
      timestamp: "2025-03-07T09:25:00Z"
    },
    {
      sender: "AjayClg",
      receiver: "MikeBrown",
      message: "Sure thing. I'll have it ready by tomorrow.",
      timestamp: "2025-03-07T09:30:00Z"
    },
    {
      sender: "MikeBrown",
      receiver: "AjayClg",
      message: "Did you review the quarterly report?",
      timestamp: "2025-03-07T14:45:00Z"
    }
  ],
  "EmilyJohnson": [
    {
      sender: "EmilyJohnson",
      receiver: "AjayClg",
      message: "Hi Ajay! Just got out of the client meeting.",
      timestamp: "2025-03-06T11:30:00Z"
    },
    {
      sender: "AjayClg",
      receiver: "EmilyJohnson",
      message: "How did it go?",
      timestamp: "2025-03-06T11:32:00Z"
    },
    {
      sender: "EmilyJohnson",
      receiver: "AjayClg",
      message: "They loved our presentation! They want to move forward with the project.",
      timestamp: "2025-03-06T11:35:00Z"
    },
    {
      sender: "AjayClg",
      receiver: "EmilyJohnson",
      message: "That's fantastic news! Great job on the presentation.",
      timestamp: "2025-03-06T11:40:00Z"
    },
    {
      sender: "EmilyJohnson",
      receiver: "AjayClg",
      message: "The client loved our presentation!",
      timestamp: "2025-03-06T13:15:00Z"
    }
  ],
  "AlexWilliams": [
    {
      sender: "AlexWilliams",
      receiver: "AjayClg",
      message: "Ajay, we need to discuss the upcoming product launch.",
      timestamp: "2025-03-05T14:10:00Z"
    },
    {
      sender: "AjayClg",
      receiver: "AlexWilliams",
      message: "Sure, I'm available this afternoon or tomorrow morning.",
      timestamp: "2025-03-05T14:15:00Z"
    },
    {
      sender: "AlexWilliams",
      receiver: "AjayClg",
      message: "Let's do tomorrow at 10am?",
      timestamp: "2025-03-05T14:20:00Z"
    },
    {
      sender: "AjayClg",
      receiver: "AlexWilliams",
      message: "That works for me. I'll send a calendar invite.",
      timestamp: "2025-03-05T14:25:00Z"
    },
    {
      sender: "AlexWilliams",
      receiver: "AjayClg",
      message: "Let's schedule a call for next week.",
      timestamp: "2025-03-05T16:40:00Z"
    }
  ]
};