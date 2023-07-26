import Mixpanel from "mixpanel";

export const dynamic = "force-dynamic";

const isCI = process.env.CI;

const mixpanel = Mixpanel.init(isCI ? "" : process.env.MIXPANEL_TOKEN!);

export const POST = async (req: Request) => {
  if (isCI) return new Response("Nice", { status: 200 });
  try {
    const json = await req.json();
    mixpanel.track(json.name, json.properties);
    return new Response("Nice", { status: 200 });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
};
