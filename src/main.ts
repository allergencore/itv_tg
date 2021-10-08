import { Bot, webhookCallback } from "grammy";
import express from "express";
import { setupI18n } from "./i18n";
import { setupRouter } from "./routes";
import { setupSession, SessionContext } from "./sessions";

console.log("ITV tg bot init...");
process.env.BUILD_ID ??= "DEV";
process.env.COMMIT_SHA ??= "unknown";
console.log(`Build "${process.env.BUILD_ID}" from commit "${process.env.COMMIT_SHA}"`);


const bot = new Bot<SessionContext>(process.env.tg_token ?? ""/* , {client: {canUseWebhookReply: () => true}} */);

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
    ctx.reply(JSON.stringify(ctx.session) ?? "Session empty");
});

bot.command("cancel", (ctx) => {
    ctx.session.step = "main";
})

console.log("Enabling sessions...");
setupSession(bot);

console.log("Enabling i18n...");
setupI18n(bot);

console.log("Enabling router...");
setupRouter(bot);


if (process.env.mode !== "poll") {
    console.log("Starting in webhook mode...");
    const w = express();
    w.use(express.json());
    w.post("/secadr", webhookCallback(bot));
    bot.api.setWebhook("https://we1rdw4y.loca.lt/secadr");
    w.listen(process.env.PORT ?? 8080);
} else {
    console.log("Starting in polling mode...");
    bot.start();
}

console.log("ITV bot running...");

process.once("SIGTERM", () => {
    console.log("!SIGTERM!");
    process.exit();
})

process.once("SIGINT", () => {
    console.log("!SIGINT!");
    process.exit();
});

