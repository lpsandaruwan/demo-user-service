import {IUser} from "../interfaces/IUser";
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {ActionType} from "../interfaces/Actions";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export interface IUserProps {
    actionType: ActionType,
    selectedUsername: string,
    handleConfirm: (actionType: ActionType, user: IUser) => void,
    handleClose: () => void
}

export default function UserModalContent(props: IUserProps) {
    const {actionType, handleConfirm, handleClose, selectedUsername} = props;

    const [username, setUsername] = useState(selectedUsername);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleConfirmAction = () => {
        handleConfirm(
            actionType,
            {
                username: username,
                first_name: firstName,
                last_name: lastName
            }
        );
    }

    const handleCloseAction = () => {
        handleClose();
    }

    return (
        <Box sx={style}>
            <Stack direction="column" spacing={3}>
                <Typography variant="h5">{actionType}</Typography>
                <TextField id="username"
                           label="Username"
                           variant="standard"
                           onChange={(event) => setUsername(event.target.value)}/>
                <TextField id="firstname"
                           label="First name"
                           variant="standard"
                           onChange={(event) => setFirstName(event.target.value)}/>
                <TextField id="lastname"
                           label="Last name"
                           variant="standard"
                           onChange={(event) => setLastName(event.target.value)}/>
                <Stack direction="row" spacing={4}>
                    <Button variant="outlined" color="error" onClick={handleCloseAction}>Cancel</Button>
                    <Button variant="outlined" color="success" onClick={handleConfirmAction}>Confirm</Button>
                </Stack>
            </Stack>
        </Box>
    )
}
