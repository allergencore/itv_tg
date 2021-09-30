import { I18n } from "@grammyjs/i18n/dist/source";
import { Bot } from "grammy";
import { SessionContext } from "./sessions";

function setupI18n(bot: Bot<SessionContext>) {

    const i18n = new I18n({
        directory: "lang",
        defaultLanguage: "en",
        useSession: true,
        sessionName: "session"
    });

    bot.use(i18n.middleware());

}

export { setupI18n };
