export async function GET() {
  const validationKey =
    "843eab15441e880193b821432df6b975d514f2fe7ec1bfbfd51639c3918c871d411a90ff06ca2f06c58a4f497ab6801f3c5b1d93052099deebcd52ec91e00541"

  return new Response(validationKey, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=31536000",
    },
  })
}
