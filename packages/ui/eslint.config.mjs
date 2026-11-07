import { defineConfig } from "eslint/config";

import { nextAppConfig } from "@rizer/config/eslint-next";

export default defineConfig([...nextAppConfig]);
