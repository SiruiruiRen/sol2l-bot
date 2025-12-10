import type React from "react"
import "./globals.css"
import { Merriweather, Nunito } from "next/font/google"
import ClientLayout from "./client-layout"

const headingFont = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-heading",
})

const bodyFont = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-body",
})

export const metadata = {
  title: "SoL2LBot - Science of Learning",
  description: "Learn how to learn effectively with SoL2LBot",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`dark ${headingFont.variable} ${bodyFont.variable}`}
      style={{ colorScheme: "dark" }}
    >
      <body className={bodyFont.className}>
        <ClientLayout children={children} />
      </body>
    </html>
  )
}