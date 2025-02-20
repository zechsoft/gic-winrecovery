/*eslint-disable*/
import { HamburgerIcon, ChevronRightIcon } from "@chakra-ui/icons";
// chakra imports
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
  Icon,
} from "@chakra-ui/react";
import IconBox from "components/Icons/IconBox";
import {
  renderThumbDark,
  renderThumbLight,
  renderTrack,
  renderTrackRTL,
  renderView,
  renderViewRTL,
} from "components/Scrollbar/Scrollbar";
import { HSeparator } from "components/Separator/Separator";
import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { NavLink, useLocation } from "react-router-dom";
import { SidebarHelp } from "./SidebarHelp";

// FUNCTIONS

function Sidebar(props) {
  // to check for active links and opened collapses
  let location = useLocation();
  // this is for the rest of the collapses
  const [state, setState] = React.useState({});
  const mainPanel = React.useRef();
  let variantChange = "0.2s linear";
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };
  const { colorMode } = useColorMode();
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const { sidebarVariant } = props;

  const createLinks = (routes) => {
    // Chakra Color Mode
    let activeBg = useColorModeValue("white", "navy.700");
    let inactiveBg = useColorModeValue("white", "navy.700");
    let activeColor = useColorModeValue("gray.700", "white");
    let inactiveColor = useColorModeValue("gray.400", "gray.400");
    let sidebarActiveShadow = "0px 7px 11px rgba(0, 0, 0, 0.04)";

    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }

      // If it's a category (e.g., Tables)
      if (prop.category) {
        const isOpen = state[prop.state]; // Check if the category is open
        return (
          <Box key={key}>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              onClick={() => setState({ ...state, [prop.state]: !isOpen })} // Toggle open/close
              cursor="pointer"
              mb={{
                xl: "6px",
              }}
              mx="auto"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              py="12px"
            >
              <Text
                color={activeColor}
                fontWeight="bold"
              >
                {document.documentElement.dir === "rtl"
                  ? prop.rtlName
                  : prop.name}
              </Text>
              <Icon
                as={ChevronRightIcon} // Use ChevronRightIcon from Chakra UI
                transform={isOpen ? "rotate(90deg)" : "none"} // Rotate icon when open
                transition="transform 0.2s"
              />
            </Flex>
            {isOpen && createLinks(prop.views)} {/* Render sub-items if open */}
          </Box>
        );
      }

      // If it's a regular link
      const isActive = activeRoute(prop.layout + prop.path) === "active";
      return (
        <NavLink to={prop.layout + prop.path} key={key}>
          <Button
            boxSize="initial"
            justifyContent="flex-start"
            alignItems="center"
            boxShadow={isActive ? sidebarActiveShadow : "none"}
            bg={isActive ? activeBg : "transparent"}
            mb={{
              xl: "6px",
            }}
            mx={{
              xl: "auto",
            }}
            ps={{
              sm: "10px",
              xl: "16px",
            }}
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
              content: isActive ? '""' : "none", // Show vertical line only for active
              position: "absolute",
              top: "4",
              right: "0",
              width: "2px", // Vertical line width
              height: "45%", // Full height
              backgroundColor: "blue.500", // Blue color for the line
              borderRadius: "0px 4px 4px 0px", // Optional: rounded edges for the line
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

  const { logo, routes } = props;

  var links = <>{createLinks(routes)}</>;
  //  BRAND
  //  Chakra Color Mode
  let sidebarBg = useColorModeValue("white", "navy.800");
  let sidebarRadius = "20px";
  let sidebarMargins = "0px";
  var brand = (
    <Box pt={"25px"} mb="12px">
      {logo}
      <HSeparator my="26px" />
    </Box>
  );

  // SIDEBAR
  return (
    <Box ref={mainPanel}>
      <Box display={{ sm: "none", xl: "block" }} position="fixed">
        <Box
          bg={sidebarBg}
          transition={variantChange}
          w="300px" // Increased the width here
          maxW="300px" // Ensure the max width is also adjusted
          ms={{ sm: "16px" }}
          my={{ sm: "16px" }}
          h="calc(100vh - 32px)"
          ps="20px"
          pe="20px"
          m={sidebarMargins}
          filter="drop-shadow(0px 5px 14px rgba(0, 0, 0, 0.05))"
          borderRadius={sidebarRadius}
          overflow="hidden"
        >
          <Box>{brand}</Box>
          <Stack direction="column" mb="40px">
            <Box>{links}</Box>
          </Stack>
          <SidebarHelp sidebarVariant={sidebarVariant} />
        </Box>
      </Box>
    </Box>
  );
}

