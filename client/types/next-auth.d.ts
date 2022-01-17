import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    status: string;
  }

  interface Session {
    user: User;
  }
}
