const express = require('express');
const app = express();
require("dotenv/config");
const mongoose = require("mongoose");
const helmet = require('helmet');
const morgan = require('morgan');

const authRoute = require("./routers/auth_route");
const categoryRoute = require("./routers/category_route");
const productRoute = require('./routers/product_router');

try {
    //connect
    mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.zzy6ea2.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Database connected !");
        });
} catch (error) {
    console.log(error);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('tiny'));
app.use("/api/v1/", authRoute);
app.use("/api/v1/", categoryRoute);
app.use("/api/v1/", productRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});