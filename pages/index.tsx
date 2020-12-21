import Head from 'next/head'
import styles from '../styles/Home.module.css'

const mockData = ['City1', 'City2', 'City3']

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>top-tops</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Ratings!
        </h1>

          <article>
            <header>Top German cities</header>

            <ul>
              {mockData.map(item=><li key={item}>{item}</li>)}
            </ul>
          </article>

      </main>


    </div>
  )
}
