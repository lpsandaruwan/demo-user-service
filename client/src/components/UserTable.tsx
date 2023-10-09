import {
    Button,
    ButtonGroup,
    Modal,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {makeStyles} from '@mui/styles';
import React, {useEffect, useState} from "react";
import {IUser} from "../interfaces/IUser";
import {addUser, deleteUser, editUser, fetchUsers} from "../client/user.service";
import UserModalContent from "./UserModalContent";
import {ActionType} from "../interfaces/Actions";

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

    const [actionType, setActionType] = useState(ActionType.Create);
    const [selectedUsername, setSelectedUsername] = useState("");
    const [users, setUsers] = useState([] as IUser[]);
    const [open, setOpen] = useState(false);

    const handleUserModalOpen = () => {
        setOpen(true);
    }

    const handleUserModalClose = () => setOpen(false);

    const handleUserModalConfirmation = async (actionType: ActionType, user: IUser) => {
        if (actionType === ActionType.Create) {
            await addUser(user);
        } else if (actionType === ActionType.Edit) {
            await editUser(
                user.username,
                {
                    first_name: user.first_name,
                    last_name: user.last_name
                })
        }
        await getUsers();
        handleUserModalClose();
    };

    const handleUserDeletion = async (username: string) => {
        await deleteUser(username);
        await getUsers();
    }

    const getUsers = async () => {
        const result = await fetchUsers();
        if (result) {
            setUsers(result.result as IUser[]);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
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
                                    <TableCell align="right">
                                        <ButtonGroup variant="text">
                                            <Button
                                                onClick={() => {
                                                    setSelectedUsername(user.username);
                                                    setActionType(ActionType.Edit);
                                                    setTimeout(() => {
                                                        handleUserModalOpen();
                                                    }, 500);
                                                }}>
                                                Edit
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    setSelectedUsername(user.username);
                                                    setTimeout(async () => {
                                                        await handleUserDeletion(user.username);
                                                    }, 500);
                                                }}>
                                                Delete
                                            </Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant="outlined" size="large" onClick={() => {
                    setSelectedUsername("");
                    setActionType(ActionType.Create);
                    handleUserModalOpen();
                }}>
                    Add user
                </Button>
            </Stack>
            <Modal
                open={open}
                onClose={handleUserModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <UserModalContent
                    actionType={actionType}
                    handleConfirm={handleUserModalConfirmation}
                    handleClose={handleUserModalClose}
                    selectedUsername={selectedUsername}></UserModalContent>
            </Modal>
        </React.Fragment>
    )
}
