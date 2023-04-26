import { NextApiRequest, NextApiResponse } from "next";
import type { Review, ResponseError } from "../../../interfaces";
import { reviews } from "../../../data/reviews";

//firstly validate the id requesting by user and find if its present in handler function

export default function handler(
    req:NextApiRequest,
    res: NextApiResponse<Review|ResponseError>
){
    const {query} = req
    const {id} = query

    console.log(req.body)
    const review = reviews.find((rev) => rev.id === id)

    //check vaildaty of request
    if(req.method === 'GET'){

        //check presence of id required
        return review ? res.status(200).json(review) : res.status(400).json({message: "review does not exist"})
    }
    
    //code for other methods
}
