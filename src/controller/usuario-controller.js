import { getConnections } from "../database/connections";
const bcrypt  = require('bcryptjs')


export const getUsuarios = async (req, res) => {
  const pool = await getConnections();
  pool.query("call sp_listarUsuarios()", function (error, results, fields) {
    if (error) {
      return res.status(500).json({
        ok: false,
        msg: "Sucedió un error, comuníquese con el administrador",
      });
    }

    return res.status(201).json({
      data: results[0],
      ok : true, 
    });
  });
};

export const getUsuarioById = async (req, res) => {
  const pool = await getConnections();
  const { id_usuario } = req.params;

  pool.query(
    "call sp_UsuarioById(?)",
    [id_usuario],
    function (error, results, fields) {
      if (error) {
        return res.status(500).json({
          ok: false,
          msg: "Sucedió un error, comuníquese con el administrador",
        });
      }

      return res.status(201).json({
        data: results[0],
        ok : true, 
      });
    }
  );
};


export const insertUsuario = async (req, res) => {
  const pool = await getConnections();

  const { nom_usu, ape_usu, cor_usu, pas_usu, tel_usu, id_tipo, idCreate } =
    req.body;



  pool.query(
    "call verificarCorreo(?)",
    [cor_usu],
    function (error, results, fields) {

      const salt = bcrypt.genSaltSync()
      const pass_cript = bcrypt.hashSync(pas_usu, salt)

      const data = results[0];
      if (error) {
        return res.status(500).json({
          ok: false,
          msg: "Sucedió un error, comuníquese con el administrador",
        });
      }

      if (Object.entries(data).length === 1) {
        return res.status(500).json({
          ok: false,
          msg: "El correo se encuentra en la base de datos",
        });
      }

      pool.query(
        "call sp_insertUsuario(?, ?, ?, ?, ?, ?, ?)",
        [nom_usu, ape_usu, cor_usu, pass_cript, tel_usu, id_tipo, idCreate],
        function (error, results, fields) {
          if (error) {
            return res.status(500).json({
              msg: "Sucedió un error, comuníquese con el administrador",
            });
          }

          return res.status(201).json({
            ok : true, 
            msg: "El usuario ha sido creado exitosamente",
          });
        }
      );
    }
  );
};

export const actualizarUsuario = async (req, res) => {
  const pool = await getConnections();
  const { id_usuario } = req.params;
  const { nom_usu, ape_usu, tel_usu, id_tipo, idUpdate } = req.body;

  pool.query(
    "call sp_actualizarUsuario(?, ?, ?, ?, ?, ?)",
    [nom_usu, ape_usu, tel_usu, id_tipo, idUpdate, id_usuario],
    function (error, results, fields) {
      if (error) {
        console.error(error)
        return res.status(500).json({
            ok : false,
          msg: "Sucedió un error, comuníquese con el administrador",
        });
      }

      return res.status(201).json({
        ok : true, 
        msg: "El usuario ha sido actualizado exitosamente",
      });
    }
  );
};

export const eliminarUsuario = async (req, res) => {
    const pool = await getConnections();
    const { id_usuario } = req.params;
    const {  idUpdate } = req.body;
  
    pool.query(
      "call sp_eliminarUsuario(?, ?)",
      [ idUpdate, id_usuario],
      function (error, results, fields) {
        if (error) {
            console.error(error)
          return res.status(500).json({
            ok : false,
            msg: "Sucedió un error, comuníquese con el administrador",
          });
        }
  
        return res.status(201).json({
          ok : true, 
          msg: "El usuario ha sido eliminado exitosamente",
        });
      }
    );
  };

  export const cambiarContrasenia = async (req, res) => {
    const pool = await getConnections();
    const { id_usuario } = req.params;
    const {  pas_usu, idUpdate } = req.body;

    const salt = bcrypt.genSaltSync()
    const pass_cript = bcrypt.hashSync(pas_usu, salt)

    pool.query(
      "call sp_cambiarContrasenia(?, ?, ?)",
      [ pass_cript, idUpdate, id_usuario],
      function (error, results, fields) {
        if (error) {
            console.error(error)
          return res.status(500).json({
            ok : false,
            msg: "Sucedió un error, comuníquese con el administrador",
          });
        }
  
        return res.status(201).json({
          ok : true, 
          msg: "La contrasenia ha sido actualizada exitosamente",
        });
      }
    );
  };