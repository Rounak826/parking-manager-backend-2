const mysql = require("mysql");

const db_config = {
  host: "mysql-113630-0.cloudclusters.net",
  user: "admin",
  password: "VH9bgDyg",
  database: "parking_management",
  connectionLimit: 50,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  port: 15187,
  multipleStatements: true,
};
const db_config1 = {
  host: "sql6.freemysqlhosting.net",
  user: "sql6505187",
  password: "ys3eF9Eegq",
  database: "sql6505187",
  connectionLimit: 50,
  multipleStatements: true,
};
const db_config2 = {
  host: "localhost",
  user: "root",
  password: "",
  database: "parking_management",
  connectionLimit: 50,
  multipleStatements: true,
};
const db_config3 = {
  host: "sql12.freesqldatabase.com",
  user: "sql12601144",
  password: "ifGQbDf9Vy",
  database: "sql12601144",
  connectionLimit: 50,
  multipleStatements: true,
};
var db;
function handleDisconnect() {
  db = mysql.createPool(db_config); // Recreate the connection, since

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
