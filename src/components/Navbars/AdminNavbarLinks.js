import { BellIcon } from "@chakra-ui/icons";
import {
  Box, Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList, Stack, Text, useColorMode, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, Avatar
} from "@chakra-ui/react";
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import { ArgonLogoDark, ArgonLogoLight, ChakraLogoDark, ChakraLogoLight, ProfileIcon, SettingsIcon } from "components/Icons/Icons";
import { ItemContent } from "components/Menu/ItemContent";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import { SidebarResponsive } from "components/Sidebar/Sidebar";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import routes from "routes.js";

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

  // State for managing the login modal visibility
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [password, setPassword] = useState("");

  // Function to open the login modal and set the user
  const openLoginModal = (user) => {
    setCurrentUser(user);
    setIsLoginModalOpen(true);
  };

  // Function to close the login modal
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  // Always set navbarIcon color to white for right-side elements
  const navbarIcon = "white"; // Force navbar icon color to white
  const menuBg = "white"; // Ensure the menu background stays white

  // User Data
  const users = [
    {
      name: 'Mugil',
      avatar: avatar1,
    },
    {
      name: 'Dhinesh',
      avatar: avatar2,
    },
    {
      name: 'Kara',
      avatar: avatar3,
    }
  ];

  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems='center'
      flexDirection='row'>
      <SearchBar me='18px' />

      {/* Container for right side items */}
      <Box ml="auto" display="flex" alignItems="center">
        <NavLink to='/auth/signin'>
          <Button
            ms='0px'
            px='0px'
            me={{ sm: "2px", md: "16px" }}
            color={navbarIcon} // Always white
            variant='no-effects'
            rightIcon={document.documentElement.dir ? "" : <ProfileIcon color={navbarIcon} w='22px' h='22px' me='0px' />}
            leftIcon={document.documentElement.dir ? <ProfileIcon color={navbarIcon} w='22px' h='22px' me='0px' /> : ""}>
            <Text display={{ sm: "none", md: "flex" }} color={navbarIcon}>Sign In</Text>
          </Button>
        </NavLink>

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
          color={navbarIcon} // Always white
          w='25px'
          h='25px'
        />

        <Menu>
          <MenuButton>
            <BellIcon color={navbarIcon} w='25px' h='25px' /> {/* Always white */}
          </MenuButton>
          <MenuList p='16px 8px' bg={menuBg}>
            <Flex flexDirection='column'>
              {/* Menu Items */}
              {users.map((user, index) => (
                <MenuItem key={index} borderRadius='8px' mb='10px' onClick={() => openLoginModal(user)}>
                  <ItemContent
                    time='the manager'
                    info='from global india corporation'
                    boldInfo={user.name}
                    aName={user.name}
                    aSrc={user.avatar}
                  />
                </MenuItem>
              ))}
            </Flex>
          </MenuList>
        </Menu>
      </Box>

      {/* Login Modal */}
      {currentUser && (
        <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Displaying Avatar and User Information */}
              <Box display="flex" flexDirection="column" alignItems="center" mb="10px">
                <Avatar src={currentUser.avatar} name={currentUser.name} mb="8px" />
                <Text fontSize="lg">{currentUser.name}</Text>
              </Box>
              <Input 
                placeholder="Enter Password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                mb="10px"
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={closeLoginModal}>
                Login
              </Button>
              <Button variant="ghost" onClick={closeLoginModal} ml="4">
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Flex>
  );
}
