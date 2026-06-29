import { mutation } from './_generated/server';
export const add = mutation({ handler: async (ctx, args) => { await ctx.db.insert('tasks', { text: args.text }); } });