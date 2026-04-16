import { Router, type IRouter } from "express";
import { db, projectsTable } from "@workspace/db";
import { asc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/projects", async (req, res): Promise<void> => {
  req.log.info("Listing projects");
  const projects = await db
    .select()
    .from(projectsTable)
    .orderBy(asc(projectsTable.order));
  res.json(projects);
});

export default router;
