import { Bot, Context, session, SessionFlavor } from "grammy";
import { Firestore } from "@google-cloud/firestore";
import { adapter } from "@grammyjs/storage-firestore";
import { I18nContext } from "@grammyjs/i18n/dist/source";

interface SessionData {
    step: string;
}

interface I18nFlavor extends Context {
    readonly i18n: I18nContext;
}

type SessionContext = Context & SessionFlavor<SessionData> & I18nFlavor;
// type SessionContext = Context & SessionFlavor<SessionData> & MinimalMiddlewareContext;

/* function setupSession(bot: Bot<SessionContext>) {
    // GCP Firestore init
    const db = new Firestore({
        projectId: process.env.GOOGLE_CLOUD_PROJECT,
        keyFilename: "firestore.json",
    });
    bot.use(
        session({
            storage: adapter(db.collection("sessions"))
        })
    );
} */

function setupSession(bot: Bot<SessionContext>) {
    switch (process.env.session) {
        case "firestore":
            console.log("Using firestore production sessions...");
            throw new Error("Code isnt written");
        break;
        case "lfs":
            console.log("Using firestore emulator sessions...");
        break;    
        case "memory":
        default:
            console.log("Using in-memory sessions...");
            bot.use(session({
                initial(): SessionData {
                    return { step: "main" }
                }
            }));
        break;
        }
}

export { setupSession, SessionContext };
