import { jwt } from "@elysiajs/jwt";
import { Elysia, t } from "elysia";

export const authPlugin = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: "test",
    })
  )
  .post(
    "/api/auth/login",
    async ({ jwt, body, cookie: { auth }, set }) => {
      const { username, password } = body;
      if (username === "admin" && password === "password") {
        auth.set({
          value: await jwt.sign({
            username,
            password,
          }),
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7,
        });
        return `Sign in as ${username}`;
      }
      set.status = "Unauthorized";
      return "Unauthorized";
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
    }
  )
  .get("/api/auth/username", async ({ jwt, cookie: { auth }, set }) => {
    const profile = await jwt.verify(auth.value);

    if (!profile) {
      set.status = 401;
      return "Unauthorized";
    }
    return {
      username: profile.username,
    };
  });
