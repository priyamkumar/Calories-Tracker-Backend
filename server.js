const express = require("express");
const connectDb = require("./utils/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const port = process.env.PORT || 5000;

connectDb()
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.get("/", (req, res) => {
    res.send("Working")
});
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/track", require("./routes/trackingRoutes"));
app.use("/api/v1/details", require("./routes/detailsRoutes"));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on PORT" ${port}`);
})