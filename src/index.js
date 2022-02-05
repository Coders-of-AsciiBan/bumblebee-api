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
    var category = req.query.category;
    var product = [{
        "id": "P60371466",
        "name": "Lace-Up Trainers",
        "description": "Step out in style with these smart leather-look trainers. Round-toe design with a contrast sole. Lace-up fastening. Made with vegan-friendly materials.",
        "image": "https://asset1.marksandspencer.com/is/image/mandstest/SD_03_T03_0035_Z0_X_EC_0",
        "categories": [
            {
              "id": "28955369-2021-09-24 03:43:58",
              "name": "Men's Smartwear"
            },
            {
              "id": "24926181",
              "name": "Men’s Summer Style"
            },
            {
              "id": "25824551",
              "name": "Formalwear"
            },
            {
              "id": "15938446",
              "name": "Mens Christmas Partywear"
            },
            {
              "id": "25977216",
              "name": "Men's Trainers"
            },
            {
              "id": "UK_Curated30560614",
              "name": "SP_MW Trainers Sep TMO"
            },
            {
              "id": "30252615",
              "name": "Men"
            },
            {
              "id": "25977195",
              "name": "Men's Casual Shoes"
            },
            {
              "id": "28097167",
              "name": "Big & Tall"
            },
            {
              "id": "28616463",
              "name": "Shop the Look"
            },
            {
              "id": "26211920",
              "name": "Sixth Form Clothing"
            },
            {
              "id": "28955369",
              "name": "Men's Smartwear"
            },
            {
              "id": "28626697",
              "name": "Shop the Look"
            }
          ],
        "price": "35.0",
        "url": "https://www.sit2.marksandspencer.com/lace-up-trainers/p/clp60371466"
    },
    {
        "id": "P60371466",
        "name": "Lace-Up Trainers",
        "description": "Step out in style with these smart leather-look trainers. Round-toe design with a contrast sole. Lace-up fastening. Made with vegan-friendly materials.",
        "image": "https://asset1.marksandspencer.com/is/image/mandstest/SD_03_T03_0035_Z0_X_EC_0",
        "categories": [
            {
              "id": "28955369-2021-09-24 03:43:58",
              "name": "Men's Smartwear"
            },
            {
              "id": "24926181",
              "name": "Men’s Summer Style"
            },
            {
              "id": "25824551",
              "name": "Formalwear"
            },
            {
              "id": "15938446",
              "name": "Mens Christmas Partywear"
            },
            {
              "id": "25977216",
              "name": "Men's Trainers"
            },
            {
              "id": "UK_Curated30560614",
              "name": "SP_MW Trainers Sep TMO"
            },
            {
              "id": "30252615",
              "name": "Men"
            },
            {
              "id": "25977195",
              "name": "Men's Casual Shoes"
            },
            {
              "id": "28097167",
              "name": "Big & Tall"
            },
            {
              "id": "28616463",
              "name": "Shop the Look"
            },
            {
              "id": "26211920",
              "name": "Sixth Form Clothing"
            },
            {
              "id": "28955369",
              "name": "Men's Smartwear"
            },
            {
              "id": "28626697",
              "name": "Shop the Look"
            }
          ],
        "price": "35.0",
        "url": "https://www.sit2.marksandspencer.com/lace-up-trainers/p/clp60371466"
    }]
    res.status(200).send({"body": product, "message": "Success!"});
});

app.post('/gameScore', function(req, res){

});

app.get('/leaderboard', function(req,res){

});