import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import IconBox from "components/Icons/IconBox";
import { HSeparator } from "components/Separator/Separator";
import React, { useContext, useRef } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { SidebarContext } from "contexts/SidebarContext";
import LogoutButton from "components/Buttons/LogoutButton"; // Import the LogoutButton component

// Sidebar Component
function Sidebar(props) {
  const location = useLocation();
  const [state, setState] = React.useState({});
  const mainPanel = useRef();
  const { colorMode } = useColorMode();
  const { sidebarVariant } = props;
  const history = useHistory();
  
  // Get sidebar state from context
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useContext(SidebarContext);

  // activeRoute function to check if the current route is active
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  const { logo, routes } = props;

  const createLinks = (routes) => {
    // Defining variables for active/inactive states
    const activeBg = useColorModeValue("white", "navy.700");
    const inactiveBg = useColorModeValue("white", "navy.700");
    const activeColor = useColorModeValue("gray.700", "white");
    const inactiveColor = useColorModeValue("gray.400", "gray.400");
    const sidebarActiveShadow = "0px 7px 11px rgba(0, 0, 0, 0.04)";

    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }

      if (prop.category) {
        const isOpen = state[prop.state]; // Check if the category is open
        return (
          <Box key={key}>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              onClick={() => setState({ ...state, [prop.state]: !isOpen })} // Toggle open/close
              cursor="pointer"
              mb={{ base: "6px", xl: "12px" }} // Fixed for responsive design
              mx="auto"
              ps={{ sm: "10px", xl: "16px" }}
              py="12px"
            >
              <Text color={activeColor} fontWeight="bold">
                {document.documentElement.dir === "rtl"
                  ? prop.rtlName
                  : prop.name}
              </Text>
            </Flex>
            {isOpen && createLinks(prop.views)} {/* Render sub-items if open */}
          </Box>
        );
      }

      const isActive = activeRoute(prop.layout + prop.path) === "active";
      return (
        <NavLink to={prop.layout + prop.path} key={key}>
          <Button
            boxSize="initial"
            justifyContent="flex-start"
            alignItems="center"
            boxShadow={isActive ? sidebarActiveShadow : "none"}
            bg={isActive ? activeBg : "transparent"}
            mb={{ base: "6px", xl: "12px" }}
            mx={{ xl: "auto" }}
            ps={{ sm: "10px", xl: "16px" }}
            py="12px"
            borderRadius="15px"
            w="100%"
            _hover="none"
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
            _after={{
              content: isActive ? '""' : "none",
              position: "absolute",
              top: "4",
              right: "0",
              width: "2px",
              height: "45%",
              backgroundColor: "blue.500",
              borderRadius: "0px 4px 4px 0px",
            }}
          >
            <Flex position="relative">
              {typeof prop.icon === "string" ? (
                <Icon>{prop.icon}</Icon>
              ) : (
                <IconBox
                  bg={isActive ? "blue.500" : inactiveBg}
                  color={isActive ? "white" : "blue.500"}
                  h="30px"
                  w="30px"
                  me="12px"
                >
                  {prop.icon}
                </IconBox>
              )}
              <Text color={isActive ? activeColor : inactiveColor} my="auto" fontSize="sm">
                {document.documentElement.dir === "rtl"
                  ? prop.rtlName
                  : prop.name}
              </Text>
            </Flex>
          </Button>
        </NavLink>
      );
    });
  };

  var links = <>{createLinks(routes)}</>;

  let sidebarBg = useColorModeValue("white", "navy.800");
  let sidebarRadius = "20px";
  let sidebarMargins = "0px";

  // Define the brand (logo or header section)
  const brand = (
    <Box pt={"25px"} mb="12px">
      {logo}
      <HSeparator my="26px" />
    </Box>
  );

  return (
    <Box ref={mainPanel}>
      {/* Desktop View - toggled sidebar */}
      <Box
        display={{ sm: "none", xl: sidebarOpen ? "block" : "none" }}
        position="fixed"
        top="0"
        left="0"
        h="100vh"
        w="300px"
        bg={sidebarBg}
        borderRadius={sidebarRadius}
        zIndex="10"
        p="20px"
        boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
        overflowY="auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Box>
          {brand}
          <Stack direction="column" mb="40px">
            <Box>{links}</Box>
          </Stack>
          
          {/* Add logout button at the bottom */}
          <Box mt="auto" position="absolute" bottom="40px" width="calc(100% - 40px)">
            <HSeparator my="16px" />
            <LogoutButton />
          </Box>
        </Box>
      </Box>

      {/* Overlay to close sidebar on click outside */}
      {sidebarOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          w="100%"
          h="100vh"
          bg="rgba(0,0,0,0.5)"
          zIndex="5"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </Box>
  );
}

export function SidebarResponsive(props) {
  const location = useLocation();
  const { logo, routes, colorMode, hamburgerColor, ...rest } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  // Define the sidebar background color using Chakra's useColorModeValue
  const sidebarBackgroundColor = useColorModeValue("white", "navy.800");

  // activeRoute function to check if the current route is active
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  const createLinks = (routes) => {
    // Defining variables for active/inactive states
    const activeBg = useColorModeValue("white", "navy.700");
    const inactiveBg = useColorModeValue("white", "navy.700");
    const activeColor = useColorModeValue("gray.700", "white");
    const inactiveColor = useColorModeValue("gray.400", "gray.400");
    const sidebarActiveShadow = "0px 7px 11px rgba(0, 0, 0, 0.04)";

    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }

      const isActive = activeRoute(prop.layout + prop.path) === "active";
      return (
        <NavLink to={prop.layout + prop.path} key={key} onClick={onClose}>
          <Button
            boxSize="initial"
            justifyContent="flex-start"
            alignItems="center"
            bg={isActive ? activeBg : "transparent"}
            boxShadow={isActive ? sidebarActiveShadow : "none"}
            mb={{ base: "6px", xl: "12px" }}
            mx={{ xl: "auto" }}
            ps={{ sm: "10px", xl: "16px" }}
            py="12px"
            borderRadius="15px"
            w="100%"
            _hover="none"
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
          >
            <Flex position="relative">
              {typeof prop.icon === "string" ? (
                <Icon>{prop.icon}</Icon>
              ) : (
                <IconBox
                  bg={isActive ? "blue.500" : inactiveBg}
                  color={isActive ? "white" : "blue.500"}
                  h="30px"
                  w="30px"
                  me="12px"
                >
                  {prop.icon}
                </IconBox>
              )}
              <Text color={isActive ? activeColor : inactiveColor} my="auto" fontSize="sm">
                {document.documentElement.dir === "rtl"
                  ? prop.rtlName
                  : prop.name}
              </Text>
            </Flex>
          </Button>
        </NavLink>
      );
    });
  };

  var links = <>{createLinks(routes)}</>;

  return (
    <Box display={{ sm: "block", xl: "none" }}>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay onClick={onClose} />
        <DrawerContent bg={sidebarBackgroundColor}>
          <DrawerCloseButton />
          <DrawerBody p="0px">
            {links}
            
            {/* Add logout button in responsive sidebar too */}
            <Box mt="20px" px="16px">
              <HSeparator my="16px" />
              <LogoutButton />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default Sidebar;