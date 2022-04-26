var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();
var novedadesModel = require('./../../models/novedadesModels');

router.get('/', async (req, res, next)=> {
        var novedades = await novedadesModel.getNovedades();
        res.render('admin/novedades', {
                layout: 'admin/layout',
                usuario: req.session.nombre,
                novedades
        });
});

router.get('/agregar',async (req, res, next) => {
        res.render('admin/agregar', {
                layout: 'admin/layout',
        });
});

router.post('/agregar', async (req, res, next) => {
        try {
          if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") 
          {await novedadesModel.insertNovedad(req.body);
              res.redirect('/admin/novedades')
          } else {res.render('admin/agregar', {
              layout: 'admin/layout',
              error: true, 
              message: 'Todos los campos son requeridos'
              })
          }
        } catch (error) {
              console.log(error)
              res.render('admin/agregar', {
              layout: 'admin/layout',
              error: true, 
              message: 'No se cargo la novedad'
              })
        }
})

router.get('/eliminar/:id', async(req, res, next)=>{
        var id=req.params.id;
        await novedadesModel.deleteNovedadById(id);
        res.redirect('/admin/novedades')
});

router.get('/modificar/:id', async(req, res, next)=>{
        let id =req.params.id;
        let novedades=await novedadesModel.getNovedadById(id);
        res.render('admin/modificar', {
                layout: 'admin/layout',
                novedades
        });
});


router.post('/modificar', async (req, res, next) => {
        try {
          let obj={
              titulo:req.body.titulo,
              subtitulo:req.body.subtitulo,
              cuerpo: req.body.cuerpo,    
              }
              await novedadesModel.modificarNovedadById(obj, req.body.id);
              res.redirect('/admin/novedades');
         } catch (error) {
              console.log(error)
              res.render('admin/modificar', {
              layout: 'admin/layout',
              error: true, 
              message: 'No se modifico la novedad'
              })
        }
})


module.exports = router;