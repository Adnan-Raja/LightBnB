const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

//Get user with email
const getUserWithEmail = function (email) {
return pool
  .query(`SELECT * FROM users WHERE users.email LIKE $1`, [email])
  .then((result) => result.rows.length > 0 ? result.rows[0]: null)
  .catch((err) => {
    console.log(err.message)
  });
};
exports.getUserWithEmail = getUserWithEmail;

//get user with id
const getUserWithId = function (id) {
  return pool
    .query(`SELECT * FROM users WHERE users.id = $1`, [id])
    .then((result) => result.rows.length > 0 ? result.rows[0]: null)
    .catch((err) => {
      console.log(err.message)
    });  
  };

exports.getUserWithId = getUserWithId;

//add user
const addUser = function (user) {
  return pool.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [user.name, user.email, user.password])
  .then((result) => result.rows[0])
  .catch((err) => {
    console.log(err.message)
  });
};

exports.addUser = addUser;


//get all reservations
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

//to get all properties
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  let queryString = `
    SELECT properties.*, avg(property_reviews.rating) AS average_rating
    FROM properties
    LEFT OUTER JOIN property_reviews ON property_id = properties.id`;

  if (Object.keys(options).length > 1) {
    let queriesAdded = false;

    if (options.city) {
      if (!queriesAdded) {
        queryString += `
        WHERE `;
        queriesAdded = true;
      }
      queryParams.push(`%${options.city}%`);
      queryString += ` properties.city LIKE $${queryParams.length} AND `;
    }
    if (options.owner_id) {
      if (!queriesAdded) {
        queryString += `
        WHERE `;
        queriesAdded = true;
      }
      queryParams.push(Number(options.owner_id));
      queryString += ` properties.owner_id = $${queryParams.length} AND `;
    }
    if (options.minimum_price_per_night) {
      if (!queriesAdded) {
        queryString += `
        WHERE `;
        queriesAdded = true;
      }
      queryParams.push(Number(options.minimum_price_per_night) * 100);
      queryString += ` properties.cost_per_night >= $${queryParams.length} AND `;
    }
    if (options.maximum_price_per_night) {
      if (!queriesAdded) {
        queryString += `
        WHERE `;
        queriesAdded = true;
      }
      queryParams.push(Number(options.maximum_price_per_night) * 100);
      queryString += ` properties.cost_per_night <= $${queryParams.length} AND `;
    }


    if (queriesAdded) {
      queryString = queryString.slice(0, -4);
    }

  }

  queryString += `
    GROUP BY properties.id`;
  if (options.minimum_rating) {
    queryParams.push(Number(options.minimum_rating));
    queryString += `
    HAVING avg(rating) >= $${queryParams.length}`;
  }
  queryParams.push(limit);
  queryString += `
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};`;

  return pool.query(queryString, queryParams).then(res => res.rows);
};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  return pool.query(`
    INSERT INTO properties (
      owner_id,
      title,
      description,
      thumbnail_photo_url,
      cover_photo_url,
      cost_per_night,
      street,
      city,
      province,
      post_code,
      country,
      parking_spaces,
      number_of_washrooms,
      number_of_bedrooms,
      active)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    RETURNING *;
  `,[
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms,
    true
  ]).then(resp => resp.rows[0]);
};
exports.addProperty = addProperty;