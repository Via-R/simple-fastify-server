import createError from 'http-errors'

export default async function routes(server, _options) {
  server.get('/', healthCheck)
  server.get('/news', getAllPosts)
  server.get('/news/:id', getPost)
  server.post('/news', createPost)
  server.put('/news/:id', updatePost)
  server.delete('/news/:id', deletePost)

  const defaultRows = {rows:[]}

  async function healthCheck(_request, _reply) {
    return {}
  }

  async function getAllPosts(_request, _reply) {
    const client = await server.pg.connect()
    const {rows} = await client.query('SELECT * FROM news') || defaultRows
    client.release()

    return rows
  }

  async function getPost(request, _reply) {
    const client = await server.pg.connect()
    const {rows: [row]} = await client.query(`SELECT * FROM news WHERE id=${request.params.id}`) || defaultRows
    client.release()

    if (!row){
      throw new createError(404, 'Post not found')
    }

    return row
  }

  async function createPost(request, _reply) {
    const client = await server.pg.connect()
    const newPost = request.body
    const {rows: [row]} = await client.query(
        `INSERT into news (title,description) VALUES('${newPost.title}','${newPost.description}') RETURNING *`
    )
    client.release()
    
    return row
  }

  async function updatePost(request, _reply) {
    const client = await server.pg.connect()
    const oldPostReq = await client.query(`SELECT * FROM news WHERE id=${request.params.id}`)
    const oldPost = oldPostReq.rows[0]
    const {rows: [row]} = await client.query(
        `UPDATE news SET(title,description) = ('${request.body.title}', '${request.body.description || oldPost.description}')
         WHERE id=${request.params.id} RETURNING *`
    ) || defaultRows
    client.release()
    
    return row
  }

  async function deletePost(request, _reply) {
    const client = await server.pg.connect()
    await client.query(`DELETE FROM news WHERE id=${request.params.id}`)
    client.release()

    return {}
  }
}