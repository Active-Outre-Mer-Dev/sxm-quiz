import Mixpanel from "mixpanel";

const mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN!);

export const dynamic = "force-dynamic";

export const POST = async (req: Request) => {
  try {
    const json = await req.json();
    mixpanel.track(json.name, json.properties);
    return new Response("Nice", { status: 200 });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
};
