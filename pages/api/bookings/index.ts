import { NextApiRequest, NextApiResponse } from "next";
import type { Booking } from "../../../interfaces";
import { hotels } from "../../../data/hotel_data";

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse<Booking[]>
){
    if(req.method === "GET"){
        
        //filter out hotels based on the status
        const bookings = hotels.filter((hotel)=> hotel.status === "Booked")

        res.status(200).json(bookings)
    }
}