import React, { useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { useHistory } from "react-router-dom";
import SearchFilter from "./SearchFilter";
import DataTable from "./DataTable";
import EditModal from "./EditModal";
import Pagination from "./Pagination";
import TabsComponent from "./Tabs";

const TABS = [
  { label: "All", value: "all" },
  { label: "Monitored", value: "monitored" },
  { label: "Unmonitored", value: "unmonitored" },
];

const SupplierInfo = () => {
  const navigate = useHistory();

  const handleViewAllClick = () => {
    navigate.push("/admin/tables");
  };

  const [tableData, setTableData] = useState([
    {
      id: 1,
      customerNumber: "C001",
      customer: "ABC Corp",
      buyer: "John Doe",
      secondOrderClassification: "Category A",
      status: "Active",
      documentStatus: "Approved",
      abnormalInfo: "None",
      invitee: "Jane Smith",
      reAuthPerson: "Alice Johnson",
      contactInfo: "123-456-7890",
      invitationDate: "2023-04-18",
    },
    {
      id: 2,
      customerNumber: "C002",
      customer: "XYZ Inc",
      buyer: "Jane Roe",
      secondOrderClassification: "Category B",
      status: "Inactive",
      documentStatus: "Pending",
      abnormalInfo: "None",
      invitee: "Bob Brown",
      reAuthPerson: "Charlie Green",
      contactInfo: "987-654-3210",
      invitationDate: "2023-04-19",
    },
  ]);

  const [filteredData, setFilteredData] = useState(tableData);
  const [searchTerm, setSearchTerm] = useState("");
  const [country, setCountry] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRow, setNewRow] = useState({
    customerNumber: "",
    customer: "",
    buyer: "",
    secondOrderClassification: "",
    status: "",
    documentStatus: "",
    abnormalInfo: "",
    invitee: "",
    reAuthPerson: "",
    contactInfo: "",
    invitationDate: "",
  });
  const [selectedRowId, setSelectedRowId] = useState(null);

  const handleSearch = () => {
    if (country === "All") {
      const filteredData = tableData.filter((row) =>
        row.customerNumber.includes(searchTerm) ||
        row.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.secondOrderClassification.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.documentStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.abnormalInfo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.invitee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.reAuthPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.contactInfo.includes(searchTerm) ||
        row.invitationDate.includes(searchTerm)
      );
      setFilteredData(filteredData);
    } else {
      const filteredData = tableData.filter((row) => {
        switch (country) {
          case "Customer Number":
            return row.customerNumber.includes(searchTerm);
          case "Customer":
            return row.customer.toLowerCase().includes(searchTerm.toLowerCase());
          case "Buyer":
            return row.buyer.toLowerCase().includes(searchTerm.toLowerCase());
          case "Second-order Classification":
            return row.secondOrderClassification.toLowerCase().includes(searchTerm.toLowerCase());
          case "Status":
            return row.status.toLowerCase().includes(searchTerm.toLowerCase());
          case "Document Status":
            return row.documentStatus.toLowerCase().includes(searchTerm.toLowerCase());
          case "Abnormal Info":
            return row.abnormalInfo.toLowerCase().includes(searchTerm.toLowerCase());
          case "Invitee":
            return row.invitee.toLowerCase().includes(searchTerm.toLowerCase());
          case "Re-auth Person":
            return row.reAuthPerson.toLowerCase().includes(searchTerm.toLowerCase());
          case "Contact Info":
            return row.contactInfo.includes(searchTerm);
          case "Invitation Date":
            return row.invitationDate.includes(searchTerm);
          default:
            return true;
        }
      });
      setFilteredData(filteredData);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setCountry("All");
    setFilteredData(tableData);
  };

  const handleAddRow = () => setIsModalOpen(true);

  const handleEditRow = (rowId) => {
    const selectedRow = tableData.find((row) => row.id === rowId);
    if (selectedRow) {
      setNewRow(selectedRow);
      setSelectedRowId(rowId);
      setIsModalOpen(true);
    }
  };

  const handleSaveRow = () => {
    if (selectedRowId) {
      const updatedTableData = tableData.map((row) =>
        row.id === selectedRowId ? { ...row, ...newRow } : row
      );
      setTableData(updatedTableData);
      setFilteredData(updatedTableData);
      setSelectedRowId(null);
    } else {
      const updatedRow = { ...newRow, id: tableData.length + 1 };
      setTableData([...tableData, updatedRow]);
      setFilteredData([...filteredData, updatedRow]);
    }
    setIsModalOpen(false);
    setNewRow({
      customerNumber: "",
      customer: "",
      buyer: "",
      secondOrderClassification: "",
      status: "",
      documentStatus: "",
      abnormalInfo: "",
      invitee: "",
      reAuthPerson: "",
      contactInfo: "",
      invitationDate: "",
    });
  };

  const columns = ["Customer Number", "Customer", "Buyer", "Second-order Classification", "Status", "Document Status", "Abnormal Info", "Invitee", "Re-auth Person", "Contact Info", "Invitation Date"];

  return (
    <Box mt={16}>
      <Flex direction="column" bg="white" p={6} boxShadow="md" borderRadius="15px" width="100%">
        <Flex justify="space-between" mb={8}>
          <Flex direction="column">
            <Text fontSize="xl" fontWeight="bold">Supplier Information</Text>
            <Text fontSize="md" color="gray.400">See information about suppliers</Text>
          </Flex>
          <Flex direction="row" gap={2}>
            <Button size="sm" onClick={handleViewAllClick} mr={2}>View All</Button>
            <Button size="sm" colorScheme="blue" leftIcon={<UserPlusIcon />} onClick={handleAddRow}>
              Add Row
            </Button>
          </Flex>
        </Flex>

        <Flex justify="space-between" align="center" mb={4}>
          <TabsComponent tabs={TABS} />
          <SearchFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            country={country}
            setCountry={setCountry}
            handleSearch={handleSearch}
            handleClear={handleClear}
          />
        </Flex>

        <DataTable columns={columns} data={filteredData} handleEditRow={handleEditRow} />
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </Flex>

      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        newRow={newRow}
        setNewRow={setNewRow}
        handleSaveRow={handleSaveRow}
        selectedRowId={selectedRowId}
      />
    </Box>
  );
};

export default SupplierInfo;