import { NextApiRequest, NextApiResponse } from "next";

//import data hotel_data
import { Hotel } from "../../../interfaces";
import { hotels } from "../../../data/hotel_data";


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Hotel[]>
)
{
    if(req.method === 'GET'){
        res.status(200).json(hotels)
    }
}
