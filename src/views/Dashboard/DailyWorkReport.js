import React, { useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
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

const DailyWorkReport = () => {
  const [tableData, setTableData] = useState([
    {
      id: 1,
      companyName: "ABC Corp",
      projectName: "Project X",
      supervisorName: "John Doe",
      managerName: "Jane Smith",
      prepaidBy: "Client A",
      employees: 5,
      workType: "Construction",
      progress: "50",
      hours: 8,
      charges: "400",
      date: "2023-04-18",
    },
    {
      id: 2,
      companyName: "XYZ Inc",
      projectName: "Project Y",
      supervisorName: "Alice Johnson",
      managerName: "Bob Lee",
      prepaidBy: "Client B",
      employees: 3,
      workType: "Maintenance",
      progress: "75",
      hours: 6,
      charges: "300",
      date: "2023-04-19",
    },
  ]);

  const [filteredData, setFilteredData] = useState(tableData);
  const [searchTerm, setSearchTerm] = useState("");
  const [country, setCountry] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRow, setNewRow] = useState({
    companyName: "",
    projectName: "",
    supervisorName: "",
    managerName: "",
    prepaidBy: "",
    employees: "",
    workType: "",
    progress: "",
    hours: "",
    charges: "",
    date: "",
  });
  const [selectedRowId, setSelectedRowId] = useState(null);

  const handleSearch = () => {
    if (country === "All") {
      const filteredData = tableData.filter((row) =>
        row.employees.toString().includes(searchTerm) ||
        row.workType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.progress.toString().includes(searchTerm)
      );
      setFilteredData(filteredData);
    } else {
      const filteredData = tableData.filter((row) => {
        switch (country) {
          case "No. of Employees":
            return row.employees.toString().includes(searchTerm);
          case "Nature of Work":
            return row.workType.toLowerCase().includes(searchTerm.toLowerCase());
          case "Progress":
            return row.progress.toString().includes(searchTerm);
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
      companyName: "",
      projectName: "",
      supervisorName: "",
      managerName: "",
      prepaidBy: "",
      employees: "",
      workType: "",
      progress: "",
      hours: "",
      charges: "",
      date: "",
    });
  };

  const columns = ["Company Name", "Project Name", "Supervisor Name", "Manager Name", "Prepaid By", "No. of Employee", "Nature of Work", "Progress (%)", "Hour of Work", "Charges", "Date"];

  return (
    <Box mt={16}>
      <Flex direction="column" bg="white" p={6} boxShadow="md" borderRadius="15px" width="100%">
        <Flex justify="space-between" mb={8}>
          <Flex direction="column">
            <Text fontSize="xl" fontWeight="bold">Daily Work Report</Text>
            <Text fontSize="md" color="gray.400">See information about daily work reports</Text>
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

export default DailyWorkReport;