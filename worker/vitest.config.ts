import { cloudflareTest, readD1Migrations } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig(async () => {
  const migrations = await readD1Migrations("./migrations");
  return {
    plugins: [
      cloudflareTest({
        main: "./src/index.ts",
        wrangler: { configPath: "./wrangler.toml" },
        miniflare: {
          bindings: { TEST_MIGRATIONS: migrations, PUBLIC_URL: "http://localhost:8787", DEV_FAKE_LOGIN: "1" },
        },
      }),
    ],
    test: { setupFiles: ["./test/setup.ts"] },
  };
});
