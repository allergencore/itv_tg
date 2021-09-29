import { I18n } from "@grammyjs/i18n/dist/source";
import { Bot } from "grammy";

function setupI18n(bot: Bot) {

    const i18n = new I18n({
        directory: "lang",
        useSession: true
    });

    bot.use(i18n.middleware());

}

export { setupI18n };
