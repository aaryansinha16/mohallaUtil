
import { connect }  from "../../../lib/dbConnect";

import productsModel from "../../../models/product.model";


export default async (req, res) => {
    try {
        await connect();
        if(req.method==="GET"){
            let id = req.query.id;
            const products = await productsModel.find({_id: id})
            // console.log(products[0], "PRODUCTS")
            return res.send(products[0]);
        }else{
            return res.status(401).send("Operation not allowed");
        }
    } catch (e) {
        console.error(e);
        res.status(500).send(e.message);
    }
};

