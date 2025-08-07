import { draftMode } from "next/headers";

export async function GET(request: Request) {
  const mode = await draftMode();  // await the Promise
  mode.disable();                  // now you can call disable()
  return new Response("Draft mode is disabled");
}
