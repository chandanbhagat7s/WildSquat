const app = require('./app.js');
// const http = require("http") 

const PORT = process.env.PORT || 3000;


// var httpServer = http.createServer(app);
const server = app.listen(PORT, () => {
    console.log("server up and running : ", PORT);
});



process.on("unhandledRejection", (err) => {
    console.log(err?.name, err?.message, e);
    console.log("UNHANDLED REDECTION");
    server.close(() => {

        process.exit(0)
    })

})



