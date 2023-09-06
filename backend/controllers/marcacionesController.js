const pool = require("../config/marcaciones");
const {MarcacionesModel} = require("../models/Marcaciones")

exports.obtenerMarcaciones = async (req, res) => {      
  let conn;
  try {
	conn = await pool.getConnection();
	//const rows1 = await conn.query("SELECT fecha_ingreso FROM tbl_marcacion where id_user='"+req.params.id+"' GROUP BY fecha_ingreso ORDER BY fecha_ingreso desc LIMIT 10");
	const rows = await conn.query("SELECT * FROM bd_marcaciones.tbl_marcacion where id_user='"+req.params.id+"' ORDER BY id_marcacion desc limit 10");
  //console.log(rows);
  res.send(rows);
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}

exports.buscarMarcaciones = async (req, res) => {    
  const {tipo, fecha_inicio, fecha_fin, usuario, plataforma} = req.body;
  let conn;
  let consulta
  try {
	conn = await pool.getConnection();
  if(tipo=='usuario'){
    consulta="SELECT TOKEN.DESCRIPTION AS nombre_usuario,TOKEN.plataforma AS txt_plataforma,tbl_marcacion.* FROM bd_marcaciones.tbl_marcacion INNER JOIN CORE.TOKEN ON USER_ID=id_user WHERE id_user='"+usuario+"' AND fecha_ingreso BETWEEN '"+fecha_inicio+"' AND '"+fecha_fin+"'";
  }
  else{
    consulta="SELECT TOKEN.DESCRIPTION AS nombre_usuario,TOKEN.plataforma AS txt_plataforma,tbl_marcacion.* FROM bd_marcaciones.tbl_marcacion INNER JOIN CORE.TOKEN ON USER_ID=id_user WHERE tbl_marcacion.plataforma='"+plataforma+"' AND fecha_ingreso BETWEEN '"+fecha_inicio+"' AND '"+fecha_fin+"'";
  }
  console.log(consulta);
	const rows = await conn.query(consulta);
	res.send(rows);
  console.log(req.body)
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}

exports.guardaMarcaciones = async (req, res) => {   
  
  const { id_user, fecha_ingreso, hora_ingreso, loc_ingreso, estado, ip_on, dispositivo_on, so_on, trabajo, plataforma, tiempo_ingreso, foto_ingreso } = req.body;
   let conn;
  try {
	conn = await pool.getConnection();
  const rows = await conn.query("INSERT INTO bd_marcaciones.tbl_marcacion (id_user, fecha_ingreso, hora_ingreso, loc_ingreso, estado, ip_on, dispositivo_on, so_on, trabajo, plataforma, tiempo_ingreso, foto_ingreso) VALUES ("+id_user+", '"+fecha_ingreso+"', '"+hora_ingreso+"', '"+loc_ingreso+"', "+estado+", '"+ip_on+"', '"+dispositivo_on+"', '"+so_on+"', '"+trabajo+"', "+plataforma+", '"+tiempo_ingreso+"', '"+foto_ingreso+"')");
  res.send(rows);
  
  } catch (err) {
	throw err;
  } finally {
	if (conn) res.send("ok"); return conn.end();
  }
 }

exports.salidaMarcaciones = async (req, res) => {    
  const { id_marcacion, fecha_salida, hora_salida, loc_salida, ip_off, dispositivo_off, so_off, tiempo_salida, foto_salida } = req.body;
  let conn;
  try {
  conn = await pool.getConnection();
  const rows = await conn.query("UPDATE bd_marcaciones.tbl_marcacion SET fecha_salida='"+fecha_salida+"', hora_salida='"+hora_salida+"', loc_salida='"+loc_salida+"', ip_off='"+ip_off+"', dispositivo_off='"+dispositivo_off+"', so_off='"+so_off+"', tiempo_salida='"+tiempo_salida+"', foto_salida='"+foto_salida+"' WHERE id_marcacion="+id_marcacion+"");
  //res.send(marcaciones);
  console.log(req.body)
  } catch (err) {
  throw err;
  } finally {
  if (conn) res.send("ok"); return conn.end();
  }
}

exports.obtenerUsuarios = async (req, res) => {   
  const { id, l6, l3 } = req.body;
  console.log(id, l6, l3)
  //console.log("yo")
  let conn;
  try {
	conn = await pool.getConnection();
  if ((l6=='0' && l3=='30') || l6=='8'){sql="SELECT USER_ID, DESCRIPTION  FROM CORE.TOKEN  ORDER BY DESCRIPTION"}
  else {sql="SELECT USER_ID, DESCRIPTION FROM CORE.TOKEN WHERE IDREL_SUPERVISOR="+id+" OR ID_JEFE_SUP="+id+" OR USER_ID="+id+" ORDER BY DESCRIPTION"}  
  const rows = await conn.query(sql);
  res.send(rows);
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}

exports.obtenerPlataformas = async (req, res) => {    
  const { id, l6, l3 } = req.body;  
  //console.log(id, l6, l3 )
  let conn;
  try {
	conn = await pool.getConnection();
  if ((l6==0 && l3==30) || l6==8){sql="SELECT L6_PLATAFORMA,PLATAFORMA   FROM CORE.TOKEN   GROUP BY PLATAFORMA  ORDER BY PLATAFORMA"}
  else {sql="SELECT L6_PLATAFORMA, PLATAFORMA FROM CORE.TOKEN WHERE IDREL_SUPERVISOR="+id+" OR ID_JEFE_SUP="+id+" OR USER_ID="+id+" GROUP BY PLATAFORMA  ORDER BY PLATAFORMA"}  
  const rows = await conn.query(sql);
	res.send(rows);
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}





