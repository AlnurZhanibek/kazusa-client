import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

interface UserClaims {
  name: string;
  role: "admin" | "user";
  sub: string;
  exp: number;
  userId: string;
}

export interface UserData {
  userId: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

export async function getUser(): Promise<UserData | null> {
  const c = await cookies();
  const tokenCookie = c.get("token");

  if (!tokenCookie?.value) {
    return null;
  }

  const claims = jwtDecode<UserClaims>(tokenCookie.value);

  return {
    userId: claims.userId,
    name: claims.name,
    email: claims.sub,
    role: claims.role,
  };
}
