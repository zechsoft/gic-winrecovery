import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Td,
  Thead,
  Tr,
  useColorModeValue,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Input,
  HStack
} from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons'; // For the dropdown icon
import React, { useState } from "react";
import { tablesProjectData, tablesTableData } from "variables/general";

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TablesProjectRow from "components/Tables/TablesProjectRow";
import TablesTableRow from "components/Tables/TablesTableRow";

function Tables() {
  const [currentTable, setCurrentTable] = useState('Supplier Information'); // State to control the visible table
  const [searchQuery, setSearchQuery] = useState(''); // State to control the search input
  const [currentPage, setCurrentPage] = useState(1); // State to control the current page

  const rowsPerPage = 5;
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // Filtered data based on search query
  const filteredTableData = tablesTableData.filter(row =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.customerNumber.toString().includes(searchQuery)
  );

  const filteredProjectData = tablesProjectData.filter(row =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate the indices for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentRows = filteredTableData.slice(indexOfFirstRow, indexOfLastRow); // Get current page rows

  const totalPages = Math.ceil(filteredTableData.length / rowsPerPage); // Total number of pages

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // Pagination controls
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px" display="flex" justifyContent="space-between" alignItems="center">
          {/* Left Side: Dropdown Menu for table selection */}
          <HStack spacing={5}>
            <Menu>
              <MenuButton as={IconButton} icon={<ChevronDownIcon />} variant="outline" />
              <MenuList>
                <MenuItem onClick={() => setCurrentTable('Supplier Information')}>Supplier Information</MenuItem>
                <MenuItem onClick={() => setCurrentTable('Projects Table')}>Projects Table</MenuItem>
              </MenuList>
            </Menu>
            {/* Table Name placed 2px to the right of the dropdown */}
            <Text fontSize="xl" color={textColor} fontWeight="bold" ml={7}>
              {currentTable}
            </Text>
          </HStack>

          {/* Right Side: Search Bar and Buttons */}
          <HStack spacing={4} ml="auto">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              size={"md"}
              width="auto"
              height={8}
            />
            <Button colorScheme="blue" size="sm" height={9} width={20} onClick={handleClearSearch}>Clear</Button>
            <Button colorScheme="gray" size="sm" height={9} onClick={() => alert("Add New clicked!")}>Add New</Button>
          </HStack>
        </CardHeader>

        {/* Table Body */}
        <CardBody>
          <div style={{ overflowX: 'auto', position: 'relative' }}>
            {currentTable === 'Supplier Information' ? (
              <Table variant="simple" color={textColor}>
                <Thead>
                  <Tr my=".8rem" pl="0px" color="gray.400">
                    <Th pl="35px" pr="35px" borderColor={borderColor} color="gray.400">Customer Number</Th>
                    <Th pl="35px" pr="35px" borderColor={borderColor} color="gray.400">Customer</Th>
                    <Th pl="35px" pr="35px" borderColor={borderColor} color="gray.400">Buyer</Th>
                    <Th pl="35px" pr="35px" borderColor={borderColor} color="gray.400">Second-order Classification</Th>
                    <Th pl="35px" pr="35px" borderColor={borderColor} color="gray.400">Status</Th>
                    <Th pl="35px" pr="35px" borderColor={borderColor} color="gray.400">Document Status</Th>
                    <Th pl="35px" pr="35px" borderColor={borderColor} color="gray.400">Abnormal Info</Th>
                    <Th pl="35px" pr="35px" borderColor={borderColor} color="gray.400">Invitee</Th>
                    <Th pl="35px" pr="35px" borderColor={borderColor} color="gray.400">Re-auth Person</Th>
                    <Th pl="35px" pr="35px" borderColor={borderColor} color="gray.400">Contact Info</Th>
                    <Th pl="35px" pr="35px" borderColor={borderColor} color="gray.400">Invitation Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {currentRows.map((row, index) => (
                    <TablesTableRow key={row.customerNumber} {...row} isLast={index === currentRows.length - 1} />
                  ))}
                </Tbody>
              </Table>
            ) : (
              <Table variant="simple" color={textColor}>
                <Thead>
                  <Tr my=".8rem" pl="0px">
                    <Th pl="0px" color="gray.400" borderColor={borderColor}>Companies</Th>
                    <Th color="gray.400" borderColor={borderColor}>Budget</Th>
                    <Th color="gray.400" borderColor={borderColor}>Status</Th>
                    <Th color="gray.400" borderColor={borderColor}>Completion</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredProjectData.slice(indexOfFirstRow, indexOfLastRow).map((row, index) => (
                    <TablesProjectRow key={index} {...row} isLast={index === filteredProjectData.length - 1} />
                  ))}
                </Tbody>
              </Table>
            )}
          </div>
        </CardBody>

        {/* Pagination Footer */}
        <Flex justify="space-between" align="center" mt={4} px={4} mb={2}>
          <Text fontSize="sm" color="gray.500">Page {currentPage} of {totalPages}</Text>
          <Flex gap={2}>
            <Button size="sm" variant="outline" onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</Button>
            <Button size="sm" variant="outline" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}

export default Tables;
