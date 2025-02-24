import {
  Box,
  Button,
  Flex,
  Grid,
  Progress,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import IconBox from "components/Icons/IconBox";
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from "framer-motion"; // Importing motion for animations

// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
// Variables
import { dailyWorkData, socialTraffic } from "variables/general";

export default function Dashboard() {
  // Chakra Color Mode
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textTableColor = useColorModeValue("gray.500", "white");

  const { colorMode } = useColorMode();
  const [currentDate, setCurrentDate] = useState(new Date());
  const history = useHistory();

  const handleNavigateToSupplierInfo = () => {
    history.push('/admin/supplier-info');
  };

  const handleNavigateToSupplierInfo1 = () => {
    history.push('/admin/tables');
  };

  const goToPreviousDate = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1); 
      return newDate;
    });
  };

  const goToNextDate = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };


// Inside the Dashboard component
const [currentTable, setCurrentTable] = useState("Material Inquiry");

const tableNames = [
  "Material Inquiry",
  "Customer Delivery",
  "Customer Order",
  "Material Replenishment"
];

const handlePrevTable = () => {
  const currentIndex = tableNames.indexOf(currentTable);
  if (currentIndex > 0) {
    setCurrentTable(tableNames[currentIndex - 1]);
  }
};

const handleNextTable = () => {
  const currentIndex = tableNames.indexOf(currentTable);
  if (currentIndex < tableNames.length - 1) {
    setCurrentTable(tableNames[currentIndex + 1]);
  }
};

