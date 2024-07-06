const appError = require("../utils/appError");


function giveAccess(...roles) {
    return (req, res, next) => {
        const user = req.userE;
        console.log(req.userE);

        if (!roles.includes(user.role)) {
            return next(new appError("you are not authorize for this route", 403))
        }


        next();
    }
}


module.exports = giveAccess;















