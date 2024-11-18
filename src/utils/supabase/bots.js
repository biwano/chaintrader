import { makeDBError } from "../schema.js";
import supabase from "./supabase.js";
export const getBot = async (name) => {
    const { data: bot, error } = await supabase
        .from("bots")
        .select("*")
        .eq("name", name)
        .single();
    if (error)
        throw makeDBError(error);
    return bot;
};
export const updateBot = async (name, body) => {
    const { data: bot, error } = await supabase
        .from("bots")
        .update(body)
        .eq("name", name)
        .select()
        .single();
    if (error)
        throw makeDBError(error);
    console.info(bot);
    return bot;
};
