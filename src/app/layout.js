
import "@/styles/globals.css";
import { AuthContextProvider } from '@/context/AuthContext'
import NavBar from '@/components/NavBar'
import BSNavBar from "@/components/BSNavBar";
import { ToastContainer, toast } from 'react-toastify';
import Footer from "@/components/Footer";

export const metadata = {
  title: "Cucinai",
  description: "Your AI-powered kitchen companion for smarter, tastier recipes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthContextProvider>
        
      <body className="min-h-screen flex flex-col bg-background text-foreground dark:bg-darkBackground dark:text-darkForeground transition-colors duration-300">
          <NavBar/>
          
          
            {/* <BSNavBar/> */}
        
          <main className="flex-grow">
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
