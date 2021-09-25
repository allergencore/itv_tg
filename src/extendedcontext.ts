import { Context, SessionFlavor } from "grammy";

interface SessionData {

}

type ExtendedContext = Context & SessionFlavor<SessionData>;

export default ExtendedContext;
