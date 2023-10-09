import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import { IUser } from "../interfaces/IUser";
import {fetchUsers} from "../client/user.service";

export default function UserTable() {
    const [users, setUsers] = useState([] as IUser[])

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
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Username</TableCell>
                        <TableCell align="right">First name</TableCell>
                        <TableCell align="right">Lastname</TableCell>
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
    )
}