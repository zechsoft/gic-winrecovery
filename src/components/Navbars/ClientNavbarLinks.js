import React, { useState, useContext } from "react";
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
  FormControl, // Add this import
  FormLabel,   // Add this import
} from "@chakra-ui/react"; // Ensure FormControl and FormLabel are imported
import { NavLink } from "react-router-dom";
import routes from "clientroutes"; // Ensure this is the correct path for client routes
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import { ArgonLogoDark, ArgonLogoLight, ChakraLogoDark, ChakraLogoLight, ProfileIcon, SettingsIcon } from "components/Icons/Icons";
import { ItemContent } from "components/Menu/ItemContent";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import { SidebarResponsive } from "components/Sidebar/Sidebar";
import { SidebarContext } from "contexts/SidebarContext";

export default function ClientNavbarLinks(props) {
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

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const openLoginModal = (user) => {
    setCurrentUser(user);
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLogin = (user) => {
    setUser(user);
    setIsLoggedIn(true);
    closeLoginModal();
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const navbarIcon = "white";
  const menuBg = "white";

  const users = [
    {
      name: 'Client1',
      avatar: avatar1,
    },
    {
      name: 'Client2',
      avatar: avatar2,
    },
    {
      name: 'Client3',
      avatar: avatar3,
    }
  ];

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
            {isLoggedIn ? (
              <Button
                ms='0px'
                px='0px'
                me={{ sm: "2px", md: "16px" }}
                color={navbarIcon}
                variant='no-effects'
                rightIcon={document.documentElement.dir ? "" : <ProfileIcon color={navbarIcon} w='22px' h='22px' me='0px' />}
                leftIcon={document.documentElement.dir ? <ProfileIcon color={navbarIcon} w='22px' h='22px' me='0px' /> : ""}>
                <Text display={{ sm: "none", md: "flex" }} color={navbarIcon}>{user.name}</Text>
              </Button>
            ) : (
              <Button
                ms='0px'
                px='0px'
                me={{ sm: "2px", md: "16px" }}
                color={navbarIcon}
                variant='no-effects'
                rightIcon={document.documentElement.dir ? "" : <ProfileIcon color={navbarIcon} w='22px' h='22px' me='0px' />}
                leftIcon={document.documentElement.dir ? <ProfileIcon color={navbarIcon} w='22px' h='22px' me='0px' /> : ""}>
                <Text display={{ sm: "none", md: "flex" }} color={navbarIcon}>Profile</Text>
              </Button>
            )}
          </MenuButton>
         
        </Menu>

        <SidebarResponsive
          logo={
            <Stack direction='row' spacing='12px' align='center' justify='center'>
              {colorMode === "dark" ? (
                <ArgonLogoLight w='74px' h='27px' />
              ) : (
                <ArgonLogoLight w='74px' h='27px' />
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

      {/* Updated Login Modal */}
      
    </Flex>
  );
}