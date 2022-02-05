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