import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  // This route should only be available in development
  if (process.env.NODE_ENV !== "development") {
    return new NextResponse("Not Found", { status: 404 })
  }

  try {
    const body = await request.json()
    const { level, args, stack, ts } = body

    const timestamp = new Date(ts).toISOString()

    // Log the captured client-side console output to the server console
    console.log(`\n--- 🖥️  Client Console [${level.toUpperCase()}] @ ${timestamp} ---`)
    console.log(...args)
    if (stack) {
      const stackLines = stack.split("\n")
      // We slice(2) to remove the Error object's own trace and the send() function call
      console.log(`Stack trace:\n${stackLines.slice(2).join("\n")}`)
    }
    console.log(`--- End Client Console ---\n`)

    return new NextResponse("OK", { status: 200 })
  } catch (error) {
    console.error("Error logging client console output:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
