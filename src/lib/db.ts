import mysql from "mysql2/promise"

const globalConPool = globalThis as unknown as { poolListaEspera?: mysql.Pool }

// Se reutiliza entre recargas de `next dev` para no abrir un pool nuevo en cada cambio
export const pool =
  globalConPool.poolListaEspera ??
  mysql.createPool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 5,
  })

if (process.env.NODE_ENV !== "production") globalConPool.poolListaEspera = pool
