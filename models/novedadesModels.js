const async = require('hbs/lib/async');
var pool=require('./bd'); //llamado a base de datos

//listar novedades
async function getNovedades(){
        var query='select * from novedades order by id desc';
        var rows=await pool.query(query);
        return rows;
          }

//insert novedades
async function insertNovedad(obj){
    try{
        var query='insert into novedades set ?';
        var rows=await pool.query(query,[obj]);
        return rows;

    }catch(error){
        console.log(error);
    }
}
//delete novedades
async function deleteNovedadById(id) {
    var query='delete from novedades where id=?';
    var rows=await pool.query(query, [id]);
    return rows;
};
//obtener novedades by id
async function getNovedadById(id) {
    var query='select * from novedades where id=?';
    var rows=await pool.query(query, [id]);
    return rows[0];
};

//modificar novedades by id
async function modificarNovedadById(obj,id){
    try{
        var query='update novedades set ? where id=?';
        var rows=await pool.query(query,[obj,id]);
        return rows;

    }catch(error){
        throw error;
    }
}
          
module.exports={getNovedades, insertNovedad, deleteNovedadById, getNovedadById, modificarNovedadById }
;