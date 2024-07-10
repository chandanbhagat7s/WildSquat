const Apifeature = require("./apiFeatures")
const appError = require("./appError")
const catchAsync = require("./catchAsync")


exports.createOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.create({
        ...req.body
    })
    if (!doc) {

        return next(new appError('failed to create doc please try again to create !!', 404))
    }


    res.status(201).json({
        status: 'success',
        data: doc
    })
})


exports.getAll = Model => catchAsync(async (req, res, next) => {

    let features = new Apifeature(Model.find(), req.query).filter().sort().fields().pagination()

    let doc = await features.query;

    if (!doc) {
        return next(new appError('failed to get all the Doc !!', 404))
    }

    res.status(200).json({
        status: 'success',
        totalResult: doc.length,
        data: doc
    })
})

exports.getAllByFilterOut = (Model) => catchAsync(async (req, res, next) => {

    const ofProduct = req.params.reviewId;
    let features = new Apifeature(Model.find({
        ofProduct
    }), req.query).filter().sort().fields().pagination()

    let doc = await features.query;

    if (!doc) {
        return next(new appError('failed to get all the Doc !!', 404))
    }

    res.status(200).json({
        status: 'success',
        totalResult: doc.length,
        data: doc
    })
})


exports.getOne = Model => catchAsync(async (req, res, next) => {

    const doc = await Model.findById(req.params.id)
    console.log(doc);

    if (!doc) {
        console.log("entred");
        return next(new appError('unable to find documnet  ', 404))
    }
    res.status(200).json({
        status: 'success',
        data: doc
    })


})


exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id)


    res.status(200).json({
        status: 'success',
        data: null
    })
})


exports.updateOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, {
        ...req.body
    }, {
        runValidators: true,
        new: true
    })


    res.status(200).json({
        status: 'success',
        data: doc
    })
})













