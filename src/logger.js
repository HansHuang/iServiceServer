const logger = require('koa-logger')

module.exports = logger((str, args) => {
    console.log(str);
    // redirect koa logger to other output pipe
    // console.log(JSON.stringify(args, null, 2))    
});