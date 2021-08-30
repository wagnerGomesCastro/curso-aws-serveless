'use strict';
// const { exec } = require('child_process')
// const { promisify } = require('util')
// const shell = promisify(exec)

class Handler {
  constructor() { }

  static async main(event) {
    // const response = await shell(`gm identify -verbose ./app/resources/img/homer.jpg`)

    // console.log(response)

    try {

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'text/html'
        },
        body: 'response.stdout'
      }

    } catch (error) {
      console.error('error***', error.stack)
      return {
        statusCode: 500,
        body: 'Internal server error!!!'
          // body: error.stack
      }
    }
  }
}


const handler = new Handler()
// module.exports = {
//   mememaker: handler.main.bind(handler)
// }

module.exports.mememaker = handler.main.bind(handler)




