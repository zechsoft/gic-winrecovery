import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Image,
  Link,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
  Input,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar5 from "assets/img/avatars/avatar5.png";
import avatar6 from "assets/img/avatars/avatar6.png";
import ImageArchitect1 from "assets/img/ImageArchitect1.png";
import ImageArchitect2 from "assets/img/ImageArchitect2.png";
import ImageArchitect3 from "assets/img/ImageArchitect3.png";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React, { useState } from "react";
import {
  FaCube,
  FaFacebook,
  FaInstagram,
  FaPenFancy,
  FaPlus,
  FaTwitter,
} from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";

function Profile() {
  const { colorMode } = useColorMode();
  const [activeSection, setActiveSection] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    fullName: "Esthera Jackson",
    mobile: "(44) 123 1234 123",
    email: "esthera@simmmple.com",
    location: "United States",
    bio: "Hi, I’m Esthera Jackson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).",
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [profileImage, setProfileImage] = useState(avatar5);
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Modern",
      description: "As Uber works through a huge amount of internal management turmoil.",
      image: ImageArchitect1,
    },
    {
      id: 2,
      name: "Scandinavian",
      description: "Music is something that every person has his or her own specific opinion about.",
      image: ImageArchitect2,
    },
    {
      id: 3,
      name: "Minimalist",
      description: "Different people have different taste, especially various types of music.",
      image: ImageArchitect3,
    },
  ]);

  const textColor = useColorModeValue("gray.700", "white");
  const iconColor = useColorModeValue("blue.500", "white");
  const bgProfile = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
  const borderProfileColor = useColorModeValue("white", "transparent");
  const emailColor = useColorModeValue("gray.400", "gray.300");

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleProfileInfoChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setActiveSection("projects");
  };

  const handleProjectEditClick = (project) => {
    setSelectedProject(project);
    setIsEditing(true);
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setSelectedProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleProjectImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedProject((prevProject) => ({
          ...prevProject,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProject = () => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === selectedProject.id ? selectedProject : project
      )
    );
    setIsEditing(false);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px", lg: "100px" }}>
      <Flex
        direction={{ sm: "column", md: "row" }}
        mb="24px"
        maxH="330px"
        justifyContent={{ sm: "center", md: "space-between" }}
        align="center"
        backdropFilter="blur(21px)"
        boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
        border="1.5px solid"
        borderColor={borderProfileColor}
        bg={bgProfile}
        p="24px"
        borderRadius="20px"
      >
        <Flex
          align="center"
          mb={{ sm: "10px", md: "0px" }}
          direction={{ sm: "column", md: "row" }}
          w={{ sm: "100%" }}
          textAlign={{ sm: "center", md: "start" }}
        >
          <Avatar
            me={{ md: "22px" }}
            src={profileImage}
            w="80px"
            h="80px"
            borderRadius="15px"
          />
          <Flex direction="column" maxWidth="100%" my={{ sm: "14px" }}>
            <Text
              fontSize={{ sm: "lg", lg: "xl" }}
              color={textColor}
              fontWeight="bold"
              ms={{ sm: "8px", md: "0px" }}
            >
              {profileInfo.fullName}
            </Text>
            <Text
              fontSize={{ sm: "sm", md: "md" }}
              color={emailColor}
              fontWeight="semibold"
            >
              {profileInfo.email}
            </Text>
          </Flex>
        </Flex>
        <Flex
          direction={{ sm: "column", lg: "row" }}
          w={{ sm: "100%", md: "50%", lg: "auto" }}
        >
          <Button
            p="0px"
            bg="transparent"
            variant="no-effects"
            onClick={() => setActiveSection("overview")}
          >
            <Flex
              align="center"
              w={{ sm: "100%", lg: "135px" }}
              bg={activeSection === "overview" ? "#fff" : "transparent"}
              borderRadius="8px"
              justifyContent="center"
              py="10px"
              boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.06)"
              cursor="pointer"
            >
              <Icon color={textColor} as={FaCube} me="6px" />
              <Text fontSize="xs" color={textColor} fontWeight="bold">
                OVERVIEW
              </Text>
            </Flex>
          </Button>
          <Button
            p="0px"
            bg="transparent"
            variant="no-effects"
            onClick={() => setActiveSection("info")}
          >
            <Flex
              align="center"
              w={{ lg: "135px" }}
              borderRadius="8px"
              justifyContent="center"
              py="10px"
              mx={{ lg: "1rem" }}
              bg={activeSection === "info" ? "#fff" : "transparent"}
              boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.06)"
              cursor="pointer"
            >
              <Icon color={textColor} as={IoDocumentsSharp} me="6px" />
              <Text fontSize="xs" color={textColor} fontWeight="bold">
                INFO
              </Text>
            </Flex>
          </Button>
          <Button
            p="0px"
            bg="transparent"
            variant="no-effects"
            onClick={() => setActiveSection("projects")}
          >
            <Flex
              align="center"
              w={{ lg: "135px" }}
              borderRadius="8px"
              justifyContent="center"
              py="10px"
              boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.06)"
              bg={activeSection === "projects" ? "#fff" : "transparent"}
              cursor="pointer"
            >
              <Icon color={textColor} as={FaPenFancy} me="6px" />
              <Text fontSize="xs" color={textColor} fontWeight="bold">
                PROJECTS
              </Text>
            </Flex>
          </Button>
        </Flex>
      </Flex>

      {activeSection === "overview" && (
        <Grid templateColumns={{ sm: "1fr", xl: "1fr" }} gap="22px">
          <Card p="16px" my={{ sm: "24px", xl: "0px" }}>
            <CardHeader p="12px 5px" mb="12px">
              <Text fontSize="lg" color={textColor} fontWeight="bold">
                Profile Information
              </Text>
            </CardHeader>
            <CardBody px="5px">
              <Flex direction="column">
                <Text fontSize="md" color="gray.400" fontWeight="400" mb="30px">
                  {profileInfo.bio}
                </Text>
                <Flex align="center" mb="18px">
                  <Text fontSize="md" color={textColor} fontWeight="bold" me="10px">
                    Full Name:{" "}
                  </Text>
                  <Text fontSize="md" color="gray.400" fontWeight="400">
                    {profileInfo.fullName}
                  </Text>
                </Flex>
                {/* ... other profile info fields ... */}
              </Flex>
            </CardBody>
          </Card>
          <Card p="16px" my="24px">
            <CardHeader p="12px 5px" mb="12px">
              <Flex direction="column">
                <Text fontSize="lg" color={textColor} fontWeight="bold">
                  Projects
                </Text>
                <Text fontSize="sm" color="gray.400" fontWeight="400">
                  Architects design houses
                </Text>
              </Flex>
            </CardHeader>
            <CardBody px="5px">
              <Grid
                templateColumns={{ sm: "1fr", md: "1fr", xl: "1fr" }}
                gap="24px"
              >
                {projects.map((project, index) => (
                  <Flex direction="column" key={index} onClick={() => handleProjectClick(project)}>
                    <Box mb="20px" position="relative" borderRadius="15px">
                      <Image src={project.image} borderRadius="15px" />
                      <Box
                        w="100%"
                        h="100%"
                        position="absolute"
                        top="0"
                        borderRadius="15px"
                        bg="linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)"
                      ></Box>
                    </Box>
                    <Flex direction="column">
                      <Text fontSize="md" color="gray.400" fontWeight="600" mb="10px">
                        Project #{index + 1}
                      </Text>
                      <Text fontSize="xl" color={textColor} fontWeight="bold" mb="10px">
                        {project.name}
                      </Text>
                      <Text fontSize="md" color="gray.400" fontWeight="400" mb="20px">
                        {project.description}
                      </Text>
                      <Flex justifyContent="space-between">
                        <Button variant="dark" minW="110px" h="36px" onClick={() => handleProjectEditClick(project)}>
                          EDIT
                        </Button>
                        <AvatarGroup size="xs">
                          <Avatar name="Ryan Florence" src={avatar6} />
                          <Avatar name="Segun Adebayo" src={avatar2} />
                          <Avatar name="Kent Dodds" src={avatar3} />
                          <Avatar name="Prosper Otemuyiwa" src={avatar4} />
                        </AvatarGroup>
                      </Flex>
                    </Flex>
                  </Flex>
                ))}
              </Grid>
            </CardBody>
          </Card>
        </Grid>
      )}
    </Flex>
  );
}

export default Profile;
