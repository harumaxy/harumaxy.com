import { jwt } from "@elysiajs/jwt";
import { Elysia, t } from "elysia";

export const authPlugin = new Elysia({
  name: "auth-plugin",
  seed: "seed",
})
  .use(
    jwt({
      name: "jwt",
      secret: "test",
    })
  )
  .post(
    "/api/auth/login",
    async ({ jwt, body, cookie: { auth }, set, store }) => {
      const { username, password } = store as {
        username: string;
        password: string;
      };
      if (username !== body.username || password !== body.password) {
        set.status = "Unauthorized";
        throw new Error("Unauthorized");
      }

      const maxAge = 60 * 60 * 24 * 7;
      const token = await jwt.sign({
        username,
      });
      auth.set({
        value: token,
        httpOnly: true,
        maxAge,
        path: "/",
      });
      set.redirect = "/";
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
    }
  )
  .get("/api/auth/username", async ({ jwt, cookie, set }) => {
    const profile = await jwt.verify(cookie.auth.value);
    if (!profile) {
      set.status = 401;
      throw new Error("Unauthorized");
    }
    return {
      expires: Date.now() + (cookie.auth.maxAge ?? 0) * 1000,
      username: profile.username as string,
    };
  });
