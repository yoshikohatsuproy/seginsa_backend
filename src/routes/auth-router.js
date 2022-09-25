import { Router } from "express";
import { login } from "../controller/auth-controller";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";

const router = Router();

router.post(
  "/api/auth",
  [
    check("cor_usu", "El correo es obligatorio").not().isEmpty(),
    check("pas_usu", "La contraseña es obligatoria").not().isEmpty(),
    check("pas_usu", "La contraseña no es correcta").isLength({ min: 8 }),
    validarCampos,
  ],
  login
);

export default router;
