import { initCache } from "@/core/indexing/indexing-cache";
async function main(): Promise<void> {
  // const { initCache } = await import("@/core/indexing/indexing-cache");
  try {
    await initCache();
    console.log("Cache initialization completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Failed to initialize cache:", error);
    process.exit(1);
  }
}

main();
