import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // You can add custom middleware logic here if needed
  // For example, redirects, authentication checks, etc.
  return NextResponse.next()
}

