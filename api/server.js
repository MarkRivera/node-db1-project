const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

// GET

server.get("/", async (req, res) => {
  try {
    let data = await db("accounts");
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

server.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let data = await db("accounts").where({ id });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

// POST

server.post("/", async (req, res) => {
  try {
    let userInput = await db("accounts").insert(req.body);
    res.json(userInput);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sorry!" });
  }
});

// PUT

server.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let updated = await db("accounts").where({ id }).update(req.body);
    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sorry something went wrong." });
  }
});

// DELETE

server.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let deleted = await db("accounts").where({ id }).del();
    res.status(200).json(deleted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sorry something went wrong." });
  }
});

module.exports = server;
