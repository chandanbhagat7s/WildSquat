const Tool = require("../Models/Tools");
const createCache = require("../Redis/createCache");
const Apifeature = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const redisClient = require("../Redis/redisClient")

exports.getNevigationListItems = catchAsync(async (req, res, next) => {
    const { gender } = req.params;

    let tool = await Tool.find({
        gender,
        $or: [
            { name: "CATEGORY" },
            { name: "POSTER" }
        ]
    }).select("label _id name")

    let tool2 = await Tool.find({
        gender,
        $or: [
            { name: "Trending" },
        ]
    }).select("products name").populate([
        {
            path: "products",
            select: "_id name "
        }
    ])



    const categoryMapping = {
        "CATEGORY": "category",
        "POSTER": "poster",
        "Trending": "trend",
    };

    // Initialize all categories in a single object
    let subItemsMap = {
        category: [],
        multiple: [],
        poster: [],
        trend: [],
        card: []
    };

    // Utility function to create sub-item object
    const createSubItem = (id, name) => ({ id, name });

    // Combine both tool arrays into one for easier processing
    const allTools = [...tool, ...tool2];

    allTools.forEach((el) => {
        // Check if the name is in the categoryMapping
        const key = categoryMapping[el.name];

        // If it's a valid key, add the items to the appropriate array in subItemsMap
        if (key) {
            if (el.products) {
                // For `Trending` and `CARDS` with products array
                subItemsMap[key].push(
                    ...el.products.map(item => createSubItem(item._id, item.name))
                );
            } else {
                // For `CATEGORY`, `X-MULTIPLE`, `POSTER`
                subItemsMap[key].push(createSubItem(el._id, el.label));
            }
        }
    });

    // Map subItemsMap to categories array with proper naming
    let categories = [
        {
            name: "Category",
            subItems: subItemsMap.category,
        },
        {
            name: "Multiple",
            subItems: subItemsMap.multiple,
        },
        {
            name: "Trending",
            subItems: subItemsMap.trend,
        },
        {
            name: "Top Products",
            subItems: subItemsMap.card,
        },
        {
            name: "Thinking",
            subItems: subItemsMap.poster,
        },
    ];






    res.status(200).send({
        status: "success",
        categories
    })












})
exports.getToolById = catchAsync(async (req, res, next) => {
    const toolId = req.params.toolId;




    const features = new Apifeature(Tool.find({ _id: toolId }), req.query).populate().filter().sort().fields().pagination();


    const products = await features.query;


    await createCache(req, {
        status: "success",
        products: products[0]?.products
    })


    res.status(200).send({
        status: "success",
        products: products[0]?.products
    })
})

exports.getToolByIdForMange = catchAsync(async (req, res, next) => {
    const toolId = req.params.toolId;
    const features = new Apifeature(Tool.find({ _id: toolId }), req.query).populate().filter().sort().fields().pagination();



    const products = await features.query;
    console.log(products);
    res.status(200).send({
        status: "success",
        products: products[0]
    })
})



exports.getTools = catchAsync(async (req, res, next) => {
    // Assuming req.params.tool is a comma-separated string like "POSTER,CATEGORY"
    const toolParam = req.params.tool;

    // Split the string into an array of values
    const toolArray = toolParam.split(','); // ["POSTER", "CATEGORY"]

    // Use the array in the query with the $in operator
    const features = new Apifeature(
        Tool.find({ name: { $in: toolArray } }),
        req.query
    )
        .populate() // Populate if needed
        .filter()   // Apply additional filters from query params
        .sort()     // Apply sorting
        .fields()   // Select specific fields
        .pagination(); // Apply pagination


    const products = await features.query;

    await createCache(req, {
        status: "success",
        products: products
    })


    res.status(200).send({
        status: "success",
        products: products
    })




})


exports.rearrangeProducts = catchAsync(async (req, res, next) => {


    const { newProductOrder } = req.body;
    const docid = req.params.docid;

    // Update the products array in the tool document
    const updatedTool = await Tool.findByIdAndUpdate(
        docid,
        { products: newProductOrder },
        { new: true }
    )

    res.status(200).send({
        status: "success",

    })
})












