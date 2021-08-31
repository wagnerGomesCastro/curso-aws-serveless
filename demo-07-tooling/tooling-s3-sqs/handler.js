'use strict';

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Heelo 4',
        // input: event,
      },
      null,
      2
    ),
  };
};
