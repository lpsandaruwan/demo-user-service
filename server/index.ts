import express from "express";
import {createUser, deleteUser, getAllUsers, getUser, updateUser} from "./src/service/user.service";
import {IUserCreateRequest, IUserQueryRequest, IUserUpdateRequest} from "./src/interface/IUserRequest";
import bodyParser from "body-parser";
import {sequelize} from "./src/config/db.config";
import cors from "cors";

const app = express();
const port = process.env.port || 8080; // default port to listen


app.use(bodyParser.json());
app.use(cors({
    origin: process.env.ALLOW_ORIGIN || "*"
}));

// define a route handler for the default home page
app.get("/", (req: any, res: { send: (arg0: string) => void; }) => {
    res.send("Server ready!");
});

app.get("/users", async (req, res) => {
    const result = await getAllUsers();
    res.send(result);
})

app.get("/users/:username", async (req: IUserQueryRequest, res) => {
    const result = await getUser(req.params.username);
    res.send(result);
})

app.post("/users", async (req: IUserCreateRequest, res) => {
    const result = await createUser(req.body);
    res.send(result);
})

app.put("/users/:username", async (req: IUserUpdateRequest, res) => {
    const result = await updateUser(req.params.username, req.body);
    res.send(result);
})

app.delete("/users/:username", async (req: IUserQueryRequest, res) => {
    const result = await deleteUser(req.params.username);
    res.send(result);
})

// start the Express server
app.listen(port, async () => {
    await sequelize.sync();
    console.log(`server started at http://localhost:${port}`);
});
