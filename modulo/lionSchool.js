/**************************************************************************************************************************
* Objetivo: Atividade final de back-end
* Data:04/12/2024
* Autor: Nicolas
* Versão: 1.0
***************************************************************************************************************************/

var apiAlunos = require('./alunos.js')
var apiCursos = require('./cursos.js')

const getlistaCursos = function(){
    let cursosEscola = apiCursos.cursos
    let informacoesCurso = cursosEscola.map(function(item){
        return {
            nome: item.nome,
            sigla: item.sigla,
            icone: item.icone,
            carga: item.carga
        }
    })
    return informacoesCurso
}

const getListaAlunos = function() {
    let alunosEscola = apiAlunos.alunos
    let informacoesAlunos = alunosEscola.map(function(item) {
        return {
            foto: item.foto,
            nome: item.nome,
            matricula: item.matricula,
            sexo: item.sexo
        }
    })
    return informacoesAlunos
}


const getnumeroMatricula = function(retornarApi){
    let alunoEncontrado = null
    let alunosMatriculados = apiAlunos.alunos

    alunosMatriculados.forEach(function(item){
        if (item.matricula == retornarApi){
            alunoEncontrado = {
                foto: item.foto,
                nome: item.nome,
                matricula: item.matricula,
                sexo: item.sexo
            }
        }
    })
    return alunoEncontrado || false
}

const getfiltroCurso = function(retornarApi){
    let alunosEncontrados = apiAlunos.alunos
    let alunosFiltrados = []

    alunosEncontrados.forEach(function(item){
        item.curso.forEach(function(curso){
            if (curso.sigla == retornarApi){
                alunosFiltrados.push({
                    foto: item.foto,
                    nome: item.nome,
                    matricula: item.matricula,
                    sexo: item.sexo
                })
            }
        })
    })
    return alunosFiltrados
}

const getfiltroStatus = function(statusEspecificado){
    let alunosEncontrados = apiAlunos.alunos
    let alunosFiltrados = []

    alunosEncontrados.forEach(function(item){
        if (item.status == statusEspecificado){
            alunosFiltrados.push({
                foto: item.foto,
                nome: item.nome,
                matricula: item.matricula,
                sexo: item.sexo
            })
        }
    })
    return alunosFiltrados
}

const getfiltroCursoStatus = function(siglaCurso, statusDisciplina){
    let alunosEncontrados = apiAlunos.alunos
    let alunosFiltrados = []

    alunosEncontrados.forEach(function(aluno){
        aluno.curso.forEach(function(curso){
            if (curso.sigla == siglaCurso) {
                curso.disciplinas.forEach(function(disciplina){
                    if (disciplina.status == statusDisciplina){
                        alunosFiltrados.push({
                            foto: aluno.foto,
                            nome: aluno.nome,
                            matricula: aluno.matricula,
                            sexo: aluno.sexo
                        })
                    }
                })
            }
        })
    })
    return alunosFiltrados
}

const getfiltroAnoConclusao = function(siglaCurso, anoConclusao){
    let alunosEncontrados = apiAlunos.alunos
    let alunosFiltrados = []

    alunosEncontrados.forEach(function(aluno) {
        aluno.curso.forEach(function(curso) {
            if (curso.sigla == siglaCurso && curso.conclusao == anoConclusao){
                alunosFiltrados.push({
                    foto: aluno.foto,
                    nome: aluno.nome,
                    matricula: aluno.matricula,
                    sexo: aluno.sexo
                })
            }
        })
    })
    return alunosFiltrados
}

//console.log(getlistaCursos())
//console.log(getListaAlunos())
//console.log(getnumeroMatricula("20151001001"))
//console.log(getfiltroCurso('RDS'))
//console.log(getfiltroStatus('Cursando'))
//console.log(getfiltroCursoStatus("RDS", "Aprovado"))
//console.log(getfiltroAnoConclusao("RDS", "2023"));

module.exports = {
    getlistaCursos,
    getListaAlunos,
    getnumeroMatricula,
    getfiltroCurso,
    getfiltroStatus,
    getfiltroCursoStatus,
    getfiltroAnoConclusao
}