import React, { useState, useContext, useEffect } from "react";
import { BellIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Avatar,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { NavLink, useHistory } from "react-router-dom";
import routes from "routes.js";
import { ArgonLogoDark, ArgonLogoLight, ChakraLogoDark, ChakraLogoLight, ProfileIcon, SettingsIcon } from "components/Icons/Icons";
import { ItemContent } from "components/Menu/ItemContent";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import { SidebarResponsive } from "components/Sidebar/Sidebar";
import { SidebarContext } from "contexts/SidebarContext";

// Sample default avatars for new users
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";

// This will store users who have already entered their password
const authenticatedUsers = new Set();

export default function HeaderLinks(props) {
  const {
    variant,
    children,
    fixed,
    scrolled,
    secondary,
    onOpen,
    ...rest
  } = props;

  const { colorMode } = useColorMode();
  const { toggleSidebar } = useContext(SidebarContext);
  const history = useHistory();
  const toast = useToast();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [password, setPassword] = useState("");
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const navbarIcon = "white";
  const menuBg = "white";

  // Default avatars to assign to new users
  const defaultAvatars = [avatar1, avatar2, avatar3];

  useEffect(() => {
    // Load all registered users from localStorage and sessionStorage
    loadRegisteredUsers();
  }, []);

  const loadRegisteredUsers = () => {
    // Get all users from the sampleUsers object in SignIn.js
    const sampleUsers = {
      admin: {
        "admin@example.com": { password: "Admin123!", role: "admin" }
      },
      client: {
        "client1@example.com": { password: "Client1!", role: "client" },
        "client2@example.com": { password: "Client2!", role: "client" },
        "client3@example.com": { password: "Client3!", role: "client" },
        "client4@example.com": { password: "Client4!", role: "client" }
      }
    };

    // Also check if there are any users stored in localStorage from registration
    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");

    // Combine pre-defined users with registered users
    const adminUsers = Object.keys(sampleUsers.admin).map(email => ({
      email,
      name: email.split('@')[0],
      role: "admin",
      avatar: defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)]
    }));

    const clientUsers = Object.keys(sampleUsers.client).map(email => ({
      email,
      name: email.split('@')[0],
      role: "client",
      avatar: defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)]
    }));

    // Convert stored users to the format we need
    const registeredUsersList = [...adminUsers, ...clientUsers, ...storedUsers];
    setRegisteredUsers(registeredUsersList);
  };

  const openLoginModal = (user) => {
    // If user has already authenticated in this session, redirect directly
    if (authenticatedUsers.has(user.email)) {
      redirectToUserDashboard(user);
      return;
    }

    setCurrentUser(user);
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setPassword("");
  };

  const handleLogin = () => {
    // Get all users from the sampleUsers object in SignIn.js
    const sampleUsers = {
      admin: {
        "admin@example.com": { password: "Admin123!", role: "admin" }
      },
      client: {
        "client1@example.com": { password: "Client1!", role: "client" },
        "client2@example.com": { password: "Client2!", role: "client" },
        "client3@example.com": { password: "Client3!", role: "client" },
        "client4@example.com": { password: "Client4!", role: "client" }
      }
    };

    // Also check if there are any stored users from registration
    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const registeredUser = storedUsers.find(user => user.email === currentUser.email);

    // Check if the user exists in predefined sample users
    let foundUser;
    if (currentUser.role === "admin" && sampleUsers.admin[currentUser.email]) {
      foundUser = sampleUsers.admin[currentUser.email];
    } else if (currentUser.role === "client" && sampleUsers.client[currentUser.email]) {
      foundUser = sampleUsers.client[currentUser.email];
    }

    // Check the password against sample users or registered users
    if ((foundUser && foundUser.password === password) || (registeredUser && registeredUser.password === password)) {
      // Add to authenticated users so they don't need to login again
      authenticatedUsers.add(currentUser.email);
      
      // Store user authentication status
      const userData = {
        email: currentUser.email,
        role: currentUser.role,
        isAuthenticated: true
      };
      
      // Store in sessionStorage for this session
      sessionStorage.setItem("user", JSON.stringify(userData));
      
      toast({
        title: "Login Successful",
        description: `Welcome ${currentUser.name}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
      // Redirect to appropriate dashboard
      redirectToUserDashboard(currentUser);
      closeLoginModal();
    } else {
      toast({
        title: "Authentication failed",
        description: "Invalid password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const redirectToUserDashboard = (user) => {
    if (user.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/client/dashboard");
    }
  };

  const isMobileView = useBreakpointValue({ base: true, md: false });
  const isDesktopView = useBreakpointValue({ base: false, lg: true });

  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems='center'
      flexDirection='row'>
      <SearchBar me='18px' />

      <Box ml="auto" display="flex" alignItems="center">
        {(isMobileView || isDesktopView) && (
          <Button
            onClick={toggleSidebar}
            variant="no-hover"
            ref={props.btnRef}
            p="0px"
            borderRadius="50%"
            mr={{ base: "16px", lg: "24px" }}
            bg="white"
            _hover={{ bg: "white" }}
            boxShadow="0px 0px 5px rgba(0, 0, 0, 0.1)"
          >
            <HamburgerIcon w="25px" h="25px" color="black" />
          </Button>
        )}

        <Menu>
          <MenuButton>
            <Button
              ms='0px'
              px='0px'
              me={{ sm: "2px", md: "16px" }}
              color={navbarIcon}
              variant='no-effects'
              rightIcon={document.documentElement.dir ? "" : <ProfileIcon color={navbarIcon} w='22px' h='22px' me='0px' />}
              leftIcon={document.documentElement.dir ? <ProfileIcon color={navbarIcon} w='22px' h='22px' me='0px' /> : ""}>
              <Text display={{ sm: "none", md: "flex" }} color={navbarIcon}>Sign In</Text>
            </Button>
          </MenuButton>
          <MenuList p='16px 8px' bg={menuBg} maxH="300px" overflowY="auto">
            <Flex flexDirection='column'>
              {registeredUsers.map((user, index) => (
                <MenuItem key={index} borderRadius='8px' mb='10px' onClick={() => openLoginModal(user)}>
                  <ItemContent
                    time={user.role}
                    info={authenticatedUsers.has(user.email) ? "Authenticated" : "Click to login"}
                    boldInfo={user.name}
                    aName={user.name}
                    aSrc={user.avatar}
                  />
                </MenuItem>
              ))}
            </Flex>
          </MenuList>
        </Menu>

        <SidebarResponsive
          logo={
            <Stack direction='row' spacing='12px' align='center' justify='center'>
              {colorMode === "dark" ? (
                <ArgonLogoLight w='74px' h='27px' />
              ) : (
                <ArgonLogoDark w='74px' h='27px' />
              )}
              <Box
                w='1px'
                h='20px'
                bg={colorMode === "dark" ? "white" : "gray.700"}
              />
              {colorMode === "dark" ? (
                <ChakraLogoLight w='82px' h='21px' />
              ) : (
                <ChakraLogoDark w='82px' h='21px' />
              )}
            </Stack>
          }
          colorMode={colorMode}
          secondary={props.secondary}
          routes={routes}
          {...rest}
        />

        <SettingsIcon
          cursor='pointer'
          ms={{ base: "16px", xl: "0px" }}
          me='16px'
          onClick={props.onOpen}
          color={navbarIcon}
          w='25px'
          h='25px'
        />
      </Box>

      {/* Login Modal */}
      {currentUser && (
        <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center">User Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box display="flex" flexDirection="column" alignItems="center" mb="10px">
                <Avatar 
                  src={currentUser.avatar} 
                  name={currentUser.name} 
                  mb="8px" 
                  size="xl" 
                />
                <Text fontSize="lg" fontWeight="bold" mb="2">{currentUser.name}</Text>
                <Text fontSize="sm" color="gray.600" mb="1">{currentUser.email}</Text>
                <Text fontSize="sm" color="gray.600" mb="4">Role: {currentUser.role}</Text>
                <Text fontSize="sm" color="gray.600" mb="6">Please enter your password to continue</Text>
                <Input
                  placeholder="Enter Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  mb="6"
                />
                <Button colorScheme="blue" width="100%" onClick={handleLogin}>Log in Now</Button>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Flex>
  );
}