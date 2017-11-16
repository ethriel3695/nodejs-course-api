'use strict';

let db = require('./postgresConnection');

// let escape = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

let findAll = (req, res, next) => {
    let query = [];
    
    // console.log(req.query.programmingcategory);
    if (req.query.programmingcategory) {
        query.programmingcategory = req.query.programmingcategory;
    }

  let sql = 'SELECT course.id, course.title, course.length, course.watchhref, course.programmingcategory, author.firstname, author.lastname ' +
  'FROM course INNER JOIN author on course.authorId = author.id ' +
  ' ORDER BY course.title;';

      db.query(sql)
        .then(products => {
          return res.json({'json': products});
        })
        .catch(next);
    };

let findById = (req, res, next) => {
  let id = req.params.id;

  let sql = `SELECT course.id, course.title, course.length, course.watchhref, course.programmingcategory, author.firstname
  FROM course INNER JOIN author on course.authorId = author.id
   WHERE course.Id = ${id};`;

  db.query(sql)
    .then(product => res.json(product[0]))
    .catch(next);
};

let saveCourse = (req, res, next) => {

  // let id = req.params.id;

  // console.log(id);

  let sql = '';
  let selectSQL = '';
    sql = `INSERT INTO course (title, authorid, length, programmingcategory, watchhref) VALUES('${req.body.title}', ${req.body.authorid}
    , '${req.body.length}', '${req.body.programmingcategory}', 'https://github.com/ethriel3695');`;

    // selectSQL = `SELECT course.id, course.title, course.length, course.watchhref, course.programmingcategory, author.firstname
    // FROM course JOIN author on course.authorid = author.id WHERE course.Id = (SELECT MAX(Id) FROM course);`;
  // if (id === '0') {
  //   sql = `INSERT INTO course (title, authorid, length, programmingcategory, watchhref) VALUES('${req.params.title}', ${req.params.authorid}
  //   , '${req.params.length}', '${req.params.programmingcategory}', 'https://github.com/ethriel3695');`;

  //   selectSQL = `SELECT course.id, course.title, course.length, course.watchhref, course.programmingcategory, author.firstname
  //   FROM course JOIN author on course.authorId = author.id WHERE course.Id = (SELECT MAX(Id) FROM course);`;
  // } else {
  //   sql = `UPDATE course SET title = '${req.params.title}', authorid = ${req.params.authorid}
  //   , programmingcategory = '${req.params.programmingcategory}', length = '${req.params.length}'
  //   WHERE course.Id = ${id};`;

  //   selectSQL = `SELECT course.id, course.title, course.length, course.watchhref, course.programmingcategory, author.firstname
  //   FROM course JOIN author on course.authorId = author.id WHERE course.Id = ${id};`;
  // }

  db.query(sql)
    .then(result => {
      // return res.json({result});
      // let total = 1;

      // db.query(selectSQL)
      //   .then(products => {
      //     console.log(products[0]);
      //     // return res.json({'total': total, 'course': products[0]});
      //     return res.json(products[0]);
      //   })
      //   .catch(next);
    })
    .catch(next);
};

let deleteCourse = (req, res, next) => {
  let id = req.params.id;

  let sql = '';
  let selectSQL = '';
  if (id === '0') {
    sql = `INSERT INTO course (title, authorid, length, programmingcategory, watchhref) VALUES('${req.params.title}', ${req.params.authorid}
    , '${req.params.length}', '${req.params.programmingcategory}', 'https://github.com/ethriel3695');`;

    selectSQL = `SELECT course.id, course.title, course.length, course.watchhref, course.programmingcategory, author.firstname
    FROM course JOIN author on course.authorId = author.id WHERE course.Id = (SELECT MAX(Id) FROM course);`;
  } else {
    sql = `DELETE course WHERE course.Id = ${id};`;

    selectSQL = `SELECT course.id, course.title, course.length, course.watchhref, course.programmingcategory, author.firstname
    FROM course JOIN author on course.authorId = author.id WHERE course.Id = ${id};`;
  }

  db.query(sql)
    .then(result => {
      // let total = 1;

      db.query(selectSQL)
        .then(products => {
          // return res.json({'total': total, 'course': products[0]});
          return res.json(products[0]);
        })
        .catch(next);
    })
    .catch(next);
};

exports.findAll = findAll;
exports.findById = findById;
exports.saveCourse = saveCourse;
exports.deleteCourse = deleteCourse;
