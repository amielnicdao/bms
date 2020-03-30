
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static("public")); //added from project-test
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var routes = require("./controllers/appController"); 

if (process.env.NODE_ENV === "production") {

  app.use(express.static("client/build"));
}
app.use(routes);

app.listen(port, () => console.log(`Listening on port: http://localhost:${port}`));