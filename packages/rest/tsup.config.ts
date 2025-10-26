import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	outDir: "dist",
	format: ["esm"],
	splitting: false,
	dts: true,
	sourcemap: true,
	clean: true,
});
