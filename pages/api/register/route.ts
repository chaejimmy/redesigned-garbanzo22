import bcrypt from 'bcrypt'
import prisma  from "../../../libs/prismadb"
import { NextApiRequest } from 'next'
import { NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    try{
        if(req.method === 'POST')
    {
        
            //accet the responses from request body by assinging variables to the body
        const {name, email, password} = req.body
        console.log(req.body)
    
        //check for the validity of the fields and return Missing fields message    
        if(!name || !email || !password){
            res.status(400).json({message: 'Missing required fields'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        //.toTimeString
        //storing the deatils in database in cordinance with the user Schema
        const user = await prisma.user.create({
            data:{
               name,
               email,
               hashedPassword
            }
        })
        console.log(user)
        //show successful reponse for code 201
        res.json(user)
        console.log(user)
       return NextResponse.json(user)
    }
    }catch(error){
        res.status(503).json({message: "Internal server error "})
    }
 
 
}
    //exapmple{
    //     "name": "zen",
    //     "email": "zenitsu@gmail.com",
    //     "password": "zenistu" 
    // }

