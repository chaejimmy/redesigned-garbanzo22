import { NextApiRequest,NextApiResponse } from "next";
import axios from "axios";
//import file system and path features fromm node
import * as fs from "fs"
import path from "path";
import { post } from "../../../data/posts";

const API_URL = "mongodb://utkarshdev83:<utkarsh_07>@ac-khixnvr-shard-00-00.mmh7usl.mongodb.net:27017,ac-khixnvr-shard-00-01.mmh7usl.mongodb.net:27017,ac-khixnvr-shard-00-02.mmh7usl.mongodb.net:27017/?ssl=true&replicaSet=atlas-7nj9l0-shard-0&authSource=admin&retryWrites=true&w=majority"

export default async function handler(  
    req:NextApiRequest, 
    res: NextApiResponse
){
   if(req.method === 'POST')
   {
    try{
        //accept the responses from request body by assinging variables to the body
    const {name,profile_pic,location,description,occupation,interests,Language,year_joined} = req.body
    console.log(req.body)

    //check for the validity of the fields and return Missing fields message    
    if(!name || !profile_pic || !location || !description || !occupation || !interests || !Language || !year_joined){
        res.status(400).json({message: 'Missing required fields'})
    }
    const date = new Date()
    //.toTimeString
    //storing the deatils in database 
    const newPost = {

        id:  Math.random(),
        name : name,
        profile_pic : profile_pic,
        location : location,
        description : description,
        occupation : occupation,
        interests : interests,
        Language : Language,
        year_joined :year_joined,
        time: date.getTime(),
        status: 'available', 
        photos: [] 
 
    }

    console.log(newPost)
    const response = await axios.post( API_URL, {

        post: [...post, newPost]
    
    });
    //show successful reponse for code 201
    if(response.status === 201){

        res.status(201).json({message: "posted Successfully"});
    
    }else{
        
        res.status(response.status).json({message: "Failed to create the post"})
    
    }
    //We can store this newPost object in database

    }
    catch(error){
        res.status(500).json({message: "Internal server error "})
    }

   }

   else if(req.method === 'GET') {return res.status(200).json({post})}

   else res.status(405).json({message: "Method not allowed"})

}
