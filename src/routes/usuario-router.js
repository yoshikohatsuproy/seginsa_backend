import { Router } from "express";
import {
  getUsuarios,
  getUsuarioById,
  insertUsuario,
  actualizarUsuario,
  eliminarUsuario,
  cambiarContrasenia,
} from "../controller/usuario-controller";

import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";

const router = Router();

router.get("/api/usuarios", getUsuarios);
router.get("/api/usuario/:id_usuario", getUsuarioById);
router.post("/api/usuario", insertUsuario);

router.put("/api/usuario/:id_usuario", actualizarUsuario);
router.put("/api/usuario/delete/:id_usuario", eliminarUsuario);

router.put(
  "/api/usuario/cambiarcontra/:id_usuario",
  [
    check("pas_usu", "La contraseña es obligatoria").not().isEmpty(),
    check("pas_usu", "La contraseña no es correcta").isLength({ min: 8 }),
    validarCampos,
  ],
  cambiarContrasenia
);

export default router;
