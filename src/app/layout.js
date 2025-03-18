
import "@/styles/globals.css";
import { AuthContextProvider } from '@/app/context/AuthContext'

export const metadata = {
  title: "Cucinai",
  description: "Your AI-powered kitchen companion for smarter, tastier recipes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <body className="bg-background text-foreground dark:bg-darkBackground dark:text-darkForeground transition-colors duration-300">
          {children}
        </body>
      </AuthContextProvider>
    </html>
  );
}
