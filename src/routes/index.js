const { Router } = require('express');
const router = Router();


var IndexController = require('../controllers/index.controller');

router.get('/alumnos', IndexController.getAlumnos);
router.post('/alumno', IndexController.getAlumno);
router.put('/alumno/add', IndexController.create);
router.post('/alumno/update', IndexController.update);
router.post('/alumno/inscripcionesCursoActual', IndexController.getInscripcionesCursoActual);
router.post('/alumno/inscripcionesCursoAnteriores', IndexController.getInscripcionesCursoAnteriores);
router.post('/alumno/inscripcionesCarrera', IndexController.getInscripcionesCarrera);
router.post('/alumno/promedioAlumno', IndexController.getPromedioAlumnoPorCarrera);
router.get('/cursos', IndexController.getCursos);
router.post('/curso', IndexController.getCurso);
router.post('/cursosCarrera', IndexController.getCursosDeCarrera);
router.post('/cursos/detalleCurso', IndexController.getDetalleCurso);
router.put('/inscripcionCurso', IndexController.createInscripcionCurso);
router.get('/carreras', IndexController.getCarreras);
router.post('/carrera', IndexController.getCarrera);
router.put('/inscripcionCarrera/create', IndexController.createInscripcionCarrera);

module.exports = router;