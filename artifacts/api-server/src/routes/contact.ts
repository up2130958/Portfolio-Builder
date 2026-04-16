import { Router, type IRouter } from "express";
import rateLimit from "express-rate-limit";
import { db, contactsTable } from "@workspace/db";
import { SubmitContactBody } from "@workspace/api-zod";

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many contact submissions. Please try again later." },
});

const router: IRouter = Router();

router.post("/contact", contactLimiter, async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Contact form validation failed");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { name, email, subject, message } = parsed.data;

  const [submission] = await db
    .insert(contactsTable)
    .values({ name, email, subject, message })
    .returning();

  req.log.info({ id: submission.id, email: submission.email }, "Contact submission saved");
  res.status(201).json(submission);
});

export default router;
