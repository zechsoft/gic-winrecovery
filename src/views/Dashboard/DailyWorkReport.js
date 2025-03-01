import React, { useState } from "react";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  Flex,
  Text,
  InputGroup,
  InputLeftElement,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useHistory } from "react-router-dom";

const TABS = [
  { label: "All", value: "all" },
  { label: "Monitored", value: "monitored" },
  { label: "Unmonitored", value: "unmonitored" },
];

const DailyWorkReport = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Corrected import here
  const [tableData, setTableData] = useState([
    {
      id: 1,
      employees: 5,
      workType: "Construction",
      progress: "50",
      hours: 8,
      charges: "500",
      date: "23/04/18",
    },
    {
      id: 2,
      employees: 3,
      workType: "Maintenance",
      progress: "75",
      hours: 6,
      charges: "300",
      date: "23/04/19",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [country, setCountry] = useState("USA");
  const [newRow, setNewRow] = useState({
    employees: "",
    workType: "",
    progress: "",
    hours: "",
    charges: "",
    date: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (e) => {
    setNewRow({ ...newRow, [e.target.name]: e.target.value });
  };

  const handleAddRow = () => {
    if (!newRow.employees || !newRow.workType || !newRow.date) return;
    
    if (editingIndex !== null) {
      // Edit existing row
      const updatedTableData = [...tableData];
      updatedTableData[editingIndex] = { id: tableData[editingIndex].id, ...newRow };
      setTableData(updatedTableData);
      setEditingIndex(null);
    } else {
      // Add new row
      setTableData([...tableData, { id: tableData.length + 1, ...newRow }]);
    }

    setNewRow({ employees: "", workType: "", progress: "", hours: "", charges: "", date: "" });
    onClose();
  };

  const handleEditRow = (index) => {
    setEditingIndex(index);
    setNewRow(tableData[index]);
    onOpen();
  };

  const navigate = useHistory();
  const handleViewAllClick = () => navigate.push("/admin/tables");

  return (
    <Box mt={16} p={6} bg="white" boxShadow="md" borderRadius="15px" maxWidth="1200px" mx="auto">
      <Flex justify="space-between" mb={4}>
        <Text fontSize="xl" fontWeight="bold">Daily Work Report</Text>
        <Button size="sm" colorScheme="blue" leftIcon={<UserPlusIcon />} onClick={() => { setEditingIndex(null); onOpen(); }}>
          Add New Row
        </Button>
      </Flex>
      
      <Flex justify="space-between" align="center" mb={4}>
        <Tabs defaultIndex={0} isLazy>
          <TabList>
            {TABS.map(({ label, value }) => (
              <Tab key={value} value={value}>{label}</Tab>
            ))}
          </TabList>
        </Tabs>
        <Flex>
          <Select value={country} onChange={e => setCountry(e.target.value)} placeholder="Select" width={40} mr={2}>
            <option value="USA">All</option>
            <option value="Germany">Germany</option>
            <option value="Italy">Italy</option>
            <option value="China">China</option>
          </Select>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <MagnifyingGlassIcon style={{ height: "30px", width: "20px", padding: "2.5px" }} />
            </InputLeftElement>
            <Input placeholder="Search here" size="md" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </InputGroup>
        </Flex>
      </Flex>
      
      <Table variant="simple">
        <Thead bg="gray.100">
          <Tr>
            <Th>SR.NO</Th>
            <Th>No. of Employee</Th>
            <Th>Nature of Work</Th>
            <Th>Progress (%)</Th>
            <Th>Hour of Work</Th>
            <Th>Charges</Th>
            <Th>Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((row, index) => (
            <Tr key={row.id}>
              <Td>{row.id}</Td>
              <Td>{row.employees}</Td>
              <Td>{row.workType}</Td>
              <Td>{row.progress}</Td>
              <Td>{row.hours}</Td>
              <Td>{row.charges}</Td>
              <Td>{row.date}</Td>
              <Td>
                <Tooltip label="Edit">
                  <IconButton variant="outline" aria-label="Edit" icon={<PencilIcon />} size="sm" onClick={() => handleEditRow(index)} />
                </Tooltip>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      
      {/* Modal for Adding/Editing Row */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingIndex !== null ? "Edit Work Report" : "Add New Work Report"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="No. of Employee" name="employees" value={newRow.employees} onChange={handleInputChange} mb={2} />
            <Input placeholder="Nature of Work" name="workType" value={newRow.workType} onChange={handleInputChange} mb={2} />
            <Input placeholder="Progress (%)" name="progress" value={newRow.progress} onChange={handleInputChange} mb={2} />
            <Input placeholder="Hour of Work" name="hours" value={newRow.hours} onChange={handleInputChange} mb={2} />
            <Input placeholder="Charges ($)" name="charges" value={newRow.charges} onChange={handleInputChange} mb={2} />
            <Input type="date" name="date" value={newRow.date} onChange={handleInputChange} mb={2} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddRow}>
              {editingIndex !== null ? "Update" : "Add"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DailyWorkReport;
