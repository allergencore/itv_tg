import { Router } from "@grammyjs/router";
import { Bot } from "grammy";
import { isDirect } from "../filter";
import { SessionContext } from "../sessions";

function setupWizard(bot: Bot<SessionContext>) {

    bot.filter(isDirect).command("newgig", (ctx) => {
        ctx.session.step = "newgig/p-name";
        gig.middleware()(ctx, async () => {});
    });

    const gig = new Router<SessionContext>((ctx) => ctx.session.step);

    gig.route("newgig/p-name", async (ctx) => {
            await ctx.reply("Type in gig name");
            ctx.session.step = "name";
            // gig.middleware()(ctx, async () => {});
    });

    gig.route("newgig/name", (ctx) => {
        // console.log(ctx.message?.text || "no text specified");
        console.log("newgig");
        ctx.api.sendMessage(process.env.admin_id ?? ctx.chat?.id ?? 0, ctx.message?.text ?? "no text specified");
        ctx.session.step = "";
    });

    // gig.middleware().;

    bot.filter(isDirect).use(gig.middleware());
}

export { setupWizard };
