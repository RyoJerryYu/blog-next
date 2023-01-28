import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps() {
  return {
    props: {
      inter,
    },
  }
}

export default function Home() {
  return (
    <p>
      Hello From my next.js app!
    </p>
  )
}
