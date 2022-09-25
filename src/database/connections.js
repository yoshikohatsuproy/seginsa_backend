import mysql from "mysql"
import config from "../config"


const dbSettings = {
    host : config.host,
    user : config.user,
    password: config.password,
    database: config.database,
    port : config.db_port
}

export async function getConnections() {
    try {
        const pool = mysql.createConnection(dbSettings)
        return pool
    }catch(error){
        console.error(error)
    }
}