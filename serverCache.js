const flatCache = require('flat-cache');

const cache = flatCache.load('my-cache');

// create flat cache routes
let flatCacheMiddleware = (req, res, next) => {
    console.log({cached_paths: cache.all()})

    let key = '__express__' + req.url

    let cacheContent = cache.getKey(key);
    if (cacheContent) {
        res.send(cacheContent);
    } else {
        res.sendResponse = res.send
        res.send = (body) => {
            cache.setKey(key, body);
            cache.save();
            res.sendResponse(body)
        }
        next()
    }
};

module.exports = flatCacheMiddleware
