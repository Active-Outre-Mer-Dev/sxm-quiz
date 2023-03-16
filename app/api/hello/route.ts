function sleep(time: number) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

const text = `Exercitation aliquip aliqua esse sint consectetur tempor aute eiusmod pariatur irure et magna.`;

const encoder = new TextEncoder();

async function* makeIterator() {
  yield encoder.encode("One ");
  await sleep(200);
  yield encoder.encode("Two ");
  await sleep(200);
  yield encoder.encode("Three");
}

export const runtime = "edge";

export async function GET() {
  let start = 0;
  let enqueued = 0;
  const body = new ReadableStream<Uint8Array>({
    pull: async controller => {
      let sliceNum = 0;
      if (enqueued >= text.length) controller.close();
      enqueued += 10;
      sliceNum += 10;
      await sleep(500);
      controller.enqueue(encoder.encode(text.slice(0, sliceNum)));
    }
  });
  return new Response(body);
}
