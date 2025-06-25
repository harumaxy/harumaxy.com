import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ request, locals }) => {
  const {env} = locals.runtime;
  return new Response(Math.random().toString())
}