import { Router } from "@grammyjs/router";
import { Bot } from "grammy";
import { SessionContext } from "../sessions";
import { setup as setupNewgig } from "./newgig";
import { setup as setupNewtour } from "./newtour";


function setupRouter(bot: Bot<SessionContext>) {
    const r = new Router<SessionContext>((ctx) => ctx.session.step);

    setupNewgig(bot, r);
    setupNewtour(bot, r);

    r.otherwise(async (ctx) => {
        console.error("Router dont have this route: " + ctx.session.step);
        await ctx.reply("EГГOГ");
    });

    bot.use(r.middleware());
}


export { setupRouter };