export function SidebarResponsive(props) {
  // to check for active links and opened collapses
  let location = useLocation();
  const { logo, routes, colorMode, hamburgerColor, ...rest } = props;

  // this is for the rest of the collapses
  const [state, setState] = React.useState({});
  const mainPanel = React.useRef();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };
  // Chakra Color Mode
  let activeBg = useColorModeValue("white", "navy.700");
  let inactiveBg = useColorModeValue("white", "navy.700");
  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue("gray.400", "white");
  let sidebarActiveShadow = useColorModeValue(
    "0px 7px 11px rgba(0, 0, 0, 0.04)",
    "none"
  );
  let sidebarBackgroundColor = useColorModeValue("white", "navy.800");

  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }

      // If it's a category (e.g., Tables)
      if (prop.category) {
        const isOpen = state[prop.state]; // Check if the category is open
        return (
          <Box key={key}>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              onClick={() => setState({ ...state, [prop.state]: !isOpen })} // Toggle open/close
              cursor="pointer"
              mb={{
                xl: "6px",
              }}
              mx="auto"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              py="12px"
            >
              <Text
                color={activeColor}
                fontWeight="bold"
              >
                {document.documentElement.dir === "rtl"
                  ? prop.rtlName
                  : prop.name}
              </Text>
              <Icon
                as={ChevronRightIcon} // Use ChevronRightIcon from Chakra UI
                transform={isOpen ? "rotate(90deg)" : "none"} // Rotate icon when open
                transition="transform 0.2s"
              />
            </Flex>
            {isOpen && createLinks(prop.views)} {/* Render sub-items if open */}
          </Box>
        );
      }
      if (prop.category1) {
        return (
          <Box key={key}>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              cursor="pointer"
              mb={{
                xl: "6px",
              }}
              mx="auto"
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              py="12px"
            >
              <Text
                color={activeColor}
                fontWeight="bold"
              >
                {document.documentElement.dir === "rtl"
                  ? prop.rtlName
                  : prop.name}
              </Text>
            </Flex>
            {createLinks(prop.views)} {/* Render sub-items directly */}
          </Box>
        );
      }

      // If it's a regular link
      const isActive = activeRoute(prop.layout + prop.path) === "active";
      return (
        <NavLink to={prop.layout + prop.path} key={key}>
          <Button
            boxSize="initial"
            justifyContent="flex-start"
            alignItems="center"
            bg={isActive ? activeBg : "transparent"}
            boxShadow={isActive ? sidebarActiveShadow : "none"}
            mb={{
              xl: "6px",
            }}
            mx={{
              xl: "auto",
            }}
            ps={{
              sm: "10px",
              xl: "16px",
            }}
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
              content: isActive ? '""' : "none", // Show vertical line only for active
              position: "absolute",
              top: "4",
              right: "0",
              width: "2px", // Vertical line width
              height: "40%", // Full height
              backgroundColor: "blue.500", // Blue color for the line
              borderRadius: "0px 4px 4px 0px", // Optional: rounded edges for the line
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

  //  BRAND
  var brand = (
    <Box pt={"35px"} mb="8px">
      {logo}
      <HSeparator my="16px" />
    </Box>
  );

  // SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  // Color variables
  return (
    <Flex
      display={{ sm: "flex", xl: "none" }}
      ref={mainPanel}
      alignItems="center"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="35px"
        height="35px"
        borderRadius="50%"
        backgroundColor="white"
        boxShadow="0 2px 6px rgba(0, 0, 0, 0.2)" // Optional, for some shadow effect
      >
        <HamburgerIcon
          color={hamburgerColor}
          w="18px"
          h="18px"
          ref={btnRef}
          onClick={onOpen}
        />
      </Box>

      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={document.documentElement.dir === "rtl" ? "right" : "left"}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          w="250px" // Increased the width here
          maxW="250px" // Ensure the max width is also adjusted
          ms={{ sm: "20px" }}
          my={{ sm: "23px" }}
          borderRadius="20px"
          bg={sidebarBackgroundColor}
        >
          <DrawerCloseButton _focus={{ boxShadow: "none" }} _hover={{ boxShadow: "none" }} />
          <DrawerBody>
            <Box>{brand}</Box>
            <Box>{links}</Box>
            <SidebarHelp />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default Sidebar;