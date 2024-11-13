import sqlite3 from 'sqlite3';

// Define a fonte do banco de dados como 'db.sqlite'
const DBSOURCE = 'db.sqlite';

// SQL para apagar a tabela 'itens' se ela existir
const SQL_ITENS_DROP = `DROP TABLE IF EXISTS itens`;

// SQL para criar a tabela 'itens' com colunas 'id' e 'nome'
const SQL_ITENS_CREATE = `
    CREATE TABLE itens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT
    )`;

// Array de itens iniciais para inserir automaticamente no banco de dados
const itensIniciais = [
    { nome: 'Camiseta' },
    { nome: 'Tênis' },
    { nome: 'Bermuda' },
    { nome: 'Camisa Polo' },
    { nome: 'Boné' }
];

// Cria uma nova instância do banco de dados SQLite
const database = new sqlite3.Database(DBSOURCE, async (err) => {
    if (err) {
        // Se ocorrer um erro ao conectar ao banco de dados, exibe a mensagem de erro
        console.error(err.message);
        throw err;
    } else {
        // Se a conexão for bem-sucedida, exibe uma mensagem de sucesso
        console.log('Base de dados conectada com sucesso.');

        // Apaga a tabela 'itens' se ela existir, e depois a recria
        database.run(SQL_ITENS_DROP, () => {
            database.run(SQL_ITENS_CREATE, async (err) => {
                if (err) {
                    // Se ocorrer um erro ao criar a tabela, exibe a mensagem de erro
                    console.error('Erro ao criar tabela:', err.message);
                } else {
                    // Se a tabela for criada com sucesso, exibe uma mensagem de sucesso
                    console.log('Tabela itens criada com sucesso.');

                    // Insere os itens iniciais em ordem fixa
                    try {
                        for (const item of itensIniciais) {
                            await inserirItem(item.nome);
                            console.log(`Item '${item.nome}' inserido com sucesso.`);
                        }
                    } catch (error) {
                        // Se ocorrer um erro ao inserir os itens iniciais, exibe a mensagem de erro
                        console.error('Erro ao inserir itens iniciais:', error);
                    }
                }
            });
        });
    }
});

// Função que insere um item e retorna uma Promise
function inserirItem(nome: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const insertSQL = 'INSERT INTO itens (nome) VALUES (?)';
        database.run(insertSQL, [nome], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export default database;
