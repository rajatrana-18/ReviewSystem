import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';

import { connectUsingMongoose } from './src/config/mongoose.js';
import userRouter from './src/features/user/user.routes.js';
import homeRouter from './src/features/home/home.routes.js';
import templateAuth from './src/features/middleware.js/template.auth.js';

// Initialize Express application
const server = express();
server.use(bodyParser.urlencoded({ extended: false }));
// Middleware to parse JSON data
server.use(bodyParser.json());

// Middleware to handle session management
server.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Set EJS as the template engine
server.set("view engine", "ejs");
// setting the directory path.
server.set("views", path.join(path.resolve(), 'src', 'features', 'views'));
server.use(ejsLayouts);

server.use(templateAuth);
// Routes handler
server.use("/api/user", userRouter);
server.use("/api/home", homeRouter);

// start the server at port 8000
server.listen(8000, () => {
    console.log("Server is listening at port 8000");
    connectUsingMongoose();         // connect to the mongodb database.
})


