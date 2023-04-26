import { PrismaClient } from "@prisma/client";

//All below code implementation is to avoid multiple prisma clients by hot reload in prisma 
//And Is best practice to creates an instance
declare global{
    var prisma: PrismaClient | undefined
}
// use `prisma` in your application to read and write data in your DB

//Checking for the global prisma varibale or creating new instance of prismaClient
const client = globalThis.prisma || new PrismaClient
//if not in prod. mode 
if(process.env.NODE_ENV !== 'production') globalThis.prisma = client

export default client;
