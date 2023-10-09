import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Typography} from "@mui/material";
import UserTable from "./components/UserTable";

function App() {
  return (
    <div className="User service demo">
        <Typography variant="h2" gutterBottom>User management - demo</Typography>
        <UserTable></UserTable>
    </div>
  );
}

export default App;
