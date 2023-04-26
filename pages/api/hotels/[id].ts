import { NextApiRequest, NextApiResponse } from "next";
import type { Hotel,ResponseError } from "../../../interfaces";
import { hotels } from "../../../data/hotel_data";

export default function hotelHandler(
    req:NextApiRequest,
    res: NextApiResponse<Hotel | ResponseError>
){

    const { query } = req
    console.log( query )
    const { id } = query;
    const hotel = hotels.find((h) => h.id === id)

    //if the hotel exists
    if(req.method === 'GET'){
        return hotel? res.status(200).json(hotel): res.status(400).json({message: `Hotel with id ${id} not found`})
    }
    return res.status(200).json({message: "Wrong method call"})
}