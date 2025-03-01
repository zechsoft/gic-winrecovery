import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Tooltip,
  Input,
  Select,
  Flex,
  Text,
  InputGroup,
  InputLeftElement,
  Tabs,
  TabList,
  Tab,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useHistory } from "react-router-dom";

const TABS = [
  { label: "All", value: "all" },
  { label: "Monitored", value: "monitored" },
  { label: "Unmonitored", value: "unmonitored" },
];

const CustomerDeliveryNotice = () => {
  const [tableData, setTableData] = useState([
    {
      id: 1,
      orderNumber: "ON12345",
      category: "Category A",
      vendor: "Vendor X",
      invitee: "John Doe",
      contact: "john.doe@example.com",
      sender: "Supplier A",
      status: "Pending",
      template: "Template 1",
    },
    {
      id: 2,
      orderNumber: "ON67890",
      category: "Category B",
      vendor: "Vendor Y",
      invitee: "Jane Smith",
      contact: "jane.smith@example.com",
      sender: "Supplier B",
      status: "Approved",
      template: "Template 2",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [country, setCountry] = useState("USA");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState({});

  const searchInputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (searchInputRef.current) {
      setIsFocused(searchInputRef.current === document.activeElement);
    }
  }, [searchTerm]);

  const handleAddRow = () => {
    setIsModalOpen(true);
    setCurrentRow({
      orderNumber: "",
      category: "",
      vendor: "",
      invitee: "",
      contact: "",
      sender: "",
      status: "Pending",
      template: "",
    });
  };

  const handleSaveRow = () => {
    if (currentRow.id) {
      // Update existing row
      const updatedTableData = tableData.map(row => {
        if (row.id === currentRow.id) {
          return { ...row, ...currentRow };
        }
        return row;
      });
      setTableData(updatedTableData);
    } else {
      // Add new row
      const newRow = {
        ...currentRow,
        id: tableData.length + 1, // Generate a new unique ID
      };
      setTableData([...tableData, newRow]);
    }
    setIsModalOpen(false);
    setCurrentRow(undefined);
  };

  const handleEditRow = (row) => {
    setIsModalOpen(true);
    setCurrentRow(row);
  };

  const handleViewAllClick = () => navigate.push("/admin/tables");
  const handleSearch = () => alert("Search functionality not implemented yet");
  const handleClear = () => setSearchTerm("");

  return (
    <Box mt={16}>
      <Flex direction="column" bg="white" p={6} boxShadow="md" borderRadius="15px" maxWidth="1200px" mx="auto">
        <Flex justify="space-between" mb={8}>
          <Flex direction="column">
            <Text fontSize="xl" fontWeight="bold">Customer Delivery Notice</Text>
            <Text fontSize="md" color="gray.400">See information about all customer delivery</Text>
          </Flex>
          <Flex direction="row" gap={2}>
            <Button size="sm" onClick={handleViewAllClick} mr={2}>View All</Button>
            <Button size="sm" colorScheme="blue" leftIcon={<UserPlusIcon />} onClick={handleAddRow}>
              Add Row
            </Button>
          </Flex>
        </Flex>

        <Flex justify="space-between" align="center" mb={4}>
          <Tabs defaultIndex={0} className="w-full md:w-max" isLazy>
            <TabList>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>{label}</Tab>
              ))}
            </TabList>
          </Tabs>
          <Flex>
            <Select value={country} onChange={e => setCountry(e.target.value)} placeholder="Select" width={40} mr={4}>
              <option value="USA">All</option>
              <option value="Germany">Germany</option>
              <option value="Italy">Italy</option>
              <option value="China">China</option>
            </Select>

            <FormControl width="half" mr={4}>
              <FormLabel
                position="absolute"
                top={isFocused || searchTerm ? "-16px" : "12px"}
                left="40px"
                top="9px"
                color="gray.500"
                fontSize={isFocused || searchTerm ? "xs" : "sm"}
                transition="all 0.2s ease"
                pointerEvents="none"
                opacity={isFocused || searchTerm ? 0 : 1} // Set opacity to 0 when focused or has value
              >
                Search here
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon style={{ height: "25px", width: "20px", padding: "2.5px" }} />
                </InputLeftElement>
                <Input
                  ref={searchInputRef}
                  placeholder=" "
                  size="md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  borderColor={isFocused ? "green.500" : "gray.300"}
                  _focus={{
                    borderColor: "green.500",
                    boxShadow: "0 0 0 1px green.500",
                  }}
                />
              </InputGroup>
            </FormControl>
            <Button colorScheme="blue" mr={4} onClick={handleSearch}>Search</Button>
            <Button variant="outline" onClick={handleClear}>Clear</Button>
          </Flex>
        </Flex>

        <Table variant="simple" borderRadius="10px" overflow="hidden">
          <Thead bg="gray.100" height="60px">
            <Tr>
              <Th color="gray.400">#</Th>
              <Th color="gray.400">Order Number</Th>
              <Th color="gray.400">Material Category</Th>
              <Th color="gray.400">Vendor</Th>
              <Th color="gray.400">Invitee</Th>
              <Th color="gray.400">Host/Inviter Contact Information</Th>
              <Th color="gray.400">Sender</Th>
              <Th color="gray.400">Status</Th>
              <Th color="gray.400">Supplement Template</Th>
              <Th color="gray.400">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((row) => (
              <Tr key={row.id}>
                <Td>{row.id}</Td>
                <Td>{row.orderNumber}</Td>
                <Td>{row.category}</Td>
                <Td>{row.vendor}</Td>
                <Td>{row.invitee}</Td>
                <Td>{row.contact}</Td>
                <Td>{row.sender}</Td>
                <Td>{row.status}</Td>
                <Td>{row.template}</Td>
                <Td>
                  <Tooltip label="Edit">
                    <IconButton
                      variant="outline"
                      aria-label="Edit"
                      icon={<PencilIcon />}
                      size="xs"
                      onClick={() => handleEditRow(row)}
                    />
                  </Tooltip>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Flex justify="space-between" align="center" mt={4}>
          <Text fontSize="sm">Page {currentPage} of 1</Text>
          <Flex>
            <Button size="sm" variant="outline" mr={2} isDisabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Previous</Button>
            <Button size="sm" variant="outline" isDisabled>Next</Button>
          </Flex>
        </Flex>
      </Flex>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Row</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Order Number</FormLabel>
              <Input
                name="orderNumber"
                value={currentRow?.orderNumber || ""}
                onChange={(e) => setCurrentRow({ ...currentRow, orderNumber: e.target.value })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Material Category</FormLabel>
              <Input
                name="category"
                value={currentRow?.category || ""}
                onChange={(e) => setCurrentRow({ ...currentRow, category: e.target.value })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Vendor</FormLabel>
              <Input
                name="vendor"
                value={currentRow?.vendor || ""}
                onChange={(e) => setCurrentRow({ ...currentRow, vendor: e.target.value })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Invitee</FormLabel>
              <Input
                name="invitee"
                value={currentRow?.invitee || ""}
                onChange={(e) => setCurrentRow({ ...currentRow, invitee: e.target.value })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Host/Inviter Contact</FormLabel>
              <Input
                name="contact"
                value={currentRow?.contact || ""}
                onChange={(e) => setCurrentRow({ ...currentRow, contact: e.target.value })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Sender</FormLabel>
              <Input
                name="sender"
                value={currentRow?.sender || ""}
                onChange={(e) => setCurrentRow({ ...currentRow, sender: e.target.value })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Status</FormLabel>
              <Select
                name="status"
                value={currentRow?.status || "Pending"}
                onChange={(e) => setCurrentRow({ ...currentRow, status: e.target.value })}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Supplement Template</FormLabel>
              <Input
                type="text"
                name="template"
                value={currentRow?.template || ""}
                onChange={(e) => setCurrentRow({ ...currentRow, template: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveRow}>
              Save
            </Button>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CustomerDeliveryNotice;