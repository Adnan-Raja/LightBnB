const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

const getAllProperties = (options, limit = 10) => {
  return pool
    .query(`SELECT * FROM properties LIMIT $1`, [limit])
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getAllProperties = getAllProperties;


// getUserWithEmail
// Accepts an email address and will return a promise.
// The promise should resolve with the user that has that email address, or null if that user does not exist.

const getUserWithEmail = function (email) {
return pool
  .query(`SELECT * FROM users WHERE users.email LIKE $1`, [email])
  .then((result) => result.rows.length > 0 ? result.rows[0]: null)
  .catch((err) => {
    console.log(err.message)
  });
};
exports.getUserWithEmail = getUserWithEmail;


const getUserWithId = function (id) {
  return pool
    .query(`SELECT * FROM users WHERE users.id = $1`, [id])
    .then((result) => result.rows.length > 0 ? result.rows[0]: null)
    .catch((err) => {
      console.log(err.message)
    });  
  };

exports.getUserWithId = getUserWithId;

const addUser = function (user) {
  return pool.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [user.name, user.email, user.password])
  .then((result) => result.rows.length > 0 ? result.rows[0].id: -1)
  .catch((err) => {
    console.log(err.message)
  });
};

exports.addUser = addUser;


const getAllReservations = function (guest_id, limit = 10) {
  return pool.query(`
    SELECT *
    FROM reservations
    JOIN properties ON properties.id = property_id
    WHERE guest_id = $1
    LIMIT $2`
    , [guest_id, limit])
  .then((result) => result.rows)
  .catch((err) => {
    console.log(err.message)
  });  
};
exports.getAllReservations = getAllReservations;

/// Users





/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
