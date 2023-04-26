export a function authOptions whihch wokrs on prismaAdater which accepts our prisma client from prismadb.ts

declare Provider fucnction initiated with objects requiring data from user's side.

We can use prisma.user to validate the user if exists or not using credentials sent.

Validate the user credentials , then match the passwords usign bcrypt compare method

//For occuring erros or callbacks , redirect to auth page or in this case Home Landing page
This pages will refer to / route i.e. home page when error occurs
    pages:{
        signIn: '/',
    },

->Debug options available only in development mode of the app
->Stategy for the user auth creation
    session:{
        strategy: "jwt",
    },
import secret: process.env.NEXTAUTH_SECRET,