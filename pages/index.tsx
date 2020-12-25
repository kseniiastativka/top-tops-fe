import Head from "next/head"
import { useUser } from "../components/UserProvider"

const mockData = ["City1", "City2", "City3"]

export default function Home() {
  const [userState] = useUser()

  return (
    <div>
      <Head>
        <title>top-tops</title>
        <link rel="icon" href={"/favicon.ico"} />
      </Head>

      <main>
        {userState.type === "logged-in" ? (
          <h1>{userState.name}, welcome to TopTops!</h1>
        ) : (
          <h1>Welcome to TopTops!</h1>
        )}

        <article>
          <header>Top German cities</header>

          <ul>
            {mockData.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </main>
    </div>
  )
}
