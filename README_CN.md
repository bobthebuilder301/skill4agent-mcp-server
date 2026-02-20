# @skill4agent/mcp-server

中文 | [English](https://github.com/osulivan/skill4agent-mcp-server/blob/main/README.md)

skill4agent 的 MCP (Model Context Protocol) 服务器 - 在 AI 对话中搜索、查看和安装 AI skills。

## 功能

通过 MCP 协议提供以下能力：

- 🔍 **搜索 Skills** - 按关键词搜索 AI skills，支持分类筛选
- 📄 **获取详情** - 查看 skill 的完整文档（SKILL.md）
- 📦 **安装信息** - 获取 skill 的下载链接和安装命令

## 安装

```bash
npm install -g @skill4agent/mcp-server
```

或者使用 npx 直接运行：

```bash
npx @skill4agent/mcp-server
```

## 在 AI 应用中使用（Claude Desktop 等）

在 Claude Desktop 配置文件中添加：

```json
{
  "mcpServers": {
    "skill4agent": {
      "command": "npx",
      "args": ["-y", "@skill4agent/mcp-server"]
    }
  }
}
```

如需使用自定义 API 端点，可添加 `env` 配置：

```json
{
  "mcpServers": {
    "skill4agent": {
      "command": "npx",
      "args": ["-y", "@skill4agent/mcp-server"],
      "env": {
        "SKILL4AGENT_API_URL": "https://your-custom-domain.com/api/mcp"
      }
    }
  }
}
```

## 可用工具

### search_skills

搜索 AI skills。

**参数：**
- `keyword` (必填): 搜索关键词
- `categories` (可选): 分类筛选，支持中文和英文
- `limit` (可选): 返回结果数量限制，默认 10，最大 100

**示例：**
```json
{
  "keyword": "React",
  "categories": ["前端开发"],
  "limit": 5
}
```

### get_skill

获取特定 skill 的详细信息。

**参数：**
- `skillId` (必填): skill ID，从 `search_skills` 工具返回的结果中获取

**示例：**
```json
{
  "skillId": "frontend-design--anthropics-skills"
}
```

### install_skill

获取 skill 的安装信息。

**参数：**
- `skillId` (必填): skill ID

**示例：**
```json
{
  "skillId": "frontend-design--anthropics-skills"
}
```

## 环境变量

| 变量 | 描述 | 默认值 |
|------|------|--------|
| `SKILL4AGENT_API_URL` | skill4agent API 地址 | `https://skill4agent.com/api/mcp` |

## 本地开发

```bash
# 安装依赖
npm install

# 构建
npm run build

# 开发模式（热重载）
npm run dev

# 直接运行
node dist/index.js
```

## 项目结构

```
@skill4agent/mcp-server/
├── src/
│   ├── index.ts       # 入口文件
│   ├── server.ts      # MCP Server 主逻辑
│   ├── api/
│   │   └── client.ts  # API 客户端
│   └── tools/
│       ├── search.ts  # search_skills 工具
│       ├── detail.ts  # get_skill 工具
│       └── install.ts # install_skill 工具
├── package.json
├── tsconfig.json
└── README.md
```

## 相关链接

- [skill4agent](https://skill4agent.com)
- [MCP 文档](https://modelcontextprotocol.io)
- [NPM 包](https://www.npmjs.com/package/@skill4agent/mcp-server)

## 许可证

MIT
