const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const appPages = ['about', 'example'];

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/:slug', (req, res) => {
      const { slug } = req.params;
      const pageIndex = appPages.indexOf(slug);
      const actualPage = pageIndex === -1 ? `/post` : `/${appPages[pageIndex]}`;

      const queryParams = { slug };
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
