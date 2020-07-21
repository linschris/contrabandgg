const express = require('express')
const axios = require('axios')
const app = express();
const path = require('path')
const port = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY


// if(process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, 'contra-react', 'build')))
// }

app.use(express.static(path.join(__dirname, 'contra-react', 'build')))
app.get('/', function (req, res, next) {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, '/contra-react/build/index.html'));
});

app.get('/fetchUser/:userName', (req, res) => {
    axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.userName}?api_key=${API_KEY}`)
    .then(response => res.json(response.data))
    .catch(err => res.send(err))
})

app.get('/ranked/:summonerId', (req, res) => {
    axios.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${req.params.summonerId}?api_key=${API_KEY}`)
    .then(response => res.json(response.data))
    .catch(err => res.send(err))
})

//Change endIndex to pull more matches than 5 as necessary
app.get('/matchList/:accountId', (req, res) => {
    axios.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${req.params.accountId}?endIndex=5&api_key=${API_KEY}`)
    .then(response => res.json(response.data))
    .catch(err => res.send(err))
})
app.get('/matchList/:accountId/:endIndex', (req, res) => {
    axios.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${req.params.accountId}?endIndex=${req.params.endIndex}&api_key=${API_KEY}`)
    .then(response => res.json(response.data))
    .catch(err => res.send(err))
})

app.get('/matchInfo/:matchId', (req, res) => {
    axios.get(`https://na1.api.riotgames.com/lol/match/v4/matches/${req.params.matchId}?api_key=${API_KEY}`)
    .then(response => res.json(response.data))
    .catch(err => res.send(err))
})

app.get('/champName/:champId', (req, res) => {
    axios.get(`http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/${req.params.champId}.json`)
    .then(response => res.json(response.data))
    .catch(err => res.send(err))
})

app.get('/champMasteries/:summonerId', (req, res) => {
    axios.get(`https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${req.params.summonerId}?api_key=${API_KEY}`)
    .then(response => res.json(response.data))
    .catch(err => res.send(err))
})

app.get('/leaderboards/:tier/:division/:page', (req, res) => {
    const {tier, division, page} = req.params
    axios.get(`https://na1.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/${tier}/${division}?page=${page}&api_key=${API_KEY}`)
    .then(response => res.json(response.data))
    .catch(err => res.send(err))
})

app.listen(port, () => console.log(`App is listening on port: ${port}`))