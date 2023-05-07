const mysql = require("mysql");

const config = {
  local: {
    host: "localhost",
    user: "root",
    password: "",
    database: "parking_management_2",
    connectionLimit: 50,
    multipleStatements: true,
  },
  remote: {
    host: "sql12.freesqldatabase.com",
    user: "sql12616557",
    password: "ShSQUAR7P6",
    database: "sql12616557",
    connectionLimit: 100,
    multipleStatements: true,
  },
};

var db;
function handleDisconnect() {
  db = mysql.createPool(config.local); // Recreate the connection, since

  db.getConnection(function (err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }
    setInterval(() => {
      db.query("show databases", [], (error, results, fields) => {
        if (error) {
          return console.log("db error:", error);
        }
        return console.log("connection alive");
      });
    }, 90000); // the old one cannot be reused.

    // to avoid a hot loop, and to allow our node script to
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  db.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}

handleDisconnect();

module.exports = db;
