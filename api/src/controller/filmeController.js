import { inserirFilme, ListarTodosOsFilmes, BuscaPorID, BuscaPorNome, alterarImagem, DeletarFilme, alterarFilme } from "../repository/filmeRepository.js";
import { Router } from "express";
import  multer  from "multer"
const server = Router();
const upload = multer({ dest : '/storage/capasFilmes'})

server.post('/filme', async (req, resp) =>{
    try{
        const novoFilme= req.body;
        const filmeIinserido= await inserirFilme(novoFilme);
        if(!novoFilme.nome)
    throw new Error("nome obrigatorio")
    if(!novoFilme.sinopse)
    throw new Error("sinopse obrigatoria")
    if(!novoFilme.avaliacao)
    throw new Error("avaliacao obrigatoria")
    if(!novoFilme.disponivel)
    throw new Error("disponibilidade obrigatoria")
    if(!novoFilme.lancamento)
    throw new Error("lancamento obrigatorio")
    if(!novoFilme.usuario)
    throw new Error("usuario obrigatorio")

        resp.send(filmeIinserido);

    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }

})
server.get('/filme', async (req, resp) => {
	try{
	const resposta = await ListarTodosOsFilmes();
	resp.send(resposta)
} catch(err){
	resp.status(400).send({
	    erro: err.message
    })}})


server.put('/filme/:id/imagem', upload.single('capa'), async (req, resp) => {
    try {
        const  {id } = req.params;
        const imagem = req.file.path;

        const resposta  = await alterarImagem(imagem, id);
        if(resposta != 1)
        throw new Error('imagmebhfwefwfb');
        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro : err.message
        })
    }
})    



    server.get('/filme/busca', async (req, resp) => {
        try{
        const {nome} = req.query
        const resposta = await BuscaPorNome(nome);
        if(!resposta)
        throw new Error('filme não encontrado')
        resp.send(resposta)
    } catch(err){
        resp.status(401).send({
        erro : err.message
    })}}
    )
    
    
server.get('/filme/:id', async (req, resp) => {
    try{
        const id = Number(req.params.id);
        const resposta = await BuscaPorID(id);
        if(!resposta)
        throw new Error('filme não encontrado')
        resp.send(resposta)
    } catch(err){
        resp.status(401).send({
        erro : err.message
    })}})
    export default server;
    

    server.delete('/filme/:id', async (req, resp) => {
        try{ 
            const { id } = req.params;
            const resposta = await DeletarFilme(id);
            if(resposta != 1) 
                throw new Error ('filme não pode ser removido')
            resp.status(204).send()
    } catch(err){
            resp.status(400).send({
                erro: err.message
        })}})

        


        server.put('/filme/:id', async (req, resp) => {
            try{ 
                const { id } = req.params;
                const filme = req.body;
                const resposta = await alterarFilme(id, filme);
                if(resposta != 1) 
                    throw new Error ('filme não pode ser removido')
                resp.status(204).send()
        } catch(err){
                resp.status(400).send({
                    erro: err.message
            })}})
       