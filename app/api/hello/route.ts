function sleep(time: number) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

const text = `Exercitation aliquip aliqua esse sint consectetur tempor aute eiusmod pariatur irure et magna.`;

const encoder = new TextEncoder();

async function* countFrom(n: number) {
  for (let i = n; i < Infinity; i++) {
    await sleep(500);
    yield encoder.encode(`${text} + ${i}`);
  }
}

export const runtime = "edge";

export async function GET() {
  const body = new ReadableStream<Uint8Array>({
    pull: async controller => {
      let iterations = 0;
      for await (const value of countFrom(1)) {
        if (iterations === 200) {
          controller.close();
          break;
        }
        iterations++;
        controller.enqueue(value);
      }
    }
  });
  return new Response(body);
}
