
We can use getServerSession and authOptions imported from [next-auth].ts file as well as using prisma from libs folder to use prisam methods

export a promise to getSeverSession using authOptions

Create a fucntion which stores session in session variable and checks the user's identity in dbms using its email

return null if not found else successully return currentUser object

To test the backend Using next-auth testing to crreate mock server Session

WE dont send any error response while getting currentUser from action because listings is also available for signedOut user as well