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
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useHistory } from "react-router-dom";

const TABS = [
  { label: "All", value: "all" },
  { label: "Monitored", value: "monitored" },
  { label: "Unmonitored", value: "unmonitored" },
];

const CustomerOrder = () => {
  const [tableData, setTableData] = useState([
    {
      id: 1,
      customerNumber: "123",
      customer: "John Doe",
      buyer: "Jane Doe",
      platformNo: "Platform 1",
      poNo: "PO12345",
      purchaseDate: "2023-04-18",
      orderAmount: "$5000",
      currency: "USD",
      purchasingDepartment: "Electronics",
      purchaser: "Mark Smith",
      requisitionBusinessGroup: "Retail",
      deliveryStatus: "Delivered",
      orderStatus: "Completed",
      acceptanceStatus: "Accepted",
      statementStatus: "Pending",
    },
    {
      id: 2,
      customerNumber: "124",
      customer: "Alice Smith",
      buyer: "Bob Brown",
      platformNo: "Platform 2",
      poNo: "PO12346",
      purchaseDate: "2023-04-19",
      orderAmount: "$7000",
      currency: "EUR",
      purchasingDepartment: "Furniture",
      purchaser: "Lucy Green",
      requisitionBusinessGroup: "Wholesale",
      deliveryStatus: "Shipped",
      orderStatus: "Processing",
      acceptanceStatus: "Pending",
      statementStatus: "Completed",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [country, setCountry] = useState("USA");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRow, setNewRow] = useState({
    customerNumber: "",
    customer: "",
    buyer: "",
    platformNo: "",
    poNo: "",
    purchaseDate: "",
    orderAmount: "",
    currency: "",
    purchasingDepartment: "",
    purchaser: "",
    requisitionBusinessGroup: "",
    deliveryStatus: "",
    orderStatus: "",
    acceptanceStatus: "",
    statementStatus: "",
  });

  const [editingRow, setEditingRow] = useState(null);  // Track the row being edited

  const searchInputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (searchInputRef.current) {
      setIsFocused(searchInputRef.current === document.activeElement);
    }
  }, [searchTerm]);

  const handleAddRow = () => {
    setIsModalOpen(true);
  };

  const handleSaveRow = () => {
    if (editingRow) {
      // Edit existing row
      const updatedTableData = tableData.map((row) =>
        row.id === editingRow.id ? { ...editingRow, ...newRow } : row
      );
      setTableData(updatedTableData);
    } else {
      // Add new row
      const updatedRow = { ...newRow, id: tableData.length + 1 };
      setTableData([...tableData, updatedRow]);
    }

    setIsModalOpen(false);
    setNewRow({
      customerNumber: "",
      customer: "",
      buyer: "",
      platformNo: "",
      poNo: "",
      purchaseDate: "",
      orderAmount: "",
      currency: "",
      purchasingDepartment: "",
      purchaser: "",
      requisitionBusinessGroup: "",
      deliveryStatus: "",
      orderStatus: "",
      acceptanceStatus: "",
      statementStatus: "",
    });
    setEditingRow(null);  // Clear editing state
  };

  const navigate = useHistory();
  const handleViewAllClick = () => navigate.push("/admin/tables");
  const handleSearch = () => alert("Search functionality not implemented yet");
  const handleClear = () => setSearchTerm("");

  // Function to open modal for editing a row
  const handleEditRow = (row) => {
    setEditingRow(row);
    setNewRow(row);  // Populate form fields with row data
    setIsModalOpen(true);
  };

  return (
    <Box mt={16}>
      <Flex direction="column" bg="white" p={6} boxShadow="md" borderRadius="15px" maxWidth="1200px" mx="auto">
        <Flex justify="space-between" mb={8}>
          <Flex direction="column">
            <Text fontSize="xl" fontWeight="bold">Customer Order Information</Text>
            <Text fontSize="md" color="gray.400">Manage Customer Order Information</Text>
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
                  <MagnifyingGlassIcon style={{ height: "25px", width: "20px", padding: "2.5px" }} />
                </InputLeftElement>
                <Input
                  ref={searchInputRef}
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

        {/* Wrapping Table inside Box to enable horizontal scrolling */}
        <Box overflowX="auto">
          <Table variant="simple" borderRadius="10px" overflow="hidden">
            <Thead bg="gray.100" height="60px">
              <Tr>
                <Th color="gray.400">Customer Number</Th>
                <Th color="gray.400">Customer</Th>
                <Th color="gray.400">Buyer</Th>
                <Th color="gray.400">Platform No</Th>
                <Th color="gray.400">PO No</Th>
                <Th color="gray.400">Purchase Date</Th>
                <Th color="gray.400">Order Amount</Th>
                <Th color="gray.400">Currency</Th>
                <Th color="gray.400">Purchasing Department</Th>
                <Th color="gray.400">Purchaser</Th>
                <Th color="gray.400">Requisition Business Group</Th>
                <Th color="gray.400">Delivery Status</Th>
                <Th color="gray.400">Order Status</Th>
                <Th color="gray.400">Acceptance Status</Th>
                <Th color="gray.400">Statement Status</Th>
                <Th color="gray.400">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData.map((row) => (
                <Tr key={row.id}>
                  <Td>{row.customerNumber}</Td>
                  <Td>{row.customer}</Td>
                  <Td>{row.buyer}</Td>
                  <Td>{row.platformNo}</Td>
                  <Td>{row.poNo}</Td>
                  <Td>{row.purchaseDate}</Td>
                  <Td>{row.orderAmount}</Td>
                  <Td>{row.currency}</Td>
                  <Td>{row.purchasingDepartment}</Td>
                  <Td>{row.purchaser}</Td>
                  <Td>{row.requisitionBusinessGroup}</Td>
                  <Td>{row.deliveryStatus}</Td>
                  <Td>{row.orderStatus}</Td>
                  <Td>{row.acceptanceStatus}</Td>
                  <Td>{row.statementStatus}</Td>
                  <Td>
                    <Tooltip label="Edit">
                      <IconButton
                        variant="outline"
                        aria-label="Edit"
                        icon={<PencilIcon />}
                        size="xs"
                        onClick={() => handleEditRow(row)} // Handle editing the row
                      />
                    </Tooltip>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

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
          <ModalHeader>{editingRow ? "Edit Row" : "Add New Row"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl width="100%" mt={4}>
              <FormLabel>Customer Number</FormLabel>
              <Input
                value={newRow.customerNumber}
                onChange={(e) => setNewRow({ ...newRow, customerNumber: e.target.value })}
              />
            </FormControl>
            <FormControl width="100%" mt={4}>
              <FormLabel>Customer</FormLabel>
              <Input
                value={newRow.customer}
                onChange={(e) => setNewRow({ ...newRow, customer: e.target.value })}
              />
            </FormControl>
            <FormControl width="100%" mt={4}>
              <FormLabel>Buyer</FormLabel>
              <Input
                value={newRow.buyer}
                onChange={(e) => setNewRow({ ...newRow, buyer: e.target.value })}
              />
            </FormControl>
            <FormControl width="100%" mt={4}>
              <FormLabel>Platform No</FormLabel>
              <Input
                value={newRow.platformNo}
                onChange={(e) => setNewRow({ ...newRow, platformNo: e.target.value })}
              />
            </FormControl>
            <FormControl width="100%" mt={4}>
              <FormLabel>PO No</FormLabel>
              <Input
                value={newRow.poNo}
                onChange={(e) => setNewRow({ ...newRow, poNo: e.target.value })}
              />
            </FormControl>
            <FormControl width="100%" mt={4}>
              <FormLabel>Purchase Date</FormLabel>
              <Input
                type="date"
                value={newRow.purchaseDate}
                onChange={(e) => setNewRow({ ...newRow, purchaseDate: e.target.value })}
              />
            </FormControl>
            <FormControl width="100%" mt={4}>
              <FormLabel>Order Amount</FormLabel>
              <Input
                value={newRow.orderAmount}
                onChange={(e) => setNewRow({ ...newRow, orderAmount: e.target.value })}
              />
            </FormControl>
            <FormControl width="100%" mt={4}>
              <FormLabel>Currency</FormLabel>
              <Input
                value={newRow.currency}
                onChange={(e) => setNewRow({ ...newRow, currency: e.target.value })}
              />
            </FormControl>
            <FormControl width="100%" mt={4}>
              <FormLabel>Purchasing Department</FormLabel>
              <Input
                value={newRow.purchasingDepartment}
                onChange={(e) => setNewRow({ ...newRow, purchasingDepartment: e.target.value })}
              />
            </FormControl>
            <FormControl width="100%" mt={4}>
              <FormLabel>Purchaser</FormLabel>
              <Input
                value={newRow.purchaser}
                onChange={(e) => setNewRow({ ...newRow, purchaser: e.target.value })}
              />
            </FormControl>
            <FormControl width="100%" mt={4}>
              <FormLabel>Requisition Business Group</FormLabel>
              <Input
                value={newRow.requisitionBusinessGroup}
                onChange={(e) => setNewRow({ ...newRow, requisitionBusinessGroup: e.target.value })}
              />
            </FormControl>
            <FormControl width="100%" mt={4}>
              <FormLabel>Delivery Status</FormLabel>
              <Input
                value={newRow.deliveryStatus}
                onChange={(e) => setNewRow({ ...newRow, deliveryStatus: e.target.value })}
              />
            </FormControl>
            <FormControl width="100%" mt={4}>
              <FormLabel>Order Status</FormLabel>
              <Input
                value={newRow.orderStatus}
                onChange={(e) => setNewRow({ ...newRow, orderStatus: e.target.value })}
              />
            </FormControl>
            <FormControl width="100%" mt={4}>
              <FormLabel>Acceptance Status</FormLabel>
              <Input
                value={newRow.acceptanceStatus}
                onChange={(e) => setNewRow({ ...newRow, acceptanceStatus: e.target.value })}
              />
            </FormControl>
            <FormControl width="100%" mt={4}>
              <FormLabel>Statement Status</FormLabel>
              <Input
                value={newRow.statementStatus}
                onChange={(e) => setNewRow({ ...newRow, statementStatus: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveRow}>
              {editingRow ? "Save Changes" : "Add"}
            </Button>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CustomerOrder;