// Inside your JSX where the Supplier Info table is rendered


  
  const isToday = currentDate.toLocaleDateString() === new Date().toLocaleDateString();
  

  const formattedDate = currentDate.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 3, xl: 4 }} spacing="24px" mb="20px">
        <Card minH="125px">
          <Flex direction="column">
            <Flex
              flexDirection="row"
              align="center"
              justify="center"
              w="100%"
              mb="25px"
              onClick={handleNavigateToSupplierInfo}
            >
              <Stat me="auto">
                <StatLabel fontSize="xs" color="gray.400" fontWeight="bold" textTransform="uppercase">
                  new entry
                </StatLabel>
                <Flex>
                  <StatNumber fontSize={18} color={textColor} fontWeight="bold">
                    Supplier Information
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox
                borderRadius="50%"
                as="box"
                h={"45px"}
                w={"45px"}
                bg={iconBlue}
              >
                <WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>
            <Text color="gray.400" fontSize="sm">
              <Text as="span" color="green.400" fontWeight="bold">
                {" "}
              </Text>
              <Box onClick={handleNavigateToSupplierInfo1}>Tap here to view</Box>
            </Text>
          </Flex>
        </Card>
        {/* Other cards... */}
        <Card minH='125px'>
          <Flex direction='column'>
            <Flex
              flexDirection='row'
              align='center'
              justify='center'
              w='100%'
              mb='25px'>
              <Stat me='auto'>
                <StatLabel
                  fontSize='xs'
                  color='gray.400'
                  fontWeight='bold'
                  textTransform='uppercase'>
                  new entry
                </StatLabel>
                <Flex>
                  <StatNumber fontSize='lg' color={textColor} fontWeight='bold'>
                    Material Inquiry
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox
                borderRadius='50%'
                as='box'
                h={"45px"}
                w={"45px"}
                bg={iconBlue}>
                <GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>
            <Text color='gray.400' fontSize='sm'>
              <Text as='span' color='green.400' fontWeight='bold'>
                {" "}
              </Text>
              Tap here to view
            </Text>
          </Flex>
        </Card>
        <Card minH='125px'>
          <Flex direction='column'>
            <Flex
              flexDirection='row'
              align='center'
              justify='center'
              w='100%'
              mb='25px'>
              <Stat me='auto'>
                <StatLabel
                  fontSize='xs'
                  color='gray.400'
                  fontWeight='bold'
                  textTransform='uppercase'>
                  new entry
                </StatLabel>
                <Flex>
                  <StatNumber fontSize='lg' color={textColor} fontWeight='bold'>
                    Customer Delivery
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox
                borderRadius='50%'
                as='box'
                h={"45px"}
                w={"45px"}
                bg={iconBlue}>
                <DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>
            <Text color='gray.400' fontSize='sm'>
              <Text as='span' color='red.500' fontWeight='bold'>
                {" "}
              </Text>
              Tap here to view
            </Text>
          </Flex>
        </Card>
        <Card minH='125px'>
          <Flex direction='column'>
            <Flex
              flexDirection='row'
              align='center'
              justify='center'
              w='100%'
              mb='25px'>
              <Stat me='auto'>
                <StatLabel
                  fontSize='xs'
                  color='gray.400'
                  fontWeight='bold'
                  textTransform='uppercase'>
                  new entry
                </StatLabel>
                <Flex>
                  <StatNumber fontSize='lg' color={textColor} fontWeight='bold'>
                    Customer Order
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox
                borderRadius='50%'
                as='box'
                h={"45px"}
                w={"45px"}
                bg={iconBlue}>
                <CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>
            <Text color='gray.400' fontSize='sm'>
              <Text as='span' color='green.400' fontWeight='bold'>
                {" "}
              </Text>
              Tap here to view
            </Text>
          </Flex>
        </Card>
        <Card minH='125px'>
          <Flex direction='column'>
            <Flex
              flexDirection='row'
              align='center'
              justify='center'
              w='100%'
              mb='25px'>
              <Stat me='auto'>
                <StatLabel
                  fontSize='xs'
                  color='gray.400'
                  fontWeight='bold'
                  textTransform='uppercase'>
                  new entry
                </StatLabel>
                <Flex>
                  <StatNumber fontSize={18.5} color={textColor} fontWeight='bold'>
                    Material Replenishment
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox
                borderRadius='50%'
                as='box'
                h={"45px"}
                w={"45px"}
                bg={iconBlue}>
                <GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>
            <Text color='gray.400' fontSize='sm'>
              <Text as='span' color='green.400' fontWeight='bold'>
                {" "}
              </Text>
              Tap here to view
            </Text>
          </Flex>
        </Card>
        <Card minH='125px'>
          <Flex direction='column'>
            <Flex
              flexDirection='row'
              align='center'
              justify='center'
              w='100%'
              mb='25px'>
              <Stat me='auto'>
                <StatLabel
                  fontSize='xs'
                  color='gray.400'
                  fontWeight='bold'
                  textTransform='uppercase'>
                  new entry
                </StatLabel>
                <Flex>
                  <StatNumber fontSize='18' color={textColor} fontWeight='bold'>
                    Daily Work Report
                  </StatNumber>
                </Flex>
              </Stat>
              <IconBox
                borderRadius='50%'
                as='box'
                h={"45px"}
                w={"45px"}
                bg={iconBlue}>
                <GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>
            <Text color='gray.400' fontSize='sm'>
              <Text as='span' color='green.400' fontWeight='bold'>
               {" "}
              </Text>
              Tap here to view
            </Text>
          </Flex>
        </Card>
      
      </SimpleGrid>

      <Grid templateColumns={{ sm: "1fr", lg: "2fr 1fr" }} templateRows={{ lg: "repeat(2, auto)" }} gap="20px">
        <Card p="0px" maxW={{ sm: "320px", md: "100%" }}>
          <Flex direction="column">
          <Flex align="center" justify="space-between" p="22px">
  <Text fontSize="lg" color={textColor} fontWeight="bold">
    Daily Work
  </Text>
  <Flex align="center">
    <Button variant="link" onClick={goToPreviousDate} fontSize="lg" color="gray.400" mr="10px">
      &lt;
    </Button>
    <Text color="gray.400" fontSize="sm">{formattedDate}</Text>
    <Button
      variant="link"
      onClick={goToNextDate}
      fontSize="lg"
      color="gray.400"
      ml="10px"
      style={{ display: isToday ? 'none' : 'block' }} // Hide if today
    >
      &gt;
    </Button>
  </Flex>
  <Button variant="primary" maxH="30px" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
    SEE ALL
  </Button>
