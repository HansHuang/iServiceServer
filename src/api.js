const Router = require('koa-router'),
    Datastore = require('nedb'),
    db = new Datastore({ filename: '../data/db.json', autoload: true });


module.exports = ({ urlPrefix, options }) => {
    const router = new Router()
    urlPrefix && router.prefix(urlPrefix)

    router.get('/:name/:id?', get(db))
        //     .delete('/:name/:id?', require('./delete')(db))
        .all('/:name?', handleBadRequest)
    //     .post('/:name?', require('./create')(db))
    //     .put('/:name/:id?', require('./put')(db))
    //     .patch('/:name/:id?', require('./patch')(db))

    return router.routes()
}

async function get(db) {

    return async (ctx, next) => {
        let { name, id } = ctx.params

        ctx.body = { type: 'echo', name, id }
    }
}

async function handleBadRequest(ctx, next) {

    if (['POST', 'PUT', 'PATCH'].includes(ctx.method)) {
        let entity = ctx.request.body,
            entityType = typeof entity

        if (!entity || entityType != 'object' || !Object.getOwnPropertyNames(entity).length) {
            ctx.status = 400
            ctx.body = { error: 'bad request' }
            return
        }
    }

    return await next()
}
