const redisClient = require('../Redis/redisClient');
const Product = require('../Models/Product');

exports.syncViewCounts = async () => {
    try {
        const keys = await redisClient.keys('product:*:viewCount');
        for (const key of keys) {
            const count = await redisClient.get(key);
            const productId = key.split(':')[1];
            await Product.findByIdAndUpdate(productId, { $inc: { viewCount: parseInt(count) } });
            redisClient.del(key);
        }
    } catch (error) {
        console.error('Error syncing view counts:', error);
    }
};

// Sync every hour
setInterval(this.syncViewCounts, 5 * 60 * 60 * 1000);

exports.saveCountAndClearCache = async () => {
    try {
        const keys = await redisClient.keys('product:*:viewCount');
        for (const key of keys) {
            const count = await redisClient.get(key);
            const productId = key.split(':')[1];
            await Product.findByIdAndUpdate(productId, { $inc: { viewCount: parseInt(count) } });
            redisClient.del(key);
        }
        try {
            // Flush all data
            const result = await redisClient.flushAll();
            console.log('Redis cache cleared:', result);
        } catch (err) {
            console.error('Error clearing Redis cache:', err);
        } finally {
            // Disconnect the client
            // client.quit();
        }
    } catch (error) {
        console.error('Error syncing view counts:', error);
    }
};

