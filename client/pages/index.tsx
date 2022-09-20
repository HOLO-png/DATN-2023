import { Container } from 'next/app'
import Head from 'next/head'
import { Header } from '../sdk/Header'

export default function Home() {
  return (
    <Container> 
      <Head>
        <title>Housewife</title>
        <link href="https://fonts.googleapis.com/css2?family=Readex+Pro&display=swap" rel="stylesheet"/>
      </Head>
      {/* header */}
      <Header/>
    </Container>
  )
}