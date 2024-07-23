import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import ProviderController from "@/components/ProviderController";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Branéd",
  description: "Retain Your Brand Image",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderController>{children}</ProviderController>
        <Toaster />
      </body>
    </html>
  );
}
