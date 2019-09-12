const mysql = require('mysql');

const conn = mysql.createConnection({
    host:   '127.0.0.1',
    user: 'root',
    password: 'root',
    port:'8889',
    database: 'toonAcademy',
  });


  conn.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + conn.threadId);
  });


  module.exports = conn;