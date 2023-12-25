"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Sample data 
const data = [
  {
    id: 1,
    status: "pending",
    date: "2023-03-15",
    phonenumber: "1234567890",
    name: "John Doe",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    status: "approved",
    date: "2023-05-04",
    phonenumber: "0987654321",
    name: "Jane Doe",
    email: "jane.doe@example.com",
  },
  {
    id: 3,
    status: "rejected",
    date: "2023-06-13",
    phonenumber: "7655679457",
    name: "Smith Cloey",
    email: "smith.cloey@example.com",
  },
  {
    id: 4,
    status: "pending",
    date: "2023-04-20",
    phonenumber: "9876543210",
    name: "Alice Johnson",
    email: "alice.j@example.com"
  },
  {
    id: 5,
    status: "approved",
    date: "2023-07-08",
    phonenumber: "1231231234",
    name: "Bob Smith",
    email: "bob.smith@example.com"
  },
  {
    id: 6,
    status: "rejected",
    date: "2023-08-25",
    phonenumber: "8765432109",
    name: "Eva Brown",
    email: "eva.brown@example.com"
  }
];

const Page = () => {
  // Defining state for filters
  const [filter, setFilter] = useState({
    status: "",
    date: "",
  });

  // Handling changes in filter values
  const handleFilterChange = (name, value) => {
    console.log(name, value);
    setFilter({ ...filter, [name]: value });
  };

  // Handling Reset button in status and date
  const handleReset = () => {
    setFilter({ ...filter, date: "", status: "" });
  };

  // Filtering data based on status and date
const filteredData = data.filter((item) => {
  if (filter.status && item.status !== filter.status) return false;
  if (filter.date) {
    const selectedDate = filter.date.toDateString();
    const itemDate = new Date(item.date).toDateString();

    // Comparing only the date part 
    return selectedDate === itemDate;
  }
  return true;
});

  

  // Checking if data exists for the selected date
  const isDataFound = filteredData.length > 0;

  // CSS styles
  const styles = {
    container: {
      margin: "20px",
      padding: "20px",
      backgroundColor: "#f0f0f0",
      borderRadius: "8px",
    },
    filterContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    filterSection: {
      display: "flex",
      alignItems: "center",
    },
    label: {
      marginRight: "10px",
      fontSize: "16px",
      fontWeight: "bold",
    },
    inputField: {
      marginBottom: "15px",
    },
    table: {
      marginTop: "20px",
    },
    tableHeaderCell: {
      backgroundColor: "#4CAF50",
      color: "white",
      fontWeight: "bold",
    },
    tableRow: {
      backgroundColor: "#f8f8f8",
    },
  };

  return (
    <div style={styles.container}>
      {/* Filter Section */}
      <div style={styles.filterContainer}>
        {/* Status Filter */}
        <div style={styles.filterSection}>
          <label style={styles.label}>Status: </label>
          <TextField
            select
            value={filter.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            variant="outlined"
            style={styles.inputField}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </TextField>
          {filter.status && (
            <button onClick={() => handleReset("status")} style={{ marginLeft: "10px" }}>
              Reset
            </button>
          )}
        </div>

        {/* Date Filter */}
        <div style={styles.filterSection}>
          <label style={styles.label}>Date: </label>
          <DatePicker
            selected={filter.date ? new Date(filter.date) : null}
            onChange={(date) => handleFilterChange("date", date)}
            customInput={<TextField variant="outlined" />}
            dateFormat="yyyy-MM-dd"
            style={styles.inputField}
          />
          {filter.date && (
            <button onClick={handleReset} style={{ marginLeft: "10px" }}>
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Table Section */}
      {isDataFound ? (
        <TableContainer component={Paper} style={styles.table}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={styles.tableHeaderCell}>ID</TableCell>
                <TableCell style={styles.tableHeaderCell}>Status</TableCell>
                <TableCell style={styles.tableHeaderCell}>Date</TableCell>
                <TableCell style={styles.tableHeaderCell}>Phone Number</TableCell>
                <TableCell style={styles.tableHeaderCell}>Name</TableCell>
                <TableCell style={styles.tableHeaderCell}>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Rendering rows based on filtered data */}
              {filteredData.map((item) => (
                <TableRow key={item.id} style={styles.tableRow}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.phonenumber}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>Data not found for the selected date.</div>
      )}
    </div>
  );
};

export default Page;
