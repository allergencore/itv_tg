import { SessionContext } from "./sessions";


function isDirect(ctx: SessionContext): boolean {
    return (
        typeof ctx.from?.id === "number" &&
        ctx.from?.id === ctx.chat?.id
    );
}

function isAdmin(ctx: SessionContext): boolean {
    return (
        typeof ctx.chat?.id === "number" &&
        process.env.admin_id == ctx.chat?.id.toString()
    )
}

export { isDirect, isAdmin };
