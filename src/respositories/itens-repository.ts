import Item from '../models/item'
import database from './database'

const itensRepository = {
    criar: (item: Item, callback: (id?: number) => void) => {
        const sql = 'INSERT INTO itens (nome, descricao) VALUES (?, ?)'
        const params = [item.nome]
        database.run(sql, params, function(_err) {
            callback(this?.lastID)
        })
    },

    lerTodos: (callback: (itens: Item[]) => void) => {
        const sql = 'SELECT * FROM itens'
        const params: any[] = []
        database.all(sql, params, (_err, rows) => {
            callback(rows as Item[]) // Realiza a conversão para Item[]
        })
    },

    ler: (id: number, callback: (item?: Item) => void) => {
        const sql = 'SELECT * FROM itens WHERE id = ?'
        const params = [id]
        database.get(sql, params, (_err, row) => {
            callback(row as Item | undefined) // Converte row para Item ou undefined
        })
    },

    atualizar: (id: number, item: Item, callback: (notFound: boolean) => void) => {
        const sql = 'UPDATE itens SET nome = ?, descricao = ? WHERE id = ?'
        const params = [item.nome, id]
        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })
    },

    apagar: (id: number, callback: (notFound: boolean) => void) => {
        const sql = 'DELETE FROM itens WHERE id = ?'
        const params = [id]
        database.run(sql, params, function(_err) {
            callback(this.changes === 0)
        })
    }
}

export default itensRepository