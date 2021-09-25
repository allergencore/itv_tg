import { Firestore } from "@google-cloud/firestore";
import { adapter } from "@grammyjs/storage-firestore";
import { Bot, session } from "grammy";
import ExtendedContext from "./extendedcontext";

// GCP Firestore init
const db = new Firestore({
    // adjust these values:
    projectId: "YOUR_PROJECT_ID",
    keyFilename: "firestore-keyfile.json",
});

// Bot init
const bot = new Bot<ExtendedContext>(process.env.token);


bot.catch((err) => {
    console.error(err);
});

/* bot.use(
    session({
        storage: adapter(db.collection("sessions"))
    })
); */

bot.command("whoami", (ctx) => {
    ctx.reply(JSON.stringify(ctx.message?.from) || "Sender unknown");
});

bot.command("ss", (ctx) => {
    ctx.reply(JSON.stringify(ctx.session) || "Session empty");
});

bot.start();
