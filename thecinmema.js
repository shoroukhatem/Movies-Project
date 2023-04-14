const express = require('express')
const router = express.Router()
const mysql = require("mysql")
const pool = mysql.createPool({
    connectionLimit: 10,
    password: "",
    host: "localhost",
    user: "root",
    database: "mycinema"
})
router.use(express.json());

// routes for movies
router.get("/", (req, res) => {
    pool.query("SELECT * from thecamp_cinema", function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    })
});
router.use(express.json());
router.post("/", (req, res) => {
    var movie = []
    movie.push(req.body.movie_name)
    movie.push(req.body.movie_length)
    movie.push(req.body.movie_director)
    pool.query("INSERT INTO thecamp_cinema (movie_name, movie_length, movie_director) VALUES (?,?,?);", movie, function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    })

});
//update
router.post("/:id([0-9]{10})", (req, res) => {
    const id = req.params.id
    const movie_length = req.body.movie_length
    const movie_director = req.body.movie_director
    pool.query("UPDATE thecamp_cinema SET movie_length = ? , movie_director= ? WHERE Id = ?;", [movie_length, movie_director, id], function (error, results, fields) {
        if (error) throw error;
        res.send("updated")
    })
})

router.delete("/:id([0-9]{10})", (req, res) => {
    const id = req.params.id
    pool.query("DELETE from thecamp_cinema WHERE Id = ?", id, function (error, results, fields) {
        if (error) throw error;
        res.send("deleted")
    })
})
//routes for rating
router.post("/rating", (req, res) => { //adding review
    var movie = []
    movie.push(req.body.movie_id)
    movie.push(req.body.movie_review)
    pool.query("INSERT INTO thecamp_movies_ratings (movie_id,movie_review) VALUES (?,?);", movie, function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    })

});
// routes for actors
//CRUD Operations for actors
router.get("/actors", (req, res) => {
    pool.query("SELECT * from thecamp_movies_actors", function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    })
});
router.use(express.json());
router.post("/actors", (req, res) => {
    var movie = []
    movie.push(req.body.movie_id)
    movie.push(req.body.actor_name)
    movie.push(req.body.actor_salary)
    pool.query("INSERT INTO thecamp_movies_actors (movie_idd, actor_name, actor_salary) VALUES (?,?,?);", movie, function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    })

});
//update
router.post("/actors/:id", (req, res) => {
    const id = req.params.id
    const actor_name = req.body.actor_name
    const actor_salary = req.body.actor_salary
    pool.query("UPDATE thecamp_movies_actors SET actor_name = ? , actor_salary= ? WHERE Id = ?;", [actor_name, actor_salary, id], function (error, results, fields) {
        if (error) throw error;
        res.send("updated")
    })
})

router.delete("/actors/:id", (req, res) => {
    const id = req.params.id
    pool.query("DELETE from thecamp_movies_actors WHERE Id = ?", id, function (error, results, fields) {
        if (error) throw error;
        res.send("deleted")
    })
})

module.exports = router