import { Router } from "express";
import { createAsistencia, showAsistencia, showIdAsistencia, updateAsistencia, deleteAsistencia } from "../controller/Asistencia.controller.js";
import asistenciaScheme from '../schemes/Asistencia.schema.js';
import asistenciaMiddleware from '../middleware/validate.middleware.js';
import verifyToken  from "../middleware/jwt.middleware.js";
import authorizeRole from "../middleware/rol.middleware.js";
import { checkBlacklist } from "../middleware/tokenBlacklist.js";

const router = Router();

router.post("/asistencia", verifyToken, checkBlacklist, authorizeRole("SuperAdmin", "Administrador", "Empleado"), asistenciaMiddleware(asistenciaScheme.createAsistencia), createAsistencia);
router.get("/asistencia", verifyToken, checkBlacklist, authorizeRole("SuperAdmin", "Administrador"), showAsistencia);
router.get("/asistencia/:id", verifyToken, checkBlacklist, authorizeRole("SuperAdmin", "Administrador"), showIdAsistencia);
router.put("/asistencia/:id", verifyToken, checkBlacklist, authorizeRole("SuperAdmin", "Administrador"), asistenciaMiddleware(asistenciaScheme.updateAsistencia), updateAsistencia);
router.delete("/asistencia/:id", verifyToken, checkBlacklist, authorizeRole("SuperAdmin", "Administrador"), deleteAsistencia);

export default router;