</Flex>


            <Box overflow={{ sm: "scroll", lg: "hidden" }}>
              <Table>
                <Thead>
                  <Tr bg={tableRowColor}>
                    <Th
                      color="gray.400"
                      borderColor={borderColor}
                      position="relative"
                      _hover={{ color: "blue.500" }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          height: "2px",
                          backgroundColor: "blue",
                        }}
                      />
                      Nature of Work
                    </Th>
                    <Th
                      color="gray.400"
                      borderColor={borderColor}
                      position="relative"
                      _hover={{ color: "blue.500" }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          height: "2px",
                          backgroundColor: "blue",
                        }}
                      />
                      Progress
                    </Th>
                    <Th
                      color="gray.400"
                      borderColor={borderColor}
                      position="relative"
                      _hover={{ color: "blue.500" }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          height: "2px",
                          backgroundColor: "blue",
                        }}
                      />
                      Hour of Work
                    </Th>
                    <Th
                      color="gray.400"
                      borderColor={borderColor}
                      position="relative"
                      _hover={{ color: "blue.500" }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          height: "2px",
                          backgroundColor: "blue",
                        }}
                      />
                      Charges
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {dailyWorkData.map((el, index, arr) => (
                    <Tr
                      key={index}
                      _hover={{ bg: "blue.50" }} // Hover effect for rows
                      transition="background-color 0.3s ease"
                    >
                      <Td color={textTableColor} fontSize="sm" fontWeight="bold" borderColor={borderColor} border={index === arr.length - 1 ? "none" : null}>
                        {el.natureOfWork}
                      </Td>
                      <Td color={textTableColor} fontSize="sm" borderColor={borderColor} border={index === arr.length - 1 ? "none" : null}>
                        {el.progress}
                      </Td>
                      <Td color={textTableColor} fontSize="sm" borderColor={borderColor} border={index === arr.length - 1 ? "none" : null}>
                        {el.hoursOfWork}
                      </Td>
                      <Td color={textTableColor} fontSize="sm" borderColor={borderColor} border={index === arr.length - 1 ? "none" : null}>
                        {el.charges}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Flex>
        </Card>
        <Card p="0px" maxW={{ sm: "320px", md: "100%" }}>
  <Flex direction="column">
    <Flex align="center" justify="space-between" p="22px">
      <Text fontSize="lg" color={textColor} fontWeight="bold">
        {currentTable} {/* Display the current table name */}
      </Text>
      <Button 
        variant="link" 
        fontSize="sm" 
        color="gray.400" 
        ml="auto" 
        mr="30px" 
        onClick={handlePrevTable} // Handle previous table
      >
        Previous
      </Button>
      <Button 
        variant="link" 
        fontSize="sm" 
        color="gray.400" 
        onClick={handleNextTable} // Handle next table
      >
        Next
      </Button>
    </Flex>
  </Flex>

  <Box overflow={{ sm: "scroll", lg: "hidden" }}>
    <Table>
      <Thead>
        <Tr bg={tableRowColor}>
          <Th
            color="gray.400"
            borderColor={borderColor}
            position="relative"
            _hover={{ color: "blue.500" }}
          >
            <motion.div
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                height: "2px",
                backgroundColor: "blue",
              }}
            />
            Project
          </Th>
          <Th
            color="gray.400"
            borderColor={borderColor}
            position="relative"
            _hover={{ color: "blue.500" }}
          >
            <motion.div
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                height: "2px",
                backgroundColor: "blue",
              }}
            />
            Status
          </Th>
          <Th color="gray.400" borderColor={borderColor}></Th>
        </Tr>
      </Thead>
      <Tbody>
        {socialTraffic.map((el, index, arr) => (
          <Tr
            key={index}
            _hover={{ bg: "blue.50" }} // Hover effect for rows
            transition="background-color 0.3s ease"
          >
            <Td color={textTableColor} fontSize="sm" fontWeight="bold" borderColor={borderColor} border={index === arr.length - 1 ? "none" : null}>
              {el.referral}
            </Td>
            <Td color={textTableColor} fontSize="sm" borderColor={borderColor} border={index === arr.length - 1 ? "none" : null}>
              {el.visitors}
            </Td>
            <Td color={textTableColor} fontSize="sm" borderColor={borderColor} border={index === arr.length - 1 ? "none" : null}>
              <Flex align="center">
                <Text color={textTableColor} fontWeight="bold" fontSize="sm" me="12px">{`${el.percentage}%`}</Text>
                <Progress size="xs" colorScheme={el.color} value={el.percentage} minW="120px" />
              </Flex>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Box>
</Card>
        {/* Rest of your code */}
      </Grid>
    </Flex>
  );
}

