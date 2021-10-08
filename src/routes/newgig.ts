import { Router } from "@grammyjs/router";
import { debug } from "console";
import { Bot } from "grammy";
import { isDirect } from "../filter";
import { SessionContext } from "../sessions";

function setup(bot: Bot<SessionContext>, r : Router<SessionContext>) {

    bot.filter(isDirect).command("newgig", (ctx) => {
        ctx.session.step = "newgig/p-name";
        r.middleware()(ctx, async () => {});
    });

    r.route("newgig/p-name", async (ctx) => {
        // debug(bot.handler);
        await ctx.reply("Type in gig name");
        ctx.session.step = "newgig/name";
    });

    r.route("newgig/name", async (ctx) => {
        console.log(ctx.msg?.text ?? "No name specified");
        // await ctx.api.sendMessage(process.env.admin_id ?? ctx.chat?.id ?? 0, ctx.message?.text ?? "no text specified");
        ctx.session.step = "newgig/p-city"; // If valid
        r.middleware()(ctx, async () => {});
    });

    r.route("newgig/p-city", async (ctx) => {
        await ctx.reply("Type in city name");
        ctx.session.step = "newgig/city";
    });

    r.route("newgig/city", async (ctx) => {
        console.log(ctx.msg?.text ?? "No city specified");
        ctx.session.step = "main";
    });

};

export { setup };
