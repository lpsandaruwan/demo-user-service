import React from 'react';
import './App.css';
import {Container, CssBaseline, Stack, Typography} from "@mui/material";
import UserTable from "./components/UserTable";

function App() {
    return (
        <React.Fragment>
            <CssBaseline/>
            <Container>
                <Stack direction="column" spacing={2}>
                    <Typography variant="h3">User management - demo</Typography>
                    <UserTable></UserTable>
                </Stack>
            </Container>
        </React.Fragment>
    );
}

export default App;
