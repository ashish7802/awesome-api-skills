import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

serve((req: Request) => {
  return new Response("Hello from Deno Edge!");
});