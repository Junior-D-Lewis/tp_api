const express = require("express");
const pool = require("./db/dbConfig");
const app = new express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/films", async (req, res) => {
    try {
        const films = await pool.query("SELECT * FROM film");
        res.status(200).json(films.rows);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.post("/api/films", async (req, res) => {
    const {
      title,
      description,
      release_year,
      language_id,
      rental_duration,
      rental_rate,
      length,
      replacement_cost,
      rating,
      special_features,
      last_update,
      fulltext
    } = req.body;
    try {
        const film = await pool.query(
          "INSERT INTO film (title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating, special_features, last_update, fulltext) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
          [
            title,
            description,
            release_year,
            language_id,
            rental_duration,
            rental_rate,
            length,
            replacement_cost,
            rating,
            special_features,
            last_update,
            fulltext,
          ]
        );
        res.status(201).json({ message: "Film added successfully!"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = app;
