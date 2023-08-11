import config from "../config";
import { Pool } from "pg";

const pool = new Pool({
    host: config.nodeEnv["POSTGRES_HOST"],
    port: config.nodeEnv["POSTGRES_PORT"],
    database: config.nodeEnv["POSTGRES_DATABASE"],
    user: config.nodeEnv["POSTGRES_USER"],
    password: config.nodeEnv["POSTGRES_PASSWORD"],
    ssl: true,
});

async function queryDB(text, params) {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("executed query", { text, duration, rows: res.rowCount });
    return res;
}

export default queryDB;
