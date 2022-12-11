
import { connect }  from "../../../../lib/dbConnect";

import productsModel from "../../../../models/product.model";

export default async (req, res) => {
    let {title} = req.query;
    try {
        await connect();
        if(req.method==="GET"){
           let products = await productsModel.find({ "title" : { "$regex": title , "$options": "i" } },);
           
           res.send(products)
        }else{
            return res.status(401).send("Operation not allowed");
        }
    } catch (e) {
        console.error(e);
        res.status(500).send(e.message);
    }
};

