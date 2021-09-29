import { Router } from "@grammyjs/router";
import { Bot } from "grammy";
import { SessionContext } from "../sessions";

function setupRouter(bot: Bot<SessionContext>) {
    const gig = new Router<SessionContext>((ctx) => ctx.session.step);

    

    bot.use(gig.middleware());
}


export { setupRouter }
