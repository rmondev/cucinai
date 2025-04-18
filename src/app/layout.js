
import "@/styles/globals.css";
import { AuthContextProvider } from '@/context/AuthContext'
import NavBar from '@/components/NavBar'
import { ToastContainer, toast } from 'react-toastify';
import Footer from "@/components/Footer";
import RainingFood from '@/components/RainingFood'

export const metadata = {
  title: "Cucinai",
  description: "Your AI-powered kitchen companion for smarter, tastier recipes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthContextProvider>
        
      <body className="text-[#b49ff3] min-h-screen flex flex-col bg-background text-foreground dark:bg-darkBackground dark:text-darkForeground transition-colors duration-300">
          <NavBar/>
          <main className="relative z-10 flex-grow bg-[#b49ff3] dark:bg-[#d5c4f1]">
            <RainingFood/>
            {children}
          </main>
            <ToastContainer 
              position="bottom-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              // theme="light"
            />
            <Footer/>
          </body>
      
      </AuthContextProvider>
    </html>
  );
}
