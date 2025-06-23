export async function GET() {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    start(controller) {
      const sendData = () => {
        const data = {
          id: Date.now().toString(),
          value: Math.random() * 100,
          timestamp: Date.now(),
        }

        const message = `data: ${JSON.stringify(data)}\n\n`
        controller.enqueue(encoder.encode(message))
      }

      // Send initial data
      sendData()

      // Send data every 2 seconds
      const interval = setInterval(sendData, 2000)

      // Clean up on close
      const cleanup = () => {
        clearInterval(interval)
        controller.close()
      }

      // Set up cleanup (this is a simplified example)
      setTimeout(cleanup, 60000) // Auto-close after 1 minute
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
