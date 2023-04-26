import prisma from "../../libs/prismadb"

export default async function getListings() {
    //Use a try and catch block to list
    try{

        //get all listings 
        const listings  = await prisma.listing.findMany({
            orderBy:{
                createdAt:"desc"
            }
        })

        return listings

    }catch(error:any){
        throw new Error(error)
    }
}

//This function cant be used in client side components as it involves using prisma whihc cant perform in client side rendering