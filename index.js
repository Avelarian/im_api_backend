const express = require('express')
const cors = require("cors");

const routes = require("./routes");
const connection = require("./database");

const app = express()
const port = 3333

app.use(cors());
app.use(express.json());
app.use(routes);

connection.sync();

app.listen(port, () => {
    console.log(`Service is available on port ${port}`)
})