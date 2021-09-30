import { Bot } from "grammy";
import { setupI18n } from "./i18n";
import { setupRouter } from "./routes";
import { setupSession, SessionContext } from "./sessions";

console.log("ITV tg bot init...");

// Bot init
const bot = new Bot<SessionContext>(process.env.token ?? "");

console.log("Enabling sessions...");
setupSession(bot);

console.log("Enabling i18n...");
setupI18n(bot);

console.log("Enabling router...");
setupRouter(bot);

bot.catch((err) => {
    console.error(err);
});

bot.command("whoami", (ctx) => {
    ctx.reply(JSON.stringify(ctx.message?.from) ?? "Sender unknown");
});

bot.command("wichat", (ctx) => {
    ctx.reply(JSON.stringify(ctx.message?.chat) ?? "Chat unknown");
});

bot.command("ss", (ctx) => {
    ctx.reply(JSON.stringify(ctx.session) || "Session empty");
});

bot.command("cancel", (ctx) => {
    ctx.session.step = "";
})

bot.start();
console.log("ITV bot running...");

process.once("SIGTERM", () => {
    console.log("ITV bot gracefully shutting down...");
})

