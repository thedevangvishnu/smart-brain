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
    {
      id: "124",
      username: "Sally",
      email: "sally@gmail.com",
      password: "salmon",
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
  const { email, password } = req.body;

  let isSignedIn = false;
  users.forEach((user) => {
    if (user.email === email && user.password === password) {
      isSignedIn = true;
      return res.json({ user, msg: "Sign in success" });
    }
  });

  if (!isSignedIn) {
    res
      .status(403)
      .json("Invalid login credentials. Check username and passwrod");
  }
});

// Register
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const users = database.users;
  users.push({
    id: "125",
    username: username,
    email: email,
    password: password,
    enteries: 0,
    joined: new Date(),
  });

  res.json(users[users.length - 1]);
});

// Profile/:id
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  const users = database.users;

  let found = false;
  users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });

  if (!found) {
    res.status(404).json("User not found");
  }
});

app.listen(3000);

/*
Major endpoints
    - /signIn --> POST = success/fail
    - /register --> PoST = user data
    - /profile/:userId --> GET = user
    - /image --> PUT = user
*/
