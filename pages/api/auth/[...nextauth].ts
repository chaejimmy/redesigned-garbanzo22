import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import bcrypt from 'bcrypt'
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from 'next-auth/providers/credentials'

import prisma from "../../../libs/prismadb";
//export prisma or client from prismadb acco. to requirement

export const authOptions: AuthOptions = {
    
    adapter: PrismaAdapter(prisma),

    //Defining providers
    providers: [

        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string

        }),
        CredentialsProvider({
            
            name:'credentials',
            credentials: {
                email:{ label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' } ,

            },
            //authorize the credentials
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error ('invalid credentials')
                }
            
                //Validate the user's email and signing method
                const user  = await prisma.user.findUnique({
                    where:{
                        email : credentials.email
                    }
                   
                });

                if(!user || !user?.hashedPassword){
                    throw new Error('Invalid Credentials')
                }
                
                //Check the password entered using bcrypt compare method
                const isCorrentPassword = await bcrypt.compare(
                    
                    credentials.password,
                    user.hashedPassword
                    
                )

                if(!isCorrentPassword) throw new Error("Invalid Credentials, Wrong password")
                
                //Finally return the user back to client if all conditions are satisfied
                return user;

            }

        })

    ],
    //For occuring erros or callbacks , redirect to auth page or in this case Home Landing page
    pages:{
        signIn: '/',
    },

    debug : process.env.NODE_ENV === 'development',
    //stategy to use jwt or passport.js
    session:{
        strategy: "jwt",
    },
    //Not providing any secret or NEXTAUTH_SECRET will throw an error in production.
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);


//Acoording to totel site
// import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
// import prisma from "../../../libs/prismadb";

// passport.use(
//   new LocalStrategy(async (username, password, done) => {
//     try {
//       const user = await prisma.user.findUnique({ where: { email:username } });

//       if (!user) {
//         return done(null, false, { message: "Incorrect username." });
//       }

//       const passwordValid = password === user.hashedPassword;

//       if (!passwordValid) {
//         return done(null, false, { message: "Incorrect password." });
//       }

//       return done(null, user);
//     } catch (err) {
//       return done(err);
//     }
//   })
// );

// passport.serializeUser((user: any, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id: string, done) => {
//   try {
//     const user = await prisma.user.findUnique({ where: { id } });
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

// export default passport;
