import { Router } from "express";
import { createRol, showRol, showIdRol, updateRol, deleteRol } from "../controller/Rol.controller.js";
import rolScheme from '../schemes/Rol.schema.js';
import rolMiddleware from '../middleware/validate.middleware.js';
import verifyToken  from "../middleware/jwt.middleware.js";
import authorizeRole from "../middleware/rol.middleware.js";
import { checkBlacklist } from "../middleware/tokenBlacklist.js";

const router = Router();

router.post('/rol', verifyToken, checkBlacklist, authorizeRole("SuperAdmin", "Administrador"), createRol);
router.get('/rol', verifyToken, checkBlacklist, authorizeRole("SuperAdmin", "Administrador"), showRol);
router.get('/rol/:id', verifyToken, checkBlacklist, authorizeRole("SuperAdmin", "Administrador"), showIdRol);
router.put('/rol/:id', verifyToken, checkBlacklist, authorizeRole("SuperAdmin", "Administrador"), rolMiddleware(rolScheme.updateRol), updateRol);
router.delete('/rol/:id', verifyToken, checkBlacklist, authorizeRole("SuperAdmin", "Administrador"), deleteRol);

export default router;