const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'premium293.web-hosting.com',
    user: 'blueceds_bluefeedbacksystem', // your MySQL username
    password: 'BlueFeedback24', // your MySQL password
    database: 'blueceds_sports_league'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

// Create a league
app.post('/leagues', (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO leagues (name) VALUES (?)', [name], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertId, name });
    });
});

// Get all leagues
app.get('/leagues', (req, res) => {
    db.query('SELECT * FROM leagues', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get teams by league id
app.get('/leagues/:leagueId/teams', (req, res) => {
    const { leagueId } = req.params;
    db.query('SELECT * FROM teams WHERE league_id = ?', [leagueId], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Create a team
app.post('/teams', (req, res) => {
    const { league_id, name } = req.body;
    db.query('INSERT INTO teams (league_id, name) VALUES (?, ?)', [league_id, name], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertId, name });
    });
});

// Get players by team id
app.get('/teams/:teamId/players', (req, res) => {
    const { teamId } = req.params;
    db.query('SELECT * FROM players WHERE team_id = ?', [teamId], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Create a player
app.post('/players', (req, res) => {
    const { team_id, name, position } = req.body;
    db.query('INSERT INTO players (team_id, name, position) VALUES (?, ?, ?)', [team_id, name, position], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertId, name, position });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
