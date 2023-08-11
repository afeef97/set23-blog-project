import config from "../config";
import { Pool } from "pg";

const pool = new Pool({
    host: config.postgres.host,
    port: config.postgres.port,
    database: config.postgres.database,
    user: config.postgres.user,
    password: config.postgres.password,
    ssl:
        config.nodeEnv === "production"
            ? {
                  require: true,
                  rejectUnauthorized: false,
              }
            : false,
});

async function queryDB(text, params) {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("executed query", { text, duration, rows: res.rowCount });
    return res;
}

export default queryDB;
