import { Router, type IRouter } from "express";
import bcrypt from "bcryptjs";
import { db, contactsTable, adminsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { AdminLoginBody } from "@workspace/api-zod";

const router: IRouter = Router();

function requireAdmin(req: any, res: any, next: any): void {
  if (req.session?.adminId) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

router.post("/admin/login", async (req, res): Promise<void> => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  const { username, password } = parsed.data;

  const [admin] = await db
    .select()
    .from(adminsTable)
    .where(eq(adminsTable.username, username));

  if (!admin) {
    req.log.warn({ username }, "Admin login failed: user not found");
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    req.log.warn({ username }, "Admin login failed: wrong password");
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  req.session = { adminId: admin.id, username: admin.username };
  req.log.info({ username }, "Admin logged in");
  res.json({ message: "Login successful", username: admin.username });
});

router.post("/admin/logout", (req, res): void => {
  req.session = null;
  res.json({ message: "Logged out" });
});

router.get("/admin/contacts", requireAdmin, async (req, res): Promise<void> => {
  req.log.info("Admin fetching all contacts");
  const contacts = await db
    .select()
    .from(contactsTable)
    .orderBy(desc(contactsTable.createdAt));
  res.json(contacts);
});

export default router;
