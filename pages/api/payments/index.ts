

import { NextApiRequest, NextApiResponse } from "next";

import Razorpay from "razorpay";

const shortid  = require("shortid")

const RAZORPAY_KEY = ''
const RAZORPAY_SECRET = ''

export default async function handler(

    req:NextApiRequest, 
    res:NextApiResponse

){

    if(req.method === 'POST'){          
        //if request is POST then initialse a Razorpay object with key and secret credentials
        const razorpay = new Razorpay({

            key_id:RAZORPAY_KEY,
            key_secret: RAZORPAY_SECRET,

        })

        //Now set options for the object created
        const payment_capture = 1;
        const  {amount,currency} = req.body;

        const options = {

            amount: (amount*100).toString(),
            currency:currency,
            receipt: shortid.generate(),

        };

        //To Create Orders
        try{

            const response = await razorpay.orders.create(options);
            
            res.status(200).json({
                
                id:response.id,
                currency:response.currency,
                amount: response.amount
            })

        }catch(error){
            console.log(error); 
            res.status(400).json(error);    
        }


    }else{
        //We can display the list of payments made by a particular user id
        res.status(401).json({message: "Request method not supported"})
    }
}