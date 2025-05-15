const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 获取 git 提交哈希（短格式）
let gitHash = '';
try {
  gitHash = execSync('git rev-parse --short HEAD').toString().trim();
} catch (error) {
  // console.error('❌ 获取 Git 哈希失败，请确认当前目录是一个 Git 仓库。');
  process.exit(1);
}

// 设置 .env.local 路径（可根据你的项目结构调整）
const envPath = path.resolve(__dirname, '../.env.local');

// 读取现有 .env.local 内容（如果有的话）
let existingEnv = '';
if (fs.existsSync(envPath)) {
  existingEnv = fs.readFileSync(envPath, 'utf-8');
}

// 替换或追加 NEXT_PUBLIC_BUILD_VERSION
const updatedEnv =
  existingEnv
    .split('\n')
    .filter(line => !line.startsWith('NEXT_PUBLIC_BUILD_VERSION='))
    .concat(`NEXT_PUBLIC_BUILD_VERSION=${gitHash}`)
    .filter(Boolean)
    .join('\n') + '\n';

// 写入 .env.local 文件
fs.writeFileSync(envPath, updatedEnv);

// console.log(`✅ 构建版本号写入成功: NEXT_PUBLIC_BUILD_VERSION=${gitHash}`);
