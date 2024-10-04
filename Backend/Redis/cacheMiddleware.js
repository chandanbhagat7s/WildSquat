const redisClient = require('./redisClient');
const generateCacheKey = (req) => {
    const baseUrl = req.originalUrl.split('?')[0];
    const queryString = JSON.stringify(req.query);  // Capture all query parameters
    return `${baseUrl}:${queryString}`;
};


const cacheMiddleware = async (req, res, next) => {
    try {
        const cacheKey = generateCacheKey(req);


        const cachedData = await redisClient.get(cacheKey);



        if (cachedData) {
            // Send cached data
            console.log("SENDED CACHEd");

            return res.status(200).send(JSON.parse(cachedData));
        }
        console.log("PASSED");
        req.cacheKey = cacheKey;


        next();  // Proceed if no cached data
    } catch (error) {
        console.error('Cache Error:', error);
        next();  // Proceed without cache if an error occurs
    }
};

module.exports = cacheMiddleware;