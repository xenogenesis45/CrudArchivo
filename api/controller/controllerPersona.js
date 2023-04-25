import { db } from "../connectDatabase.js";

export const getperson = (req, res, next) => {
    const q = "SELECT * FROM personas"
    try {
        db.query(q, (error, data) => {
            if (error) {
                return res.json(error)
            }
            console.log("Consulta traida, correctamente!", data)
            res.status(200).json(data)
        })
    } catch (error) {
        console.error(error);
    }
}

export const CreatePerson = (req, res) => {
    try {
        const { nombre, apellido } = req.body;
        const imagen = req.file.buffer;

        if (!imagen) {
            return res.status(400).json({ error: 'La imagen es requerida' });
        }

        // Aquí puedes hacer validaciones de los datos recibidos
        const base64Image = Buffer.from(imagen, 'base64');

        const q = "INSERT INTO personas( nombre, apellido, adjunto) VALUES (?)"

        const newPersona = [
            nombre,
            apellido,
            base64Image
        ]

        db.query(q, [newPersona], (error, data) => {
            if (error) return console.log(error);
            console.log("datos creado correctamente".data)
            return res.json(data);
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Hubo un error en el servidor' });
    }
}

