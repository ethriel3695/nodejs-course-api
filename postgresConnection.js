'use strict';

// let config = require('./config');
// let databaseURL = config.databaseURL;
let { Pool } = require('pg');
let pool = new Pool({
  host: `ec2-54-243-43-72.compute-1.amazonaws.com`,
  user: 'rkswtuodfwuiov',
  password: '56a857c3f841459fffe73d683be2aa4e093e0865cd0ad5c609214c944c277b83',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  database: 'db90kgl92i4qrj',
  ssl: 1,
});

exports.query = function (sql, values, singleItem, dontLog) {
  if (!dontLog) {
    // console.log(sql);
  }

  return new Promise((resolve, reject) => {
    pool.connect((err, conn, done) => {
      if (err) return reject(err);
      try {
        conn.query(sql, function (err, result) {
          done();
          if (err) {
            reject(err);
          } else {
            resolve(singleItem ? result.rows[0] : result.rows);
          }
        });
      } catch (e) {
        done();
        reject(e);
      }
      // conn.release();
    });
  });
};
