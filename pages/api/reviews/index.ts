import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import type { Review,ResponseError } from "../../../interfaces";
import { reviews } from "../../../data/reviews";



export default async function handler(
    req: NextApiRequest,
    res:NextApiResponse
){

    const API_URL = "";

    if(req.method === 'GET'){
        try{

            return res.status(200).json(reviews)

        }catch(error){
            res.status(500)
            console.error(error)
        }
    }
    //route for post method
    if(req.method == 'POST'){

        try{

            //store necessary details
            const {name,description,location,profile_pic,ratings} = req.body
            console.log(req.body)
        
            //validate the inputs
            if(!name || !profile_pic || !description || !location || !ratings){
                res.status(400).json({message: "Missing required fields "})
            }

            const newReview = {
                id: Math.random,
                name:name,
                profile_pic:profile_pic,
                location:location,
                description:description,
                ratings:ratings
            }
            //using axios.post to append the newReview to existing reviews data and send to specified URL;
            const response = await axios.post(API_URL,{
                review : [...reviews, newReview]
            });

            //show different response according to the post status
            if(response.status === 201){

                res.status(201).json({message: "posted Successfully"});


            }
            //Creation error
            else{

                res.status(response.status).json({message: "failed to post the review"})
            
            }

        }//Connection error 
        catch(error){
            res.status(500).json({message: "Internal server error connecting to database "})

        }
    }else{
        res.status(401).json({message: "Wrong method call"})
    }
}