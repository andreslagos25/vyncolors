import mysql from "mysql2/promise"

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'Hqrt24',
    database: 'cosmeticos'
}

const connection = await mysql.createConnection(config)

export class Productos{
    static async productos(){
        const productos = await connection.query(`
            SELECT NOMBRE_ARTICULO, PRECIO_ARTICULO, DESCRIPCION_ARTICULO FROM ARTICULOS LIMIT 6;
        `);
        return productos[0];
    }
}