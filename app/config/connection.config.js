import mysql from "mysql2/promise";

const db = mysql.createPool({
    host: "193.203.184.190",
    user: "u362902856_ritzmediaworld",
    password: "Private#@987",
    database: "u362902856_ritzmediaworld",
});

export default db;