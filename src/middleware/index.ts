import { defineMiddleware } from "astro:middleware";
import { supabase } from "../lib/supabase";

export const onRequest = defineMiddleware(async (context, next) => {
  console.log("Middleware");


  if(context.url.pathname.includes("protected")){
    const accessToken = context.cookies.get("sb-access-token");
    const refreshToken = context.cookies.get("sb-refresh-token");
  
    if (!accessToken || !refreshToken) {
      return context.redirect("/signin", 302);
    }
  
    const { data, error } = await supabase.auth.setSession({
      refresh_token: refreshToken.value,
      access_token: accessToken.value,
    });
  
    if (error) {
      context.cookies.delete("sb-access-token", {
        path: "/",
      });
      context.cookies.delete("sb-refresh-token", {
        path: "/",
      });
  
      return context.redirect("/signin", 302);
    }
    
    context.locals.data = data;
  }

  return next();
});
