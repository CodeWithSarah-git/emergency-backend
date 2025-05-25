require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose"); 
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

connectDB();
mongoose.connection.once('open', () => console.log(' Connected to MongoDB'));
mongoose.connection.on('error', err => console.log(' MongoDB connection error:', err));
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

const UserRout = require("./router/UserRout"); 
const NotificationRout = require("./router/NotificationRout");
const EmergencyRout = require("./router/EmergencyRout");
const CallHistoryRout = require("./router/CallHistoryRout");
const authRoutes=require("./router/authRoutes");

app.use("/api/Users", UserRout);
app.use("/api/Notification", NotificationRout);
app.use("/api/Emergency", EmergencyRout);
app.use("/api/CallHistory", CallHistoryRout);
app.use("/api/auth",authRoutes );

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});