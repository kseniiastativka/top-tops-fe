import type { FC } from "react"
import Head from "next/head"

const ErrorPage: FC = () => {
  return (
    <>
      <Head>
        <title>Error | top-tops</title>
        <link rel="icon" href={"/favicon.ico"} />
      </Head>

      <h1>
        🛑 An error occurred. Please try again later or visit another page
      </h1>
    </>
  )
}

export default ErrorPage
