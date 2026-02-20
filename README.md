# @skill4agent/mcp-server

[中文](https://github.com/osulivan/skill4agent-mcp-server/blob/main/README_CN.md) | English

MCP (Model Context Protocol) Server for skill4agent - Search, view, and install AI skills in AI conversations.

## Features

Provides the following capabilities through the MCP protocol:

- 🔍 **Search Skills** - Search AI skills by keyword, with optional category filtering
- 📄 **Get Details** - View complete skill documentation (SKILL.md)
- 📦 **Installation Info** - Get download links and installation commands for skills

## Installation

```bash
npm install -g @skill4agent/mcp-server
```

Or run directly with npx:

```bash
npx @skill4agent/mcp-server
```

## Usage in AI Applications (Claude Desktop, etc.)

Add the following to your Claude Desktop configuration file:

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

To use a custom API endpoint, add the `env` configuration:

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

## Available Tools

### search_skills

Search for AI skills.

**Parameters:**
- `keyword` (required): Search keyword
- `categories` (optional): Category filter, supports both English and Chinese
- `limit` (optional): Limit the number of results, default is 10, maximum is 100

**Example:**
```json
{
  "keyword": "React",
  "categories": ["Frontend Development"],
  "limit": 5
}
```

### get_skill

Get detailed information about a specific skill.

**Parameters:**
- `skillId` (required): Skill ID, obtained from the `search_skills` tool results

**Example:**
```json
{
  "skillId": "frontend-design--anthropics-skills"
}
```

### install_skill

Get installation information for a skill.

**Parameters:**
- `skillId` (required): Skill ID

**Example:**
```json
{
  "skillId": "frontend-design--anthropics-skills"
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SKILL4AGENT_API_URL` | skill4agent API endpoint | `https://skill4agent.com/api/mcp` |

## Local Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Development mode (hot reload)
npm run dev

# Run directly
node dist/index.js
```

## Project Structure

```
@skill4agent/mcp-server/
├── src/
│   ├── index.ts       # Entry point
│   ├── server.ts      # MCP Server main logic
│   ├── api/
│   │   └── client.ts  # API client
│   └── tools/
│       ├── search.ts  # search_skills tool
│       ├── detail.ts  # get_skill tool
│       └── install.ts # install_skill tool
├── package.json
├── tsconfig.json
└── README.md
```

## Related Links

- [skill4agent](https://skill4agent.com)
- [MCP Documentation](https://modelcontextprotocol.io)
- [NPM Package](https://www.npmjs.com/package/@skill4agent/mcp-server)

## License

MIT
