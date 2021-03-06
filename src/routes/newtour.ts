import { Router } from "@grammyjs/router";
import { Bot } from "grammy";
import { isDirect } from "../filter";
import { SessionContext } from "../sessions";

function setup(bot: Bot<SessionContext>, r: Router<SessionContext>) {

    bot.filter(isDirect).command("newtour", (ctx) => {
        ctx.session.step = "newtour/p-name";
        r.middleware()(ctx, async () => {});
    });

    r.route("newtour/p-name", async (ctx) => {
            await ctx.reply("Type in tour name");
            ctx.session.step = "newtour/name";
    });

    r.route("newtour/name", (ctx) => {
        // console.log(ctx.message?.text || "no text specified");
        console.log("newtour");
        ctx.api.sendMessage(process.env.admin_id ?? ctx.chat?.id ?? 0, ctx.message?.text ?? "no text specified");
        ctx.session.step = "";
    });
}

export { setup };
