const redisClient = require('../Redis/redisClient');
const Product = require('../Models/Product');

const syncViewCounts = async () => {
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
setInterval(syncViewCounts, 5 * 60 * 60 * 1000);

module.exports = syncViewCounts;
