import { Inter } from 'next/font/google'
import Maincomponent from './Components/Maincomponent'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Maincomponent/>
  )
}
