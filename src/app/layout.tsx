import "./globals.scss";
import Image from "next/image";
import Link from "next/link";
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "NBA Prospects",
  description:
    "Criando um carrossel parallax dos novatos mais aguardados da NBA com React, Next.js 13 e Framer Motion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <header>
          <Image
            src="/icons/menu.svg"
            alt="Menu options"
            width={36}
            height={25}
            priority
          />
          <Link href="/">
            <Image
              src="/nba-draft-logo.png  "
              alt="Spiderman"
              width={182.5}
              height={102.5}
              priority
            />
          </Link>
          <Image
            src="/icons/user.svg"
            alt="Login"
            width={36}
            height={36}
            priority
          />
        </header>
        {children}
      </body>
    </html>
  )
}
