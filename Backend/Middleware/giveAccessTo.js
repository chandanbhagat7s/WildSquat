const appError = require("../utils/appError");


function giveAccess(...roles) {
    return (req, res, next) => {
        const user = req.user;
        // console.log(user);
        // console.log(req.userE);

        if (!roles.includes(user.role)) {
            return next(new appError("you are not authorize for this route", 401))
        }


        next();
    }
}


module.exports = giveAccess;















