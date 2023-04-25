import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mi_base_de_datos",
    port: "3306"
})

// Abre la conexión
db.connect((error) => {
    if (error) {
        console.log(error)
    }
    console.log('Conexión a la base de datos establecida');
})