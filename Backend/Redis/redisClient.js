const redis = require('redis');
const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379
});

client.connect()
client.on('connect', async () => {
    console.log('Connected to Redis...');
    try {
        // Flush all data
        const result = await client.flushAll();
        console.log('Redis cache cleared:', result);
    } catch (err) {
        console.error('Error clearing Redis cache:', err);
    } finally {
        // Disconnect the client
        // client.quit();
    }
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});



module.exports = client;
