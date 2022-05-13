var express= require('express');
const async = require('hbs/lib/async');
var router=express.Router();
var novedadesModel=require('./../models/novedadesModels');
var cloudinary= require('cloudinary').v2;
var nodemailer= require('nodemailer');


router.get('/novedades', async function(req, res,next){
    let novedades= await novedadesModel.getNovedades();

    novedades=novedades.map(novedades=>{
        if (novedades.img_id){
            const imagen= cloudinary.url(novedades.img_id,{
                width:960,
                height:200,
                crop:'pad',

                
            });
            return{
                ...novedades,
                imagen
            }
        }else{
            return{
                ...novedades,
                imagen:''
            }
        }
    });
    res.json(novedades);
});

router.post('/contacto', async(req, res) =>{
    const mail={
        to:'griseldadelamata@gmail.com',
        subject:'Contacto web Gestoria Mata',
        html:`${req.body.nombre} se contacto a traves de la web, desea respuesta al email:${req.body.email}<br> Ademas, hizo el siguiente comentario:${req.body.mensaje}<br> Su telefono de contacto es:${req.body.telefono}`
    }
    const transport=nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
        }
    }); 
    // cierra trasnp
    await transport.sendMail(mail)

    res.status(201).json({
        error:false,
        message:'El mensaje ha sido enviado'
    });
});

module.exports=router;