import Mixpanel from "mixpanel";

const mixpanelToken = process.env.MIXPANEL_TOKEN!;

const mixpanel = mixpanelToken ? Mixpanel.init(mixpanelToken) : null;

export const dynamic = "force-dynamic";

export const POST = async (req: Request) => {
  try {
    if (!mixpanel) return new Response("Nice", { status: 200 });
    const json = await req.json();
    mixpanel.track(json.name, json.properties);
    return new Response("Nice", { status: 200 });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
};
