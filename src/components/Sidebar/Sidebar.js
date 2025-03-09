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
  Avatar,
  Icon,
  IconButton,
  HStack,
  VStack,
  Collapse,
} from "@chakra-ui/react";
import IconBox from "components/Icons/IconBox";
import { HSeparator } from "components/Separator/Separator";
import React, { useContext, useRef, useState, useEffect } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { SidebarContext } from "contexts/SidebarContext";
import { 
  FaChevronDown, 
  FaChevronUp, 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaSignOutAlt,
  FaChevronRight
} from "react-icons/fa";

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

  // Secondary navbar state
  const [secondaryNavbarOpen, setSecondaryNavbarOpen] = useState(false);
  const [activeSecondaryRoute, setActiveSecondaryRoute] = useState(null);

  // Footer states
  const [showFooter, setShowFooter] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [anyCategoryOpen, setAnyCategoryOpen] = useState(false);

  // Handle scroll event to hide footer
  useEffect(() => {
    const sidebarElement = mainPanel.current;
    let scrollTimeout;

    const handleScroll = () => {
      setIsScrolling(true);
      
      // Clear the previous timeout
      clearTimeout(scrollTimeout);
      
      // Set a timeout to detect when scrolling stops
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 500);
    };

    if (sidebarElement) {
      sidebarElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (sidebarElement) {
        sidebarElement.removeEventListener('scroll', handleScroll);
      }
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Check if any category is open
  useEffect(() => {
    const isAnyCategoryOpen = Object.values(state).some(value => value === true);
    setAnyCategoryOpen(isAnyCategoryOpen);
  }, [state]);

  // activeRoute function to check if the current route is active
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  const { logo, routes } = props;

  const toggleSecondaryNavbar = (route) => {
    if (activeSecondaryRoute === route.path) {
      setSecondaryNavbarOpen(!secondaryNavbarOpen);
    } else {
      setActiveSecondaryRoute(route.path);
      setSecondaryNavbarOpen(true);
    }
  };

  // Logout function
  const handleLogout = () => {
    // Clear any auth tokens or user data
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    
    // You can add additional cleanup here
    console.log("User logged out");
    
    // Redirect to sign-in page
    history.push("/auth/signin");
  };

  const createLinks = (routes) => {
    // Defining variables for active/inactive states
    const activeBg = useColorModeValue("white", "navy.700");
    const inactiveBg = useColorModeValue("white", "navy.700");
    const activeColor = useColorModeValue("gray.700", "white");
    const inactiveColor = useColorModeValue("gray.400", "gray.400");
    const sidebarActiveShadow = "0px 7px 11px rgba(0, 0, 0, 0.04)";

    return routes.map((prop, key) => {
      // Skip routes that should not be shown in sidebar
      if (prop.redirect || prop.sidebar === false) {
        return null;
      }

      if (prop.category) {
        const isOpen = state[prop.state]; // Check if the category is open
        
        // Skip category if it should not be shown in sidebar
        if (prop.sidebar === false) {
          return null;
        }
        
        // Filter views that should appear in sidebar
        const sidebarViews = prop.views.filter(view => view.sidebar !== false);
        
        // If no views to show, skip this category
        if (sidebarViews.length === 0) {
          return null;
        }
        
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
              <Icon 
                as={isOpen ? FaChevronDown : FaChevronRight} 
                mr="8px" 
                color={activeColor}
              />
            </Flex>
            <Collapse in={isOpen}>
              {createLinks(sidebarViews)} {/* Render sub-items if open */}
            </Collapse>
          </Box>
        );
      }

      const isActive = activeRoute(prop.layout + prop.path) === "active";
      const hasSecondaryNavbar = prop.secondaryNavbar === true;
      
      return (
        <Flex key={key} width="100%" position="relative" align="center">
          <NavLink to={prop.layout + prop.path} style={{ width: hasSecondaryNavbar ? '85%' : '100%' }}>
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
          
          {/* Secondary navbar toggle button */}
          {hasSecondaryNavbar && (
            <IconButton
              icon={
                activeSecondaryRoute === prop.path && secondaryNavbarOpen ? 
                <FaChevronDown /> : <FaChevronRight />
              }
              variant="ghost"
              size="sm"
              position="absolute"
              right="0"
              aria-label="Toggle secondary navbar"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleSecondaryNavbar(prop);
              }}
            />
          )}
        </Flex>
      );
    });
  };

  // Secondary Navbar Component
  const SecondaryNavbar = ({ route }) => {
    if (!route) return null;
    
    const bgColor = useColorModeValue("white", "navy.700");
    const textColor = useColorModeValue("gray.700", "white");
    
    return (
      <Collapse in={secondaryNavbarOpen}>
        <Box
          bg={bgColor}
          borderRadius="15px"
          p={3}
          mt={2}
          mb={4}
          boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
        >
          <Text fontWeight="bold" mb={2} color={textColor}>
            {route.name} Details
          </Text>
          <VStack align="stretch" spacing={2}>
            {/* Example secondary navbar content */}
            <Button variant="ghost" size="sm" justifyContent="flex-start">
              View Details
            </Button>
            <Button variant="ghost" size="sm" justifyContent="flex-start">
              Edit {route.name}
            </Button>
            <Button variant="ghost" size="sm" justifyContent="flex-start">
              Settings
            </Button>
          </VStack>
        </Box>
      </Collapse>
    );
  };

  // User Footer component
  const UserFooter = () => {
    const bgColor = useColorModeValue("white", "navy.800");
    const textColor = useColorModeValue("gray.700", "white");
    const iconColor = useColorModeValue("blue.500", "blue.400");
    
    // Don't show footer if any category is open
    if (anyCategoryOpen) {
      return null;
    }
    
    return (
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        bg={bgColor}
        p={4}
        borderTopRadius="15px"
        boxShadow="0 -4px 12px 0 rgba(0, 0, 0, 0.05)"
        transform={showFooter ? "translateY(0)" : "translateY(70%)"}
        transition="transform 0.3s ease"
        opacity={isScrolling ? 0.2 : 1}
        _hover={{ opacity: 1 }}
        zIndex={2}
      >
        <IconButton
          icon={showFooter ? <FaChevronDown /> : <FaChevronUp />}
          variant="ghost"
          position="absolute"
          top="-15px"
          left="50%"
          transform="translateX(-50%)"
          borderRadius="full"
          size="sm"
          onClick={() => setShowFooter(!showFooter)}
          aria-label={showFooter ? "Hide footer" : "Show footer"}
          bg={bgColor}
          boxShadow="0 -4px 12px 0 rgba(0, 0, 0, 0.05)"
        />
        
        <Flex direction="column" align="center">
          <Flex align="center" mb={2}>
            <Avatar size="md" name="User Name" src="/path/to/user-image.jpg" mr={3} />
            <VStack spacing={0} align="start">
              <Text fontWeight="bold" fontSize="sm" color={textColor}>
                User Name
              </Text>
              <Text fontSize="xs" color="gray.500">
                user@example.com
              </Text>
            </VStack>
          </Flex>
          
          <HSeparator my={2} />
          
          <HStack spacing={4} my={2}>
            <IconButton
              aria-label="Facebook"
              icon={<FaFacebook />}
              variant="ghost"
              colorScheme="blue"
              size="sm"
            />
            <IconButton
              aria-label="Twitter"
              icon={<FaTwitter />}
              variant="ghost"
              colorScheme="blue"
              size="sm"
            />
            <IconButton
              aria-label="Instagram"
              icon={<FaInstagram />}
              variant="ghost"
              colorScheme="blue"
              size="sm"
            />
          </HStack>
          
          <Button
            leftIcon={<FaSignOutAlt />}
            variant="outline"
            size="sm"
            width="100%"
            mt={2}
            onClick={handleLogout}
            colorScheme="blue"
          >
            Logout
          </Button>
        </Flex>
      </Box>
    );
  };

  // Filter routes that should appear in sidebar
  const sidebarRoutes = routes.filter(route => route.sidebar !== false);
  var links = <>{createLinks(sidebarRoutes)}</>;

  // Find active route with secondaryNavbar flag
  const activeRouteWithSecondary = routes.find(route => 
    route.secondaryNavbar && 
    route.path && 
    activeRoute(route.layout + route.path) === "active"
  );

  // If there's an active route with secondaryNavbar, set it as active
  useEffect(() => {
    if (activeRouteWithSecondary) {
      setActiveSecondaryRoute(activeRouteWithSecondary.path);
      setSecondaryNavbarOpen(true);
    }
  }, [location.pathname]);

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

  // Calculate bottom padding based on secondary navbar and category state
  const contentBottomPadding = anyCategoryOpen ? "20px" : (secondaryNavbarOpen ? "150px" : "80px");

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
        sx={{
          scrollbarWidth: isScrolling ? "none" : "auto",
          "&::-webkit-scrollbar": {
            width: isScrolling ? "0px" : "6px",
            transition: "width 0.3s ease"
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
          }
        }}
      >
        <Box>
          {brand}
          <Stack direction="column" mb={contentBottomPadding}>
            <Box>{links}</Box>
            
            {/* Secondary Navbar */}
            {activeSecondaryRoute && !anyCategoryOpen && (
              <SecondaryNavbar route={routes.find(r => r.path === activeSecondaryRoute)} />
            )}
          </Stack>
          
          {/* User profile footer */}
          <UserFooter />
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
  const [state, setState] = React.useState({}); // Added missing state declaration
  const [showFooter, setShowFooter] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [secondaryNavbarOpen, setSecondaryNavbarOpen] = useState(false);
  const [activeSecondaryRoute, setActiveSecondaryRoute] = useState(null);
  const [anyCategoryOpen, setAnyCategoryOpen] = useState(false);
  const history = useHistory();

  // Define the sidebar background color using Chakra's useColorModeValue
  const sidebarBackgroundColor = useColorModeValue("white", "navy.800");

  // Check if any category is open
  useEffect(() => {
    const isAnyCategoryOpen = Object.values(state).some(value => value === true);
    setAnyCategoryOpen(isAnyCategoryOpen);
  }, [state]);

  // Handle scroll event for responsive sidebar
  useEffect(() => {
    const drawerBody = document.querySelector(".chakra-drawer__body");
    let scrollTimeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 500);
    };

    if (drawerBody) {
      drawerBody.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (drawerBody) {
        drawerBody.removeEventListener('scroll', handleScroll);
      }
      clearTimeout(scrollTimeout);
    };
  }, [isOpen]);

  // activeRoute function to check if the current route is active
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  // Toggle secondary navbar
  const toggleSecondaryNavbar = (route) => {
    if (activeSecondaryRoute === route.path) {
      setSecondaryNavbarOpen(!secondaryNavbarOpen);
    } else {
      setActiveSecondaryRoute(route.path);
      setSecondaryNavbarOpen(true);
    }
  };

  // Logout function for responsive view
  const handleLogout = () => {
    // Clear any auth tokens or user data
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    
    // Close the drawer
    onClose();
    
    // Redirect to sign-in page
    history.push("/auth/signin");
  };

  // Find active route with secondaryNavbar flag
  useEffect(() => {
    const activeRouteWithSecondary = routes.find(route => 
      route.secondaryNavbar && 
      route.path && 
      location.pathname === (route.layout + route.path)
    );

    if (activeRouteWithSecondary) {
      setActiveSecondaryRoute(activeRouteWithSecondary.path);
      setSecondaryNavbarOpen(true);
    }
  }, [location.pathname, routes]);

  // Secondary Navbar Component for responsive view
  const SecondaryNavbar = ({ route }) => {
    if (!route) return null;
    
    const bgColor = useColorModeValue("white", "navy.700");
    const textColor = useColorModeValue("gray.700", "white");
    
    return (
      <Collapse in={secondaryNavbarOpen}>
        <Box
          bg={bgColor}
          borderRadius="15px"
          p={3}
          mt={2}
          mb={4}
          boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
        >
          <Text fontWeight="bold" mb={2} color={textColor}>
            {route.name} Details
          </Text>
          <VStack align="stretch" spacing={2}>
            <Button variant="ghost" size="sm" justifyContent="flex-start">
              View Details
            </Button>
            <Button variant="ghost" size="sm" justifyContent="flex-start">
              Edit {route.name}
            </Button>
            <Button variant="ghost" size="sm" justifyContent="flex-start">
              Settings
            </Button>
          </VStack>
        </Box>
      </Collapse>
    );
  };

  // User Footer component for responsive view
  const UserFooter = () => {
    const bgColor = useColorModeValue("white", "navy.800");
    const textColor = useColorModeValue("gray.700", "white");
    
    // Don't show footer if any category is open
    if (anyCategoryOpen) {
      return null;
    }
    
    return (
      <Box
        bg={bgColor}
        p={4}
        borderTopRadius="15px"
        boxShadow="0 -4px 12px 0 rgba(0, 0, 0, 0.05)"
        transform={showFooter ? "translateY(0)" : "translateY(70%)"}
        transition="transform 0.3s ease"
        opacity={isScrolling ? 0.2 : 1}
        _hover={{ opacity: 1 }}
        zIndex={2}
      >
        <IconButton
          icon={showFooter ? <FaChevronDown /> : <FaChevronUp />}
          variant="ghost"
          position="absolute"
          top="-15px"
          left="50%"
          transform="translateX(-50%)"
          borderRadius="full"
          size="sm"
          onClick={() => setShowFooter(!showFooter)}
          aria-label={showFooter ? "Hide footer" : "Show footer"}
          bg={bgColor}
          boxShadow="0 -4px 12px 0 rgba(0, 0, 0, 0.05)"
        />
        
        <Flex direction="column" align="center">
          <Flex align="center" mb={2}>
            <Avatar size="md" name="User Name" src="/path/to/user-image.jpg" mr={3} />
            <VStack spacing={0} align="start">
              <Text fontWeight="bold" fontSize="sm" color={textColor}>
                User Name
              </Text>
              <Text fontSize="xs" color="gray.500">
                user@example.com
              </Text>
            </VStack>
          </Flex>
          
          <HSeparator my={2} />
          
          <HStack spacing={4} my={2}>
            <IconButton
              aria-label="Facebook"
              icon={<FaFacebook />}
              variant="ghost"
              colorScheme="blue"
              size="sm"
            />
            <IconButton
              aria-label="Twitter"
              icon={<FaTwitter />}
              variant="ghost"
              colorScheme="blue"
              size="sm"
            />
            <IconButton
              aria-label="Instagram"
              icon={<FaInstagram />}
              variant="ghost"
              colorScheme="blue"
              size="sm"
            />
          </HStack>
          
          <Button
            leftIcon={<FaSignOutAlt />}
            variant="outline"
            size="sm"
            width="100%"
            mt={2}
            onClick={handleLogout}
            colorScheme="blue"
          >
            Logout
          </Button>
        </Flex>
      </Box>
    );
  };

  const createLinks = (routes) => {
    // Defining variables for active/inactive states
    const activeBg = useColorModeValue("white", "navy.700");
    const inactiveBg = useColorModeValue("white", "navy.700");
    const activeColor = useColorModeValue("gray.700", "white");
    const inactiveColor = useColorModeValue("gray.400", "gray.400");
    const sidebarActiveShadow = "0px 7px 11px rgba(0, 0, 0, 0.04)";

    return routes.map((prop, key) => {
      // Skip routes that should not be shown in sidebar
      if (prop.redirect || prop.sidebar === false) {
        return null;
      }

      if (prop.category) {
        const isOpen = state[prop.state]; // Check if category open in state
        
        // Filter views that should appear in sidebar
        const sidebarViews = prop.views.filter(view => view.sidebar !== false);
        
        // If no views to show, skip this category
        if (sidebarViews.length === 0) {
          return null;
        }
        
        return (
          <Box key={key}>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              onClick={() => {
                // Toggle the category
                setState({ ...state, [prop.state]: !state[prop.state] });
              }}
              cursor="pointer"
              mb={{ base: "6px", xl: "12px" }}
              mx="auto"
              ps={{ sm: "10px", xl: "16px" }}
              py="12px"
            >
              <Text color={activeColor} fontWeight="bold">
                {document.documentElement.dir === "rtl"
                  ? prop.rtlName
                  : prop.name}
              </Text>
              <Icon 
                as={state[prop.state] ? FaChevronDown : FaChevronRight} 
                mr="8px" 
                color={activeColor}
              />
            </Flex>
            <Collapse in={state[prop.state]}>
              {createLinks(sidebarViews)}
            </Collapse>
          </Box>
        );
      }

      const isActive = activeRoute(prop.layout + prop.path) === "active";
      const hasSecondaryNavbar = prop.secondaryNavbar === true;
      
      return (
        <Flex key={key} width="100%" position="relative" align="center">
          <NavLink to={prop.layout + prop.path} style={{ width: hasSecondaryNavbar ? '85%' : '100%' }} onClick={onClose}>
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
          
          {/* Secondary navbar toggle button */}
          {hasSecondaryNavbar && (
            <IconButton
              icon={
                activeSecondaryRoute === prop.path && secondaryNavbarOpen ? 
                <FaChevronDown /> : <FaChevronRight />
              }
              variant="ghost"
              size="sm"
              position="absolute"
              right="0"
              aria-label="Toggle secondary navbar"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleSecondaryNavbar(prop);
              }}
            />
          )}
        </Flex>
      );
    });
  };

  // Calculate bottom padding based on secondary navbar and category state
  const contentBottomPadding = anyCategoryOpen ? "20px" : (secondaryNavbarOpen ? "150px" : "80px");

  // Filter routes that should appear in sidebar for responsive view
  const sidebarRoutes = routes.filter(route => route.sidebar !== false);
  var links = <>{createLinks(sidebarRoutes)}</>;

  return (
    <Box display={{ sm: "block", xl: "none" }}>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay onClick={onClose} />
        <DrawerContent bg={sidebarBackgroundColor}>
          <DrawerCloseButton />
          <DrawerBody p="0px" className="chakra-drawer__body"
            sx={{
              scrollbarWidth: isScrolling ? "none" : "auto",
              "&::-webkit-scrollbar": {
                width: isScrolling ? "0px" : "6px",
                transition: "width 0.3s ease"
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(0, 0, 0, 0.2)",
                borderRadius: "10px",
              }
            }}
          >
            <Box mb={contentBottomPadding} p="16px">
              {links}
              
              {/* Secondary Navbar in responsive view - hidden if category open */}
              {activeSecondaryRoute && !anyCategoryOpen && (
                <SecondaryNavbar route={routes.find(r => r.path === activeSecondaryRoute)} />
              )}
            </Box>
            
            {/* User profile footer in responsive view */}
            <UserFooter />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default Sidebar;