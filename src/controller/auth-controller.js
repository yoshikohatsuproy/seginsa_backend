const bcrypt  = require('bcryptjs')

import { getConnections } from "../database/connections";
import { generarJWT } from "../helpers/jwt";


export const login = async (req, res) => {
  const pool = await getConnections();

  const { cor_usu, pas_usu } = req.body;

  pool.query(
    "call verificarCorreo(?)",
    [cor_usu],
    async function (error, results, fields) {
      const data = results[0];

      if (error) {
        return res.status(500).json({
          ok: false,
          msg: "Sucedió un error, comuníquese con el administrador",
        });
      }

      if (Object.entries(data).length === 0) {
        return res.status(500).json({
          ok: false,
          msg: "El correo no se encuentra en la base de datos",
        });
      }

      const id = data[0].id
      const id_rol = data[0].id_rol
      const activo = data[0].activo
      const password = data[0].pas_usu
      const nombre = data[0].nom_usu

      const token = await generarJWT(id, nombre, id_rol)
      
      console.log(password, pas_usu)
      const verificarPassword = bcrypt.compareSync( pas_usu, password)

 
      if (!verificarPassword){
        return res.status(500).json({
            ok: false,
            msg: "Las contraseñas no coincide",
          });
      }

      if (activo === 0){
        return res.status(500).json({
            ok: false,
            msg: "El usuario se encuentra bloqueado",
          });
      } 

      return res.status(201).json({
        ok: true,
        token,
        msg: "Bienvenido " + nombre
      });
    }
  );
};
