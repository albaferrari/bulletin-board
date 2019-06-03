const routesController = require("./server/controllers/routesControllers");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false}));


app.get("/", routesController.getHome);
app.get("/messages", routesController.getMessages);

app.post("/addMessage", routesController.addMessage);




app.listen(port, () => console.log(`Listening to the port: ${port}`))