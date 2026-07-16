import { db, projectsTable, adminsTable } from "@workspace/db";
import bcrypt from "bcryptjs";


async function seed() {
  logger.info("Starting seed...");

  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "changeme123";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await db
    .insert(adminsTable)
    .values({ username: adminUsername, passwordHash })
    .onConflictDoUpdate({
      target: adminsTable.username,
      set: { passwordHash },
    });
  logger.info({ username: adminUsername }, "Admin upserted");

  const sampleProjects = [
    {
      title: "Cloud-Native Microservices Platform",
      description:
        "Designed and deployed a production-grade microservices architecture on Kubernetes, handling 10M+ daily requests. Features auto-scaling, distributed tracing with Jaeger, and GitOps CI/CD pipelines.",
      techStack: ["Go", "Kubernetes", "Terraform", "PostgreSQL", "gRPC", "Jaeger"],
      githubUrl: "https://github.com/example/microservices-platform",
      liveUrl: null,
      imageUrl: null,
      featured: true,
      order: 1,
    },
    {
      title: "Real-Time Analytics Dashboard",
      description:
        "Built a real-time data pipeline ingesting 500k events/minute from IoT devices. Aggregates and visualizes metrics with sub-second latency using Apache Kafka and ClickHouse.",
      techStack: ["Python", "Apache Kafka", "ClickHouse", "React", "TypeScript", "Redis"],
      githubUrl: "https://github.com/example/realtime-analytics",
      liveUrl: "https://demo.example.com",
      imageUrl: null,
      featured: true,
      order: 2,
    },
    {
      title: "Open-Source CLI Dev Toolkit",
      description:
        "A developer productivity CLI tool with 2k+ GitHub stars. Automates repetitive project setup tasks, environment management, and deployment workflows with a plugin system.",
      techStack: ["Rust", "Shell", "Docker", "YAML"],
      githubUrl: "https://github.com/example/dev-toolkit",
      liveUrl: null,
      imageUrl: null,
      featured: true,
      order: 3,
    },
    {
      title: "Distributed Task Queue Library",
      description:
        "An open-source Node.js task queue backed by Redis with support for job retries, rate limiting, concurrency control, and dead-letter queues. Used in 50+ production projects.",
      techStack: ["Node.js", "TypeScript", "Redis", "Bull"],
      githubUrl: "https://github.com/example/task-queue",
      liveUrl: null,
      imageUrl: null,
      featured: false,
      order: 4,
    },
    {
      title: "ML Model Serving API",
      description:
        "RESTful API for serving multiple machine learning models with versioning, A/B testing support, and automatic rollback. Reduced inference latency by 40% through model optimization.",
      techStack: ["Python", "FastAPI", "PyTorch", "Docker", "ONNX"],
      githubUrl: "https://github.com/example/ml-serving",
      liveUrl: null,
      imageUrl: null,
      featured: false,
      order: 5,
    },
    {
      title: "Personal Finance Tracker",
      description:
        "A privacy-first personal finance app that runs entirely locally. Imports bank statements via CSV, categorizes transactions using ML, and generates monthly spending reports.",
      techStack: ["React", "SQLite", "Python", "scikit-learn"],
      githubUrl: "https://github.com/example/finance-tracker",
      liveUrl: null,
      imageUrl: null,
      featured: false,
      order: 6,
    },
  ];

  for (const project of sampleProjects) {
    await db
      .insert(projectsTable)
      .values(project)
      .onConflictDoNothing();
  }
  logger.info({ count: sampleProjects.length }, "Sample projects seeded");

  logger.info("Seed complete");
  process.exit(0);
}

seed().catch((err) => {
  logger.error({ err }, "Seed failed");
  process.exit(1);
});
