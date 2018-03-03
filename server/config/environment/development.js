'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connection opions
  sequelize: {
    uri: 'postgresql://postgres:postgres@localhost/hackday',
    options: {
    }
  },
};
