import userModel from "../../../models/user.model";

const jwt = require("jsonwebtoken");

export default async (req, res) => {
    const { cookies } = req;
    const parseCookie= JSON.parse(cookies.mohallaMartJwt)
    console.log(parseCookie.token)
    if(parseCookie.token){        
        try{
            let {id,  email} = jwt.verify(parseCookie.token, "vdvhsvdsvcdcvsdvcvkc");
            let user = await userModel.findOne({_id: id, email});
            res.send({ack: true, user});
        }
        catch(e){
            let message = e.message
            res.send({ack: false, data : message });
        }
    }else{
        res.send("no cookie");
    }

}