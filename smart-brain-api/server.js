const express = require("express");
const app = express();

const database = {
  users: [
    {
      id: "123",
      username: "John",
      email: "john@gmail.com",
      password: "cookies",
      enteries: 0,
      joined: new Date(),
    },
  ],
};

app.use(express.json());

app.get("/", (req, res) => {
  res.json(database.users);
});

// Sign in
app.post("/signin", (req, res) => {
  const users = database.users;
  for (let i = 0; i < users.length; i++) {
    if (
      req.body.email !== users[i].email ||
      req.body.password !== users[i].password
    ) {
      res
        .status(403)
        .json("Invalid login credentials. Check username and passwrod");
    }

    res.json("Log in success!");
  }
});

// Register
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const users = database.users;
  users.push({
    id: "123",
    username: username,
    email: email,
    password: password,
    enteries: 0,
    joined: new Date(),
  });

  res.json(users[users.length - 1]);
});

app.listen(3000);

/*
Major endpoints
    - /signIn --> POST = success/fail
    - /register --> PoST = user data
    - /profile/:userId --> GET = user
    - /image --> PUT = user
*/
