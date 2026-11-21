import type { Metadata } from "next";
import "./globals.css";
import TanstackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Header } from "@/components/Header/Header";


export const metadata: Metadata = {
  title: "Job-tracker",
  description: "Tracking and update status of your job applications easely",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <TanstackProvider>
          <Header/>
        {children}
        </TanstackProvider>
        </body>
    </html>
  );
}
