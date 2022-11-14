import { z } from "zod";
import { procedure, router } from "../utils";

export default router({
  getAllNotes: procedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.notes.findMany();
    }),
  getOneNote: procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.notes.findUnique({ where: { id: input.id } });
    }),
  createNote: procedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.notes.create({ data: input });
    }),
});
