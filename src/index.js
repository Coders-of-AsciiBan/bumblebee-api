'use strict';

const pkg = require('@prisma/client');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const app = express();

dotenv.config({ path: './.env' });

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

//const prisma = new prisma.PrismaClient();

app.use(cors());

app.get('/favicon.ico', function (req, res) {
  res.sendStatus(404);
});

module.exports = app;

app.get('/', function (req, res) {
  res.status(200).send('Server ready at: http://localhost:3000 🚀');
});

app.get('/fetchCategories', async (req, res) => {
  //Code to fetch the different categories from the db
  try {
    const categories = await prisma.category.findMany();
    console.log(categories);
    res.status(200).send({ body: categories, message: 'Success!' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error :(');
  }
});

app.get('/game', async (req, res) => {
  //Code to extract the data from the db based on the relevant category
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
        url: true,
      },
    });
    res.status(200).send({ body: products, message: 'Success!!' });
  } catch (error) {
    console.log(error);
    res.status(404).send('Data Not Found!');
  }
});

// Object format for submissionData
// {
//     "username": <name>,
//     "email": <email>,
//     "score": <score>,
//     "submissionId": <UUID>,
//     "submission": [{
//         "productId": <productId>,
//         "guessedPrice": <guessedPrice>,
//         "actualPrice": <actualPrice>
//     }],
//     "timestamp": <timestamp>
// }

app.get('/gameScore', async (req, res) => {
  //var userData = req.body.data;

  //Local testing implementation for userData - comment it out while commiting
  var userData = {
    userName: 'abc',
    email: 'abc@gmail.com',
    submissionData: {
      score: 4,
      gameItems: [
        {
          productId: 'P60515662',
          guessedPrice: 11,
        },
        {
          productId: 'P60371466',
          guessedPrice: 25,
        },
        {
          productId: 'P60370104',
          guessedPrice: 30,
        },
        {
          productId: 'P22491941',
          guessedPrice: 60,
        },
        {
          productId: 'P60267024',
          guessedPrice: 24,
        },
      ],
    },
  };
  var { userName, email, submissionData } = userData;
  try {
    await prisma.submission.create({
      data: {
        user: {
          connectOrCreate: {
            create: {
              email: email,
              username: userName,
            },
            where: {
              email: email,
            },
          },
        },
        score: submissionData.score,
        guesses: {
          createMany: {
            data: submissionData.gameItems.map((item) => {
              return { ...item };
            }),
          },
        },
      },
    });
    res.status(200).send({ message: 'Data recorded!' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
  //Code to store this data into the db
});

app.get('/leaderboard', async (req, res) => {
  //Code to fetch all the usernames and scores from the db and sending it to the front end
  try {
    const leaderboardData = await prisma.user.findMany({
      select: {
        username: true,
        submissions: {
          select: {
            score: true,
          },
        },
      },
    });
    res.status(200).send({ body: leaderboardData, message: 'Data extracted successfully!' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Oops...Internal Server Error! Please try again later!');
  }
});

app.listen(process.env.PORT || 4000, () =>
  console.log(`
Server ready at: http://localhost:${process.env.PORT} 🚀 `)
);
