const mysql = require("mysql");


const db = mysql.createConnection({
  host: "remotemysql.com",
  user:"FD2e9bxeWt",
  password: "bccLWKcHPx",
  database:"FD2e9bxeWt",
  connectionLimit: 50,
  multipleStatements: true
});

db.connect(err => {
  if(err){
    throw err
  }
  console.log('Database is running');
})
module.exports = db;
