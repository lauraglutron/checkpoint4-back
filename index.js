const express = require("express");
const connection = require("./src/config");

const PORT = process.env.PORT || 5000;

const app = express();

// To connect to the Database
connection.connect(function (err) {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }
});

// Middleware to read json formatted Body request
app.use(express.json());

// Main route
app.get("/", (req, res) => {
  res.send("Welcome to my portfolio");
});

// To CREATE a new project
app.post("/api/projects", (req, res) => {
  const { title, date, link, description, maintech, id_clients } = req.body;
  connection.query(
    "INSERT INTO projects(title, date, link, description, maintech, id_clients) VALUES(?, ?, ?, ?, ?, ?)",
    [title, date, link, description, maintech, id_clients],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error saving a project");
      } else {
        res.status(200).json(req.body);
      }
    }
  );
});

// To CREATE a new client
app.post("/api/clients", (req, res) => {
  const { name } = req.body;
  connection.query(
    "INSERT INTO clients(name) VALUES(?)",
    [name],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error saving a client");
      } else {
        res.status(200).json(req.body);
      }
    }
  );
});

// To READ all the projects
app.get("/api/projects", (req, res) => {
  connection.query("SELECT * from projects", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving data");
    } else {
      res.status(200).json(results);
    }
  });
});

// To READ all the clients
app.get("/api/clients", (req, res) => {
  connection.query("SELECT * from clients", (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving data");
    } else {
      res.status(200).json(results);
    }
  });
});

// To READ a project by entering its ID in the url
app.get("/api/projects/:id", (req, res) => {
  connection.query(
    "SELECT * from projects WHERE id=?",
    [req.params.id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data");
      } else {
        res.status(200).json(results);
      }
    }
  );
});

// To READ a client by entering its ID in the url
app.get("/api/clients/:id", (req, res) => {
  connection.query(
    "SELECT * from clients WHERE id=?",
    [req.params.id],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data");
      } else {
        res.status(200).json(results);
      }
    }
  );
});

// To UPDATE a project
app.put("/api/projects/:id", (req, res) => {
  const idProject = req.params.id;
  const newProject = req.body;

  connection.query(
    "UPDATE projects SET ? WHERE id = ?",
    [newProject, idProject],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating a project");
      } else {
        res.status(200).json(req.body);
      }
    }
  );
});

// To UPDATE a client
app.put("/api/clients/:id", (req, res) => {
  const idClient = req.params.id;
  const newClient = req.body;

  connection.query(
    "UPDATE clients SET ? WHERE id = ?",
    [newClient, idClient],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating a client");
      } else {
        res.status(200).json(req.body);
      }
    }
  );
});

// To DELETE a project
app.delete("/api/projects/:id", (req, res) => {
  const idProject = req.params.id;
  connection.query(
    "DELETE FROM projects WHERE id = ?",
    [idProject],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("😱 Error deleting a project");
      } else {
        res.status(200).send("🎉 Project deleted!");
      }
    }
  );
});

// To DELETE a client
app.delete("/api/clients/:id", (req, res) => {
  const idClient = req.params.id;
  connection.query(
    "DELETE FROM clients WHERE id = ?",
    [idClient],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("😱 Error deleting a client");
      } else {
        res.status(200).send("🎉 Client deleted!");
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
