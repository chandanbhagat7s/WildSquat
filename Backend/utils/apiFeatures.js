

class Apifeature {
    constructor(query, queryStr) {
        console.log("query string", queryStr);

        this.query = query;
        this.queryStr = queryStr;
    }

    filter() {
        // console.log(this.queryStr);
        const reqObj = { ...this.queryStr };
        const remove = ['page', 'limit', 'sort', 'fields']
        remove.forEach(el => {
            delete reqObj[el]
        })

        //advance filtering 
        let q = JSON.stringify(reqObj);
        q = q.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)


        this.query = this.query.find(JSON.parse(q));
        return this;
    }

    sort() {
        if (this.queryStr.sort) {

            let str = this.queryStr.sort.split(',').join(" ");
            console.log("came", str);
            this.query = this.query.sort(str)
        }
        return this;
    }

    fields() {
        if (this.queryStr.fields) {
            console.log(this.queryStr.fields);


            let str = this.queryStr.fields.split(',').join(" ");
            this.query = this.query.select(str);
        }
        return this;

    }

    pagination() {

        if (this.queryStr.page) {


            let page = this.queryStr.page * 1 || 1;
            let limit = this.queryStr.limit * 1 || 5;
            let skip = (page - 1) * limit
            this.query = this.query.skip(skip).limit(limit)
        }
        return this;
    }





}



module.exports = Apifeature;






















