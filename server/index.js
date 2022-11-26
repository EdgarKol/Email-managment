const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(cors()); // Avoid CORS errors in browsers
app.use(express.json()); // Populate req.body
YAML = require("yamljs");
const swaggerDocument = YAML.load("swagger.yaml");
const swaggerUi = require("swagger-ui-express");

const emails = [
  {
    id: 1,
    name: "John",
    email: "john@example.com",
    content: "Hello, world!",
  },
  {
    id: 2,
    name: "Mihkel",
    email: "mihkel@example.com",
    content: "tere mis toimub",
  },
];
const users = [{ username: "user", password: "password" }];
const sessions = [];

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("Welcome from backend");
});

app.get("/e-mails", (req, res) => {
  let auth = req.headers.authorization;
  if (!auth) {
    res.status(401).send({ error: "you must be logged in" });
  } else {
    try {
      let obj = sessions.find((s) => session.id == auth);
      if (!obj) {
        return res.status(403).send({ error: "Unauthorized" });
      } else {
        if (!emails[req.params]) {
          return res.status(404).send({ error: "e-mails not found" });
        } else {
          res.status(200).send({ success: true });
          res.send(emails);
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(401).send({ error: "Sessions not found" });
    }
  }
  // res.send(emails);
});

app.post("/e-mail", (req, res) => {
  let auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).send({ error: "Missing authorization header" });
  } else {
    try {
      let obj = sessions.find((o) => o.id == auth);

      if (!obj.users) {
        return res.status(403).send({ error: "Unauthorized" });
      } else {
        if (!req.body.name || !req.body.email || !req.body.content) {
          return res
            .status(400)
            .send({ error: "One or all params are missing" });
        }
        let newEmail = {
          id: emails.length + 1,
          name: req.body.name,
          location: req.body.email,
          date: req.body.content,
        };
        events.push(newEmail);
        res
          .status(201)
          .location("localhost:3000/e-mails/" + (emails.length - 1))
          .send(newEmail);
      }
    } catch (error) {
      console.log(error);
      return res.status(401).send({ error: "Session not found" });
    }
  }
});

app.delete("/e-mails/:id", (req, res) => {
  let auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).send({ error: "you must be logged in" });
  } else {
    try {
      let obj = sessions.find((session = session.id == auth));

      if (!obj) {
        return res.status(403).send({ error: "user not found" });
      } else {
        if (!emails[req.params.id - 1]) {
          return res.status(404).send({ error: "email not found" });
        }
        emails.splice(req.params.id - 1, 1);

        for (let i = 0; i < emails.length; i++) {
          emails[i].id = i + 1;
        }
        return res.status(201).send({ success: true });
      }
    } catch (error) {
      console.log(error);
      return res.status(401).send({ error: "session not found" });
    }
  }
});

app.post("/sessions", (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({ error: "One or more parameters missing" });
  } else {
    userMatched = 0;
    users.forEach((element) => {
      if (
        element.username == req.body.username &&
        element.password == req.body.password
      ) {
        userMatched += 1;
        sessionId = Math.round(Math.random() * 100000000);
        session = {
          id: sessionId,
          users: req.body.username,
        };
        sessions.push(session);
      }
    });
    if (userMatched == 0) {
      return res.status(401).send({ error: "Invalid username or password" });
    } else if (userMatched == 1) {
      return res.status(201).send({ success: true, sessionId: sessionId });
    }
  }
});

app.post("/logout", (req, res) => {
  if (!req.body.username || !req.body.sessionId) {
    return res.status(400).send({ error: "One or more parameters missing" });
  } else {
    sessions.forEach((element) => {
      if (
        element.user == req.body.username ||
        element.id == req.body.sessionId
      ) {
        sessions.splice(element);
        return res.status(201).send({ success: true });
      } else {
        return res.status(401).send({ error: "Invalid sessionId or username" });
      }
    });
  }
});

app.listen(port, () => console.log(`Server started on port ${port}`));
