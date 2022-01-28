const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'root',
      database: 'employees_db'
    },
    console.log(`Connected to the courses_db database.`)
  );

module.exports = db;
