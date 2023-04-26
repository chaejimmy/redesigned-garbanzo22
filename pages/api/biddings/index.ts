import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import type { Bidding } from "../../../interfaces";
import { biddings } from "../../../data/bidding";


const API_URL = ''
export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){

    if(req.method === 'POST'){
        try{
            const {apartment_id,check_in, check_out, bid_amount,bidder_name} = req.body
            
            if( !check_in|| !check_out|| !apartment_id|| !bidder_name || !bid_amount){
                
                res.status(400).json({message: "Missing required fields"})

            }
            
            const newBid = {
                id: Math.random(),
                apartment_id: apartment_id,
                check_in: check_in,
                check_out,
                bid_amount: bid_amount,     
                bidder_name : bidder_name
            }
            //checking the response returned object
            console.log(newBid)
            const response = await axios.post( API_URL,{
                    bidding: [...biddings, newBid]
            });  

            
            if(response.status === 201){
                res.status(201).json({message: "Bid placed successfully"})
            }
                else{
                    res.status(response.status).json({message: `Failed to Place the bid on Apartment_ID: ${apartment_id}`})
            }



        }//Connection Error
        catch(error){
            res.status(401).json({message: "Internal Error Connecting to database "})
        }
    }else{
        res.status(401).json({message: "Request not handled"})
    }

}