import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // ✅ 添加自定义规则
  {
    // 可作用于所有文件，也可以指定特定的 files
    rules: {
      "no-console": "error", // 禁止所有 console
    },
  }
];

export default eslintConfig;
