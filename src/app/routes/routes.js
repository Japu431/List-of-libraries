const db = require('../../../src/config/database')
const LivroDao = require('../../app/infra/livro-dao')

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send(
        `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                <h1>Olá mundo!!</h1>
                <p>Insira na url /livros</p>
            </body>
            </html>    
        `
        )
    })
    
    app.get('/livros', (req, res) => {
        const livroDao = new LivroDao(db);

        livroDao.lista().then(livros => res.marko(
            require('../views/livros/lista/lista.marko'),
            {
                livros: livros
            }
        )).catch(erro => console.log(`Erro!! : ${erro}!!`))

    })
    app.get('/livros/form', (req,res) => {
        res.marko(require('../../app/views/livros/lista/form/form.marko') , {livro : {} })
    })
    
    app.get('/livros/form/:id', function(req, res) {
        const id = req.params.id;
        const livroDao = new LivroDao(db);
    
        livroDao.buscaPorId(id)
            .then(livro => 
                res.marko(
                    require('../views/livros/lista/form/form.marko'),
                    { livro: livro }
                )
            )
            .catch(erro => console.log(erro));
    
    });

    app.post('/livros', (req, res) => {
        console.log(req.body);

        const livroDao = new LivroDao(db);

        livroDao.adiciona(req.body)
            .then(res.redirect('/livros'))
            .catch(erro => console.log(erro))

    });

    app.put('/livros', (req, res) => {
        console.log(req.body);

        const livroDao = new LivroDao(db);

        livroDao.atualiza(req.body)
            .then(res.redirect('/livros'))
            .catch(erro => console.log(erro))

    });

    app.delete('/livros/:id', (req,res) => {
        const id = req.params.id;

        const livroDao = new LivroDao(db);
        livroDao.remove(id)
        .then(() =>
            res.status(200).end())
        .catch(erro => console.log(erro))
    })
}