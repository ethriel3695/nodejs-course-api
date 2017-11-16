'use strict';

let db = require('./postgresConnection');

let findAllAuthors = (req, res, next) => {
  let sql = 'SELECT author.id, author.firstname, author.lastname ' +
  'FROM author' +
  ' ORDER BY author.id;';

  db.query(sql)
    .then(products => {
      return res.json({'authors': products});
    })
    .catch(next);
};

exports.findAllAuthors = findAllAuthors;