import { Nunito } from '@next/font/google'

// import Navbar from '../components/navbar/Navbar';
// import LoginModal from '@/app/components/modals/LoginModal';

import './globals.css'
import getCurrentUser from '../pages/actions/getCurrentUser';

export const metadata = {
  title: 'Totel',
  description: 'Totel_space',
}

const font = Nunito({ 
  subsets: ['latin'], 
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    //using getCurrentUser function
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>

         {/* <Navbar currentUser={currentUser} /> */}
         
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  )
}
