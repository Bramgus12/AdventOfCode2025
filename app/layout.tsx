import type { Metadata } from "next";
import { Geist_Mono, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ThemeProvider from "@/components/theme-provider";

const sourceCodePro = Source_Code_Pro({
    variable: "--font-source-code-pro",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Advent of Code UI",
    description: "App with UI for Advent of Code challenges",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${sourceCodePro.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <SidebarProvider>
                        <AppSidebar />
                        <main className="px-8 py-4 w-full">{children}</main>
                    </SidebarProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
