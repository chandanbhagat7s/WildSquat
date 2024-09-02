




















const Tool = require("../Models/Tools");
const catchAsync = require("../utils/catchAsync");

exports.getNevigationListItems = catchAsync(async (req, res, next) => {
    const { gender } = req.params;

    let tool = await Tool.find({
        gender,
        $or: [
            { name: "CATEGORY" },
            { name: "X-MULTIPLE" },
            { name: "POSTER" }
        ]
    })
    let tool2 = await Tool.find({
        gender,
        $or: [
            { name: "CARDS" },
            { name: "Trending" },
        ]
    }).select("products name").populate([
        {
            path: "products",
            select: "_id name coverImage"
        }
    ])


    let category = []
    let poster = []
    let card = []
    let trend = []
    let multiple = []
    tool2.map((el) => {
        switch (el.name) {
            case "Trending":
                trend = el.products.slice(0, 10).map(item => {


                    let i = { id: item._id, name: item.name, img: item.coverImage }
                    return i
                })
                break;

            case "CARDS":
                card = el.products.slice(0, 10).map(item => {
                    let i = { id: item._id, name: item.name, img: item.coverImage }
                    return i
                })
                break;
            default:
                break;
        }
    })
    console.log(card);

    tool.map((el) => {
        switch (el.name) {
            case "CATEGORY":
                category.push({ id: el._id, name: el.label, img: el.coverImage })
                break;
            case "X-MULTIPLE":
                multiple.push({ id: el._id, name: el.label, img: el.coverImage })
                break;
            case "POSTER":
                poster.push({ id: el._id, name: el.label, img: el.coverImage })
                break;



            default:
                break;
        }
    })


    let categories = [
        {
            name: "Category",
            subItems: category,
        },

        {
            name: "Multiple",
            subItems: multiple,
        },
        {
            name: "Trending",
            subItems: trend,
        },
        {
            name: "Top Products",
            subItems: card,
        },
        {
            name: "Thinking",
            subItems: poster,
        },
    ];




    res.status(200).send({
        status: "success",
        categories
    })












})


















