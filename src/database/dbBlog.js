import { Pool } from "pg";

const pool = new Pool({
    user: "postgres",
    host: "192.168.1.113",
    database: "set2023-blog-project",
    password: "284120",
    port: 5432,
});

async function queryDB(text, params) {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("executed query", { text, duration, rows: res.rowCount });
    return res;
}

export default queryDB;
