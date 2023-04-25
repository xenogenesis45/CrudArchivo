import Express from "express";
import { getperson, CreatePerson } from "../controller/controllerPersona.js";
import multer from 'multer';

const router = Express.Router();
const upload = multer();

router.get("/test", (req, res) => {
    res.send("HOLA")
})

// Rutas para personas
router.get('/', getperson);
// router.post('/', CreatePerson);
router.post('/', upload.single('adjunto'), CreatePerson);


export default router;