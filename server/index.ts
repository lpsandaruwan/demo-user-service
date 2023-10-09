import express from "express";
import {IUser, IUserBasic} from "./src/interface/IUser";
import {createUser, deleteUser, getUser, updateUser} from "./src/service/user.service";
import {IUserCreateRequest, IUserQueryRequest, IUserUpdateRequest} from "./src/interface/IUserRequest";

const app = express();
const port = process.env.port || 8080; // default port to listen

// define a route handler for the default home page
app.get( "/", ( req: any, res: { send: (arg0: string) => void; } ) => {
    res.send( "Hello world!" );
} );

app.get("/users", async (req: IUserQueryRequest, res) => {
    return await getUser(req.query.id);
})

app.post("/users", async (req: IUserCreateRequest, res) => {
    return await createUser(req.body);
})

app.put("/users", async (req: IUserUpdateRequest, res) => {
    return await updateUser(req.query.id, req.body);
})

app.delete("/users", async (req: IUserQueryRequest, res) => {
    return await deleteUser(req.query.id);
})

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
