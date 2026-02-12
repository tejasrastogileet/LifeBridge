const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const v1Routes = require('./routes/index');
const dbConnect = require('./config/db');
const cors = require("cors");

setUpAndStartServer = () => {

    dbConnect();
    const app = express();
    
    // CORS configuration for both local and production
    const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:3001",
        process.env.FRONTEND_URL || "http://localhost:3000"
    ];
    
    app.use(cors({
        origin: function(origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("CORS not allowed"));
            }
        },
        credentials: true
    }));
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',v1Routes)

    app.listen(PORT , async()=> {
        console.log("Server started on PORT ",PORT);
        console.log("CORS enabled for:", allowedOrigins.join(", "));
    })
}

setUpAndStartServer();