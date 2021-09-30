import { Router } from "@grammyjs/router";
import { Bot } from "grammy";
import { isDirect } from "../filter";
import { SessionContext } from "../sessions";

function setup(bot: Bot<SessionContext>, r : Router<SessionContext>) {

    bot.filter(isDirect).command("newgig", (ctx) => {
        ctx.session.step = "newgig/p-name";
        r.middleware()(ctx, async () => {});
    });

    r.route("newgig/p-name", async (ctx) => {
            await ctx.reply("Type in gig name");
            ctx.session.step = "newgig/name";
    });

    r.route("newgig/name", (ctx) => {
        console.log("newgig");
        ctx.api.sendMessage(process.env.admin_id ?? ctx.chat?.id ?? 0, ctx.message?.text ?? "no text specified");
        ctx.session.step = "";
    });
};

export { setup };
