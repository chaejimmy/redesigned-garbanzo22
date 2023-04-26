import { Listing, Reservation } from "@prisma/client"
import { SafeUser } from "../pages/types"

export type Person = {

    id:string,
    name: string,
    height:string,
    mass:string,
    skin_color:string,
    hair_color:string,
    eye_color: string,
    gender: string

}

export type Hotel = {

    id:string,
    name:string,
    image: string,
    address:string,
    duration:string,
    rent:string, 
    status:string         
    
    // time:string, 
    // features:[],
    // // for partner deatils
    // compatible_gender:string,
    // compatible_age:string,
    // compatible_occupation: string,
    // compatible_pets:string
}

export type Booking = {

    id:string,
    name:string,
    image: string,
    address:string,
    duration:string,
    rent:string, 
    status:string         
    
    // time:string, 
    // features:[],
    // // for partner deatils
    // compatible_gender:string,
    // compatible_age:string,
    // compatible_occupation: string,
    // compatible_pets:string
}

export type Post = {

    id:string,
    name: string,
    profile_pic: string,
    location: string,
    description:string,
    occupation: string,
    interests:[],
    Language:[],
    year_joined: number,
    time:string;
    status:string;//data accepted as available or Finished
    photos: []
}
// {
    
//     "name": "Utkarsh",
//     "location": "New York",
//     "description": "Feeling better",
//     "occupation": "Lawyer",
//     "interests": ["Football","movies"],
//     "Language": ["English","Spanish"],
//     "year_joined": "2017",
//     "profile_pic": "2332"

// }
    
export type Review = {
    
    id:string,
    name: string,   
    profile_pic: string,
    location: string,
    description:string,  
    ratings:number,
    // apartment_posts  

}

export type Payment = {

    id:string,
    //sending profile to roommate
    profile: string,
    // payment_method: 
}

export type Bidding = {

    id: string,//for the bid identifier
    check_in: Date,
    check_out: Date,
    apartment_id: string,//for the apartment being bid
    bid_amount: number,
    bidder_name: string,
    
}

export type Help = {
    search: string,
    FAQs: string[],//most usual questions
    top_articles: string[] 
    explore: string[]// includes link to pages susch as community policies  and safety tips and guidelines
}

export type ResponseError = {
    message: string
}   

export type ListingCard = {
    
    data: Listing,
    reservation?: Reservation,
    onAction?:(id:string) => void,
    disabled?: boolean,
    actionLabel: string,
    actionId?:string,
    currentuser?:SafeUser | null

}


//Use this type to assign values accordingly to the Card with props recieved

