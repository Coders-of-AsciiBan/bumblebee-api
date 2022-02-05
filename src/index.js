'use strict'
const path = require('path')
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const AWS = require('aws-sdk');
const app = express()
const secrets = require('../secrets.js');
const qs = require('qs');

AWS.config.update({region: secrets.awsRegion});

const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10', region: secrets.awsRegion});

app.get('/favicon.ico', function (req, res) {
    res.sendStatus(404);
});

module.exports = app


app.get('/fetchCategories', function(req,res){
    var categories = {"categories": [
        {
          "id": "729065",
          "name": "Underwear & Socks"
        },
        {
          "id": "644509",
          "name": "Socks"
        },
        {
          "id": "646583",
          "name": "Underwear & Socks"
        },
        {
          "id": "26850330",
          "name": "Percy Pig Gifts"
        },
        {
          "id": "26138718",
          "name": "Men's Socks"
        },
        {
          "id": "5363863",
          "name": "Stocking Fillers for Him"
        },
        {
          "id": "8834606",
          "name": "Fun & Novelty Gifts for Him"
        }
      ]};
      res.status(200).send({"body": categories, "message": "Success!"});
});

app.get('/game', function(req, res){

});

app.post('/gameScore', function(req, res){

});

app.get('/leaderboard', function(req,res){

});