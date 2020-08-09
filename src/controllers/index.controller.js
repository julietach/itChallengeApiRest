const Alumno = require('../models/alumno');
const Persona = require('../models/Persona');
const InscripcionesCurso = require('../models/inscripciones_curso');
const Curso = require('../models/curso');
const Docente = require('../models/docente');
const Carrera = require('../models/carrera');
const Sequelize = require('sequelize');
const InscripcionesCarrera = require('../models/inscripciones_carrera');
const Op = Sequelize.Op;
const { QueryTypes } = require('sequelize');

module.exports = {
    getAlumnos: async(req, res) => {
        try {
            let alumnos = await Alumno.findAll({
                order: [
                    ['identificador', 'ASC']
                ],
                include: [{ model: Persona, as: 'persona' }]
            });
            res.status(200).json(alumnos);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error al buscar alumnos",
                error: error
            });
        }

    },
    getAlumno: async(req, res) => {
        try {
            let alumno = await Alumno.findOne({
                where: { legajo: req.body.id },
                include: [{ model: Persona, as: 'persona' }]
            });
            res.status(200).json(alumno);
        } catch (error) {
            res.status(500).json({
                message: "Error al buscar alumno",
                error: error
            });
        }
    },
    create: async(req, res) => {
        try {
            let alumno = req.body.alumno;
            let maxIdPersona = await Persona.max('identificador') + 1;
            alumno.persona.identificador = maxIdPersona;
            await Persona.create(alumno.persona);
            let maxIdAlumno = await Alumno.max('identificador') + 1;
            alumno.identificador = maxIdAlumno;
            alumno.idpersona = maxIdPersona;
            await Alumno.create(alumno);
            res.status(200).json(alumno);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error al crear alumno",
                error: error
            });
        }
    },
    update: async(req, res) => {
        try {
            let alumno = req.body.alumno;
            await Persona.update(alumno.persona, { where: { identificador: alumno.persona.identificador } });
            await Alumno.update(alumno, { where: { identificador: alumno.identificador } });
            res.status(200).json(alumno);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error al crear alumno",
                error: error
            });
        }
    },
    getInscripcionesCursoActual: async(req, res) => {
        try {
            let inscripcion = await InscripcionesCurso.findAll({
                where: { estado: 'EN CURSO' },
                include: [{
                    model: Alumno,
                    as: 'alumno',
                    where: { legajo: req.body.id },
                    include: [{
                        model: Persona,
                        as: 'persona',
                    }]
                }, {
                    model: Curso,
                    as: 'curso',
                    include: [{
                        model: Carrera,
                        as: 'carrera',
                    }]
                }]
            });
            res.status(200).json(inscripcion);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error al buscar inscripciones",
                error: error
            });
        }
    },
    getInscripcionesCursoAnteriores: async(req, res) => {
        try {
            let inscripcion = await InscripcionesCurso.findAll({
                where: {
                    estado: {
                        [Op.ne]: 'EN CURSO'
                    }
                },
                include: [{
                    model: Alumno,
                    as: 'alumno',
                    where: { legajo: req.body.id },
                    include: [{
                        model: Persona,
                        as: 'persona',
                    }]
                }, {
                    model: Curso,
                    as: 'curso',
                    include: [{
                        model: Carrera,
                        as: 'carrera',
                    }]
                }]
            });
            res.status(200).json(inscripcion);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error al buscar inscripciones",
                error: error
            });
        }
    },
    getInscripcionesCarrera: async(req, res) => {
        try {
            let inscripcion = await InscripcionesCarrera.findAll({
                order: [
                    ['idcarrera', 'ASC']
                ],
                include: [{
                    model: Alumno,
                    as: 'alumno',
                    where: { legajo: req.body.id },
                    include: [{
                        model: Persona,
                        as: 'persona',
                    }]
                }, {
                    model: Carrera,
                    as: 'carrera'
                }]
            });
            res.status(200).json(inscripcion);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error al buscar inscripciones",
                error: error
            });
        }
    },
    getPromedioAlumnoPorCarrera: async(req, res) => {
        try {
            let promedio = await db.query("select ica.idcarrera, avg(ic.notafinal) from inscripciones_carrera ica " +
                "left join curso c on ica.idcarrera=c.idcarrera left join inscripciones_curso ic " +
                "on ic.idcurso= c.identificador and ica.idalumno=ic.idalumno " +
                "inner join alumno a on ica.idalumno=a.identificador " +
                "where a.legajo=" + req.body.id + " and (ic.estado='APROBADO' OR ic.estado is NULL) group by ica.idcarrera order by ica.idcarrera", { type: QueryTypes.SELECT });
            res.status(200).json(promedio);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error al buscar inscripciones",
                error: error
            });
        }
    },
    getCursos: async(req, res) => {
        try {
            let cursos = await Curso.findAll();
            res.status(200).json(cursos);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error al buscar inscripciones",
                error: error
            });
        }

    },
    getCurso: async(req, res) => {
        try {
            let curso = await Curso.findOne({
                where: { identificador: req.body.id },
                include: [{
                    model: Docente,
                    as: 'docente',
                    include: [{
                        model: Persona,
                        as: 'persona',
                    }]
                }, { model: Carrera, as: 'carrera' }]
            });
            res.status(200).json(curso);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error al buscar inscripciones",
                error: error
            });
        }

    },
    getCursosDeCarrera: async(req, res) => {
        try {
            let cursos = await Curso.findAll({
                where: { idcarrera: req.body.id }
            });
            res.status(200).json(cursos);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error al buscar inscripciones",
                error: error
            });
        }
    },
    getDetalleCurso: async(req, res) => {
        try {
            let inscripcion = await InscripcionesCurso.findAll({
                where: { idcurso: req.body.id },
                include: [{
                    model: Alumno,
                    as: 'alumno',
                    include: [{
                        model: Persona,
                        as: 'persona',
                    }]
                }]
            });
            res.status(200).json(inscripcion);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error al buscar inscripciones",
                error: error
            });
        }
    },
    createInscripcionCurso: async(req, res) => {
        try {
            let inscripcion = req.body.inscripcionCurso;
            inscripcion.idalumno = inscripcion.alumno.identificador;
            inscripcion.idcurso = inscripcion.curso.identificador;
            let cantInscriptos = await InscripcionesCurso.count({ where: { idcurso: inscripcion.idcurso, estado: 'EN CURSO' } });
            let estainscripto = await InscripcionesCurso.count({ where: { idcurso: inscripcion.curso.identificador, estado: 'EN CURSO', idalumno: inscripcion.idalumno } });
            if (estainscripto <= 0) {
                if (cantInscriptos < inscripcion.curso.cupomaximo) {
                    await InscripcionesCurso.create(inscripcion);
                    res.status(200).json(inscripcion);
                } else {
                    res.status(409).json("el curso ya alcanzo el cupo maximo");
                }
            } else {
                res.status(401).json("el alumno ya se encuentra inscripto al curso")
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error al buscar inscripciones",
                error: error
            });
        }
    },
    getCarreras: async(req, res) => {
        try {
            let carreras = await Carrera.findAll();
            res.status(200).json(carreras);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error al buscar carreras",
                error: error
            });
        }
    },
    getCarrera: async(req, res) => {
        try {
            let carrera = await Carrera.findOne({ where: { identificador: req.body.idcarrera } });
            res.status(200).json(carrera);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error al buscar carrera",
                error: error
            });
        }
    },
    createInscripcionCarrera: async(req, res) => {
        try {
            let inscripcion = req.body.inscripcionCarrera;
            inscripcion.idcarrera = inscripcion.carrera.identificador;
            inscripcion.idalumno = inscripcion.alumno.identificador;
            let estainscripto = InscripcionesCarrera.count({ where: { idcarrera: inscripcion.idcarrera, idalumno: inscripcion.idalumno } });
            if (estainscripto > 0) {
                res.status(409).json("el alumno ya esta inscripto en la carrera");
            } else {
                inscripcionCarrera = await InscripcionesCarrera.create(inscripcion);
                res.status(200).json(inscripcionCarrera);
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error al buscar carreras",
                error: error
            });
        }
    }
};