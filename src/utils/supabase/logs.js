import supabase from "./supabase.js";
export class Logger {
    bot;
    constructor(bot) {
        this.bot = bot;
    }
    async logs(entries) {
        return await supabase.from("logs").insert(entries.map((entry) => ({
            bot: this.bot.id,
            namespace: entry.namespace,
            value: String(entry.value),
        })));
    }
    async log(namespace, value) {
        return this.logs([{ namespace, value }]);
    }
    async info(value) {
        console.info(value);
        return await this.log("logs", `[info] ${value}`);
    }
    async debug(value) {
        console.debug(value);
        return await this.log("logs", `[debug] ${value}`);
    }
}
