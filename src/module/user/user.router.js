import { Router } from "express";
import { auth } from "../../middleware/auth.js";



const router = Router()




router.get('/', (req, res) => {
    res.status(200).json({ message: "User Module" })

})
export default router