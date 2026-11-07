import { defineConfig } from "eslint/config";

import { fsdConfig } from "@rizer/config/eslint-fsd";
import { nextAppConfig } from "@rizer/config/eslint-next";

export default defineConfig([...nextAppConfig, ...fsdConfig(import.meta.dirname)]);
