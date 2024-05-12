import { ThemeProvider } from "@/components/themeProvider"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import "./styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "FrontendTitan",
    description: "Official Website for The FrontendTitan YouTube Channel",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <html lang="en" suppressHydrationWarning>
                <head />
                <body>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        </>
    )
}
