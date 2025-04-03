import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "NutriAI - Your AI Nutrition & Fitness Coach",
  description:
    "Get personalized nutrition advice, diet plans, and fitness guidance to help you achieve your weight loss goals.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          /* This ensures the Lausanne font is used if available on the user's system */
          body {
            font-family: 'Lausanne', sans-serif;
          }
        `,
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

