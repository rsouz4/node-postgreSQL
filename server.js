
import { fastify } from 'fastify'
//import { dataBaseMemory } from './databasememory.js';
import { dataBasePostgres } from './database-postgres.js';


const server = fastify();
//const database = new dataBaseMemory();
const database = new dataBasePostgres();

server.post('/videos', async (req, res) => {
    const { title, description, duration } = req.body;

    await database.create({
        title,
        description,
        duration
    })

    //CRIOU
    return res.status(201).send();


});
server.get('/videos', async (req) => {
    const search = req.query.search

    console.log(search);

    const videos = await database.list(search);

    return videos

});


server.put('/videos/:id', async (req, res) => {

    //acessa os params depois do : na url
    const videoId = req.params.id;
    const { title, description, duration } = req.body;

    await database.update(videoId, {
        title,
        description,
        duration
    });

    //retorna resposta vazia
    return res.status(204).send()


});

server.delete('/videos/:id', (req, res) => {
    const videoId = req.params.id;


    database.delete(videoId);

    return videoId;
});

server.listen({

    port: 3333
});
