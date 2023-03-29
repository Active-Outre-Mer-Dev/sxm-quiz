import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import type { Subject } from "@prisma/client";
import { getToken } from "next-auth/jwt";

async function addScore(user_id: string, data: Data) {
  await prisma.$connect();
  const record = await prisma.leaderboards.upsert({
    where: { id: user_id },
    create: { ...data, user_id },
    update: { score: { set: data.score } }
  });
  await prisma.$disconnect();
  return record;
}

type Data = {
  subject: Subject;
  score: number;
};

export const runtime = "nodejs";

export const POST = async (req: NextRequest) => {
  const headers = new Headers();
  try {
    const token = await getToken({ req });
    headers.set("Content-Type", "application/json");
    if (!token) return new Response("You must be signed in to save score!", { status: 401 });
    const json = (await req.json()) as Data;
    const data = await addScore(token.sub!, json);
    console.log(data.id);
    return NextResponse.json(data, { status: 200, headers });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occurred on the server" }, { headers, status: 500 });
  }
};
