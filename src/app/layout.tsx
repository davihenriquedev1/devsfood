import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MainProvider } from "@/providers/MainProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<html lang="en">
		<body className="antialiased flex min-h-screen ">
			<MainProvider>
				<Header/>
				<div>
					<main className="flex flex-1 min-h-screen">
						{children}
					</main>
					<Footer/>
				</div>
			</MainProvider>
		</body>
		</html>
	);
}
