import { NextApiRequest, NextApiResponse } from "next";
import type { Help } from "../../../interfaces";
import { help_data } from "../../../data/help_data";

export default function handler(

    req:NextApiRequest,
    res:NextApiResponse<Help[]>,
    
){
    
    if(req.method === "GET"){
        res.status(200).json(help_data)
    }

}