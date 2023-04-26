import {getServerSession} from "next-auth/next"

import {authOptions} from "../api/auth/[...nextauth]"
import prisma from "../../libs/prismadb"

export async function getSession(){
    return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
    try{
    
    const session = await getSession();

        if(!session?.user?.email){
            
            // return null

            //for testing purpose
            return {
                user: null,
                isLoggedIn: false,
                id:"1"
            };
        }
        //await request for finding user using user's session email to search
        const currentUser = await prisma.user.findUnique({
            where : {
                email: session.user.email as string
            }
        })
        if(!currentUser){

            // return null;

            //for testing purpose
            return {
                user: null,
                isLoggedIn: false,
                id:"1"
            }
        }

        //START for testing purpose
        return {
            user: currentUser,
           
            
            isLoggedIn: true,
            id:"1"
            
        }//END for testing purpose

        // return{
        //     .    ..currentUser
        // }

    }catch(error:any){
        return null;
    }
}

//This implementation gets the current user in server session and user its emai to look in database for its existence