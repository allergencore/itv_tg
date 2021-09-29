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
    bot.use(session({
        initial(): SessionData {
            return { step: "" }
        }
    }));
}

export { setupSession, SessionContext };
