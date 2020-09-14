const request = require('supertest'),
    path = require('path')

process.env.NODE_ENV = 'test'
process.env.EnablePortal = ''

const app = require('reed-mock-server')
process.env.MockConfig = 'mock-server.json';

describe('HTTP server is working', () => {
    let server

    before(() => {
        server = app.startServer()
    })

    it('index page responds 200 ', done => {
        request(server)
            .get('/')
            .expect(200, done)
    })

    after(async () => {
        await server.close()
    })
})
