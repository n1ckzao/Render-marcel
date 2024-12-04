const { request, response } = require('express')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET')
    app.use(cors())
    next()
})

const cursosEscola = require('./modulo/lionSchool.js')

app.get('/v1/lion-school/alunos/filtro', cors(), async function(request, response) {
    const {sigla,sigla2, status, status2, anoConclusao} = request.query
    let dados

   if(status){
        dados = cursosEscola.getfiltroStatus(status)
        if (dados){
            return response.status(200).json(dados)
        }else{
            return response.status(404).json({'status': 404, 'message': 'Não foi encontrado nenhum aluno para retorno desse status'})
        }
    }
    if(sigla && status2){
        dados = cursosEscola.getfiltroCursoStatus(sigla,status2)
        if (dados){
            return response.status(200).json(dados)
        }else{
            return response.status(404).json({'status': 404, 'message': 'Não foi encontrado nenhum aluno para retorno desse curso ou status'})
        }
    }
    if(sigla && anoConclusao){
        dados = cursosEscola.getfiltroAnoConclusao(sigla, anoConclusao)
        if (dados){
            return response.status(200).json(dados)
        }else{
            return response.status(404).json({'status': 404, 'message': 'Não foi encontrado nenhum aluno para retorno desse curso ou ano'})
        }
    }
    return response.status(404).json({'status': 404, 'message': 'Não foi encontrado nenhum aluno tipo de dados para retorno'})
})

app.get('/v1/lion-school/cursos', cors(), async function(request, response){
    let dados = cursosEscola.getlistaCursos()
    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({ 'status': 404, 'message': 'Não foi encontrado nenhum curso para retorno'})
    }
})

app.get('/v1/lion-school/alunos', cors(), async function(request, response) {
    let dados = cursosEscola.getListaAlunos()

    if (dados) {
        response.status(200)
        response.json(dados)
    } else {
        response.status(404)
        response.json({ 'status': 404, 'message': 'Não foi encontrado nenhum aluno para retorno'})
    }
})

app.get('/v1/lion-school/alunos/:matricula', cors(), async function(request, response) {
    let lion = request.params.matricula
    let dados = cursosEscola.getnumeroMatricula(lion)

    if (dados) {
        response.status(200)
        response.json(dados)
    } else {
        response.status(404)
        response.json({ 'status': 404, 'message': 'Não foi encontrado nenhuma matricula para retorno'})
    }
})
app.get('/v1/lion-school/alunos/cursos/:sigla', cors(), async function(request, response) {
    let lion = request.params.sigla.toUpperCase()
    let dados = cursosEscola.getfiltroCurso(lion)

    if (dados) {
        response.status(200)
        response.json(dados)
    } else {
        response.status(404)
        response.json({ 'status': 404, 'message': 'Não foi encontrado nenhum curso para retorno do aluno'})
    }
})



app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições...')
})