import cookieCutter from "cookie-cutter"
import { IncomingMessage, ServerResponse } from "http"

export async function getFromCookies(
  key: string,
  { req, res }: { req?: IncomingMessage; res?: ServerResponse },
): Promise<unknown | undefined> {
  try {
    const isSsr = req !== undefined && res !== undefined

    if (isSsr) {
      const { cookie } = req.headers

      if ((cookie?.length ?? 0) === 0) {
        return undefined
      }

      const { default: Cookies } = await import("cookies")

      const cookies = new Cookies(req, res)

      const rawValue = cookies.get(key)

      if (typeof rawValue === "undefined") {
        return undefined
      }

      return JSON.parse(decodeURIComponent(rawValue))
    }

    const rawValue = cookieCutter.get(key)

    if (typeof rawValue === "undefined") {
      return undefined
    }

    return JSON.parse(decodeURIComponent(rawValue))
  } catch (error) {
    console.error(error)
    return undefined
  }
}
