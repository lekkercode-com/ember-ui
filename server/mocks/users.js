'use strict';

module.exports = function (app) {
  const express   = require('express');
  let usersRouter = express.Router();

  /*
    catches the Update request on a user
    PATCH "localhost:4200/api/users/1"
  */
  usersRouter.patch('/:id', function (request, res) {
    // Update data from the UI
    const requestBody = request.body;
    res.send(requestBody);
  });

  /*
    catches the GET request on a user
    GET "localhost:4200/api/users/1"
  */
  usersRouter.get('/:id', function (request, res) {
    const user = usersJson.data.find((user)=> {
      return user.id === request.params.id;
    });

    res.send({ data: user });
  });

  /*
    catches the index request on users
    GET "localhost:4200/api/users"
  */
  usersRouter.get('/', function (req, res) {
    res.send(usersJson);
  });

  app.use('/api/users', require('body-parser').json({ type: 'application/*+json' }), usersRouter);
};

// USER MOCK DATA
const usersJson = {
  "data": [
  {
    "id": "1",
    "type": "user",
    "attributes": {
      "name": "Albert Einstein",
      "image": "/images/Einstein.jpg"
    }
  },
  {
    "id": "2",
    "type": "user",
    "attributes": {
      "name": "Walt Disney",
      "image": "/images/Walt.jpg"
    }
  },
  {
    "id": "3",
    "type": "user",
    "attributes": {
      "name": "Bruce Lee",
      "image": "/images/Bruce.jpg"
    }
  },
  {
    "id": "4",
    "type": "user",
    "attributes": {
      "name": "Neil Armstrong",
      "image": "/images/Neil.jpg"
    }
  },
  {
    "id": "5",
    "type": "user",
    "attributes": {
      "name": "Stephen Hawking",
      "image": "/images/Stephen.png",
      "value": "One of the basic rules of the universe is that nothing is perfect.",
      "archived": true
    },
  },
  ]
};
