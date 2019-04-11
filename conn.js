
function conn(table) {
  const db = require('monk')('localhost/Knove')

  return db.get(table);
}

module.exports = conn;
