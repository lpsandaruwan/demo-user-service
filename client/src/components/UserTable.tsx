import {
    Button, Modal,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from "react";
import { IUser } from "../interfaces/IUser";
import {addUser, fetchUsers} from "../client/user.service";
import React from "react";
import UserModalContent from "./UserModalContent";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        "& .MuiTableCell-root": {
            border: '1px solid black'
        }
    }
});

export default function UserTable() {
    const classes = useStyles();

    const [users, setUsers] = useState([] as IUser[]);
    const [open, setOpen] = useState(false);

    const handleUserModalOpen = () => setOpen(true);

    const handleUserModalClose = () => setOpen(false);

    const handleUserModalConfirmation = async (user: IUser) => {
        await addUser(user);
        await getUsers();
        handleUserModalClose();
    };

    const getUsers = async () => {
        const result = await fetchUsers();
        if (result) {
            setUsers(result.result as IUser[]);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    return(
        <React.Fragment>
            <Stack direction="column" spacing={4}>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">
                                    <Typography variant="h6">
                                        Username
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6">
                                        First name
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6">
                                        Last name
                                    </Typography>
                                </TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(user => {
                                return <TableRow>
                                    <TableCell align="right">{user.username}</TableCell>
                                    <TableCell align="right">{user.first_name}</TableCell>
                                    <TableCell align="right">{user.last_name}</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant="outlined" size="large" onClick={handleUserModalOpen}>Add user</Button>
            </Stack>
            <Modal
                open={open}
                onClose={handleUserModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <UserModalContent handleConfirm={handleUserModalConfirmation} handleClose={handleUserModalClose}></UserModalContent>
            </Modal>
        </React.Fragment>
    )
}
