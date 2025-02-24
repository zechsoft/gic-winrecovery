import React, { useState } from "react";
import {
  Flex, Text, Button, Input, Table, Thead, Tbody, Tr, Th, Td, Avatar, IconButton, Tooltip, Box, 
  InputGroup, InputLeftElement, Icon, Tabs, TabList, TabPanels, TabPanel, Tab, Modal, ModalOverlay, 
  ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Select 
} from "@chakra-ui/react";  // Ensure Tab is imported here
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useHistory } from 'react-router-dom';

const TABS = [
  { label: "All", value: "all" },
  { label: "Monitored", value: "monitored" },
  { label: "Unmonitored", value: "unmonitored" },
];

const TABLE_HEAD = [
  "#",
  "Customer",
  "Delivery Notice No",
  "Start Time",
  "End Time",
  "Creator",
  "Urgent Material",
  "Order Status",
];

let TABLE_ROWS = [
  { id: "1", customer: "John Doe", deliveryNoticeNo: "DN12345", startTime: "10:00 AM", endTime: "12:00 PM", creator: "Jane Smith", urgentMaterial: "Yes", orderStatus: "Pending" },
  { id: "2", customer: "Jane Smith", deliveryNoticeNo: "DN67890", startTime: "02:00 PM", endTime: "04:00 PM", creator: "John Doe", urgentMaterial: "No", orderStatus: "Completed" },
];

export function CustomerDeliveryNotice() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [secondOrderSearch, setSecondOrderSearch] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({
    id: "",
    customer: "",
    deliveryNoticeNo: "",
    startTime: "",
    endTime: "",
    creator: "",
    urgentMaterial: "",
    orderStatus: "",
  });
  const [editRowIndex, setEditRowIndex] = useState(null); 
  const [country, setCountry] = useState("USA");

  const rowsPerPage = 5;
  const borderColor = "gray.300"; 

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const filteredRows = TABLE_ROWS.filter(row =>
    row.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.deliveryNoticeNo.toLowerCase().includes(secondOrderSearch.toLowerCase())
  );

  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

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

  const openModal = (rowIndex = null) => {
    setEditRowIndex(rowIndex);
    if (rowIndex !== null) {
      setNewRowData(TABLE_ROWS[rowIndex]); 
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewRowData({
      id: "",
      customer: "",
      deliveryNoticeNo: "",
      startTime: "",
      endTime: "",
      creator: "",
      urgentMaterial: "",
      orderStatus: "",
    });
    setEditRowIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveRow = () => {
    if (editRowIndex !== null) {
      TABLE_ROWS[editRowIndex] = newRowData;
    } else {
      TABLE_ROWS.unshift(newRowData); 
    }
    closeModal();
  };

  const navigate = useHistory();

  const handleViewAllClick = () => {
    navigate.push('/admin/tables'); 
  };

  return (
    <Box mt={16}>
      <Flex direction="column" bg="white" p={6} boxShadow="md" borderRadius="15px" maxWidth="1200px" mx="auto">
        <Flex justify="space-between" mb={8}>
          <Flex direction="column">
            <Text fontSize="xl" fontWeight="bold">Customer Delivery Notice</Text>
            <Text fontSize="md" color="gray.500">See information about all customer delivery notices</Text>
          </Flex>
          <Flex direction="row" gap={2}>
            <Button size="sm" variant="outline" onClick={handleViewAllClick}>
              View All
            </Button>
            <Button size="sm" colorScheme="blue" leftIcon={<UserPlusIcon />} onClick={() => openModal()}>
              Add New Row
            </Button>
          </Flex>
        </Flex>

        <Tabs defaultIndex={0} className="w-full md:w-max" isLazy>
          <Flex justify="space-between" align="center" mb={4}>
            <TabList>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value} _selected={{ color: 'blue.500', borderColor: 'blue.500' }} _focus={{ outline: 'none' }}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabList>

            <Flex direction="row" gap={4} align="center">
              <Select value={country} onChange={e => setCountry(e.target.value)} placeholder="Select" width={40}>
                <option value="USA">All</option>
                <option value="Germany">Germany</option>
                <option value="Italy">Italy</option>
                <option value="China">China</option>
              </Select>
              <motion.div whileFocus={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <MagnifyingGlassIcon style={{ height: "30px", width: "20px", padding: "2.5px", marginTop: "px" }} />
                  </InputLeftElement>
                  <Input variant="filled" placeholder="Search here" size="md" borderRadius="lg" width={{ base: "full", lg: "220px" }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} bg="white" borderColor="gray.300" _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px rgba(66,153,225,0.6)" }} />
                </InputGroup>
              </motion.div>
              <Button size="sm" colorScheme="blue" onClick={() => { setSearchTerm(""); setSecondOrderSearch(""); }} marginLeft={4}>
                Search
              </Button>
              <Button size="sm" variant="outline" onClick={() => { setSearchTerm(""); setSecondOrderSearch(""); }} marginLeft={4}>
                Clear
              </Button>
            </Flex>
          </Flex>

          <TabPanels>
            <TabPanel>
              <Box overflowX="auto" borderRadius="md" boxShadow="sm">
                <Table variant="simple">
                  <Thead bg="gray.100">
                    <Tr>
                      {TABLE_HEAD.map((head) => (
                        <Th key={head} cursor="pointer" textAlign="center" py={4} fontSize="13px" color="gray.400" borderColor={borderColor}>
                          <Text fontWeight="bold">{head}</Text>
                        </Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {currentRows.map((row, index) => (
                      <Tr key={row.id}>
                        <Td py={3}>{row.id}</Td>
                        <Td py={3}>{row.customer}</Td>
                        <Td py={3}>{row.deliveryNoticeNo}</Td>
                        <Td py={3}>{row.startTime}</Td>
                        <Td py={3}>{row.endTime}</Td>
                        <Td py={3}>{row.creator}</Td>
                        <Td py={3}>{row.urgentMaterial}</Td>
                        <Td py={3}>{row.orderStatus}</Td>
                        <Td py={3}>
                          <Tooltip label="Edit User">
                            <IconButton variant="outline" aria-label="Edit" icon={<Icon as={PencilIcon} boxSize={5} />} size="sm" onClick={() => openModal(index)} />
                          </Tooltip>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>

              <Flex justify="space-between" align="center" mt={4}>
                <Text fontSize="sm" color="gray.500">Page {currentPage} of {totalPages}</Text>
                <Flex gap={2}>
                  <Button size="sm" variant="outline" onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</Button>
                  <Button size="sm" variant="outline" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
                </Flex>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{editRowIndex !== null ? "Edit Customer Delivery Notice" : "Add New Customer Delivery Notice"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {TABLE_HEAD.slice(0, -1).map((head, index) => (
                <Input
                  key={index}
                  name={head.toLowerCase().replace(/\s+/g, '')}
                  placeholder={head}
                  value={newRowData[head.toLowerCase().replace(/\s+/g, '')]}
                  onChange={handleInputChange}
                  mb={3}
                />
              ))}
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={closeModal}>Cancel</Button>
              <Button colorScheme="blue" onClick={handleSaveRow}>Save Customer Delivery Notice</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Box>
  );
}

export default CustomerDeliveryNotice;