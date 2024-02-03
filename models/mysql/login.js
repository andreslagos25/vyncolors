import mysql from "mysql2/promise"

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'Hqrt24',
    database: 'cosmeticos'
}

const connection = await mysql.createConnection(config)

export class ClientesLoginModel{
    static async login({ input }){
        const {
            CORREO_CLIENTE,
            PASSWORD_CLIENTE
        } = input
        try {
            const loginData = await connection.query(`
                SELECT 1 FROM CLIENTES WHERE CORREO_CLIENTE = ? AND PASSWORD_CLIENTE = SHA(?);
            `, [CORREO_CLIENTE, PASSWORD_CLIENTE]);
            if(loginData[0].length > 0 && loginData[0][0][1] === 1){
                return true;
            }else{
                return false;
            }
            
        } catch (error) {
            throw new Error(error);
        }
    }

    
}