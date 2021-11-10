"use strict";

module.exports.public = async (event) => {
  console.log('Request public route...', new Date().toISOString())
  return {
    statusCode: 200,
    body: JSON.stringify(
      [{
        id: 1,
        nome: "Flash",
        power: "Speed"
      }],
      null,
      2
    ),
  };
};

module.exports.private = async (event) => {
  console.log('Request private route...', new Date().toISOString())
  return {
    statusCode: 200,
    body: JSON.stringify(
      [{
        id: 100,
        nome: "Batman",
        power: "Rich"
      }],
      null,
      2
    ),
  };
};
