import { t } from "../utils";
import exampleRouter from "./example";
import notesRouter from "./notes";
import shopsRouter from "./shops"

export const appRouter = t.mergeRouters(exampleRouter, notesRouter, shopsRouter);

export type IAppRouter = typeof appRouter;
