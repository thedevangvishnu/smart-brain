const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("This is working");
});

app.listen(3000);

/*
Major endpoints
    - /signIn --> POST = success/fail
    - /register --> PoST = user data
    - /profile/:userId --> GET = user
    - /image --> PUT = user
*/
