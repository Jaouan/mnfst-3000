import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { PrivateLayout } from "@/components/layout/PrivateLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "mnfst",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<PrivateLayout>{children}</PrivateLayout>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
