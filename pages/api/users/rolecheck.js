import { connect } from "../../../lib/dbConnect";
import userModel from "../../../models/user.model";

const jwt = require("jsonwebtoken");

export default async (req, res) => {
    const { cookies } = req;
    const parsedCookie = JSON.parse(cookies.mohallaMartJwt)
    if(!parsedCookie.token){
        return res.status(401).send("Unauthorised access");
    }
    try {
        await connect();
        const {id, email} = jwt.verify(parsedCookie.token, "vdvhsvdsvcdcvsdvcvkc");

        let loggedUser = await  userModel.findOne({_id: id ,email})
        if(!loggedUser){
            return res.send("Unauthorised access detected. Kindly Login!");
        }
        if(req.method==="GET"){   
            // console.log('looGGEEDDD USER',loggedUser)
            return res.send(loggedUser.role)
        }
    } catch (e) {
        console.error(e);
        res.status(500).send("lolllllLLLL");
    }
};

