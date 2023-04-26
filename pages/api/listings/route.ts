import { NextResponse} from 'next/server'
import prisma from '../../../libs/prismadb'
import { NextApiRequest } from 'next'
import { NextApiResponse } from 'next'
import getCurrentUser from '../../actions/getCurrentUser'
//get current user
import getListings from '../../actions/getListings'

async function handler(
  
  req: NextApiRequest,
  res: NextApiResponse

){

  if (req.method === 'GET') {
    try {
      const data = await getListings();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  if(req.method === 'POST'){

    const { title, description, price,imageSrc,category,roomCount,bathroomCount,guestCount,locationValue } =  req.body
    
    //get current user  
    let currentUser = await getCurrentUser()

    //reponse for if currentuser is null
    if(!currentUser){ 
      console.log("User doesnot exist")
      // return NextResponse.error

      //for testing purpose
      currentUser = {
        user: null, isLoggedIn: false, id: "644163c1644fd5a743d07f8c"
       
      }
    }

  //check for missing values according to listing schema

  if(!title || !description || !price || !imageSrc || !category || !roomCount || !bathroomCount || !guestCount || !locationValue || !price){
      // res.status(403).json({message: "missing required values"})
      NextResponse.error
  }

    const listing = await prisma.listing.create({

      data: {
        
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue,
        price: parseInt(price,10),
        userId: currentUser?.id

      },
    })  

    console.log("listing created: ", listing)

    res.status(201).json({ listing })

  }

  //Get method to get listings from action getListing.ts

  

}

export default handler;


//example test run
// {
//   "title": "Villa",
//   "description": "my description",
//   "imageSrc": "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
//   "category": "villa",
//   "roomCount": 3,
//   "bathroomCount": 2,
//   "guestCount": 4,
//   "locationValue": "HA",
//   "price": 500

// }

