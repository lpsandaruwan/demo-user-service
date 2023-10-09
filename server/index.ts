import express from "express";

const app = express();
const port = process.env.port || 8080; // default port to listen

// define a route handler for the default home page
app.get( "/", ( req: any, res: { send: (arg0: string) => void; } ) => {
    res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
