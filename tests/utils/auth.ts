import { APIRequestContext } from "@playwright/test";
import { AuthResponse } from "../types/api/auth.js";

export async function authenticate(request: APIRequestContext): Promise<string> {
  const response = await request.post("token", {
    multipart: {
      client_id:
        process.env.CLIENT_ID ??
        (() => {
          throw new Error("CLIENT_ID not set in env file");
        })(),
      client_secret:
        process.env.CLIENT_SECRET ??
        (() => {
          throw new Error("CLIENT_SECRET not set in env file");
        })(),
      grant_type: "client_credentials",
    },
  });
  const body: AuthResponse = await response.json();
  console.log("Response body:", body);

  return body.data.access_token;
}
