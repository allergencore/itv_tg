import { Router } from "@grammyjs/router";
import { Bot } from "grammy";
import { isDirect } from "../filter";
import { SessionContext } from "../sessions";

function setupWizard(bot: Bot<SessionContext>) {

    bot.filter(isDirect).command("newtour", (ctx) => {
        ctx.session.step = "newtour/p-name";
        gig.middleware()(ctx, async () => {});
    });

    const gig = new Router<SessionContext>((ctx) => ctx.session.step);

    gig.route("p-name", async (ctx) => {
            await ctx.reply("Type in tour name");
            ctx.session.step = "name";
            // gig.middleware()(ctx, async () => {});
    });

    gig.route("name", (ctx) => {
        // console.log(ctx.message?.text || "no text specified");
        console.log("newtour");
        ctx.api.sendMessage(process.env.admin_id ?? ctx.chat?.id ?? 0, ctx.message?.text ?? "no text specified");
        ctx.session.step = "";
    });

    // gig.middleware().;

    bot.filter(isDirect).use(gig.middleware());
}

export { setupWizard };
