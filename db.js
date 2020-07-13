const spicedPg = require('spiced-pg');

// const bcrypt = require('./bcryptjs');
let db;
// if (process.env.DATABASE_URL) {
//     db = spicedPg(process.env.DATABASE_URL);
// } else {
//     const secrets = require("./secrets");
//     db = spicedPg(
//         `postgres:${secrets.dbUser}:${secrets.dbPass}@localhost:5432/petition`
//     );
// }

// ----------------------Queries------------------
exports.registerUser = function (first, second, email, pass) {
  return db.query(
    `INSERT INTO users (first, second, email, pass)
        VALUES ($1, $2, $3, $4)
        RETURNING * `,
    [first, second, email, pass]
  );
};

exports.createSignature = function (signature, user_id) {
  return db
    .query(
      `INSERT INTO dater (signature, user_id)
            VALUES ($1, $2)
            RETURNING id`,
      [signature, user_id]
    )
    .then(function (results) {
      return results.rows;
    });
};

exports.sig = function (id) {
  return db
    .query(
      `SELECT signature
            FROM dater
            WHERE id = $1`,
      [id]
    )
    .then(function (results) {
      return results.rows;
    });
};

exports.getUserbyEmail = function (email) {
  return db.query(
    `SELECT email, pass, users.id, dater.id AS sig
        FROM users
        LEFT JOIN dater
        ON dater.user_id = users.id
        WHERE email = $1`,
    [email]
  );
};
exports.profiles = function (userId, age, city, url) {
  return db
    .query(
      `
            INSERT INTO user_profiles (user_id, age, city, url)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (user_id)
            DO UPDATE SET age=$2, city=$3, url=$4`,
      [userId, age, city, url]
    )
    .then(function (results) {
      return results.rows;
    });
};
exports.signers = function () {
  return db
    .query(
      `SELECT users.first, users.second, user_profiles.age, user_profiles.city, user_profiles.url
        FROM users
        JOIN user_profiles
        ON users.id = user_profiles.user_id`
    )
    .then(function (results) {
      return results.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.cityProfiles = function (city) {
  return db
    .query(
      `SELECT users.first, users.second, user_profiles.age, user_profiles.city, user_profiles.url
        FROM users
        JOIN user_profiles
        ON users.id = user_profiles.user_id
         WHERE user_profiles.city  = $1`,
      [city]
    )
    .then(function (results) {
      return results.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.editProfile = function (userId, first, second, email, pass, age, city, url) {
  return db.query(
    `SELECT first, second, email, age, city, url
                FROM users
                LEFT JOIN user_profiles
                ON users.id = user_profiles.user_id
                WHERE users.id = $1;`,
    [userId]
  );
};

exports.edit = function (userId, first, second, email, pass) {
  if (pass) {
    return bcrypt.hash(pass).then((hash) => {
      return db.query(
        `UPDATE users SET first = $1, second = $2, email = $3, pass = $4
            WHERE id = $5`,
        [first, second, email, hash, userId]
      );
    });
  } else {
    return db.query(
      `UPDATE users SET first = $1, second = $2, email = $3
        WHERE id = $4`,
      [first, second, email, userId]
    );
  }
};
