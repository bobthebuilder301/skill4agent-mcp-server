import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { searchSkillsHandler, searchSkillsSchema } from './tools/search.js';
import { getSkillHandler, getSkillSchema } from './tools/detail.js';
import { installSkillHandler, installSkillSchema } from './tools/install.js';

const SERVER_NAME = 'skill4agent-mcp-server';
const SERVER_VERSION = '0.1.0';

export async function startServer(): Promise<void> {
  const server = new McpServer(
    {
      name: SERVER_NAME,
      version: SERVER_VERSION,
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  const transport = new StdioServerTransport();

  // Register tools with Zod schemas
  server.registerTool(
    'search_skills',
    {
      description: 'Search for Skills by keyword, with optional category filtering. Returns a list of matching skills.\n\nUse cases:\n- When looking for skills in a specific domain\n- When unsure what skill is needed but have a general direction',
      inputSchema: searchSkillsSchema,
    },
    async (args) => {
      return searchSkillsHandler(args);
    }
  );

  server.registerTool(
    'get_skill',
    {
      description: 'Get detailed information about a skill, including the complete SKILL.md content.\n\nUse cases:\n- When you want to learn detailed information about a skill\n- When you need to view the core documentation (SKILL.md) of a skill\n- Before recommending or installing a skill, you need to confirm the detailed information to analyze whether it meets the requirements',
      inputSchema: getSkillSchema,
    },
    async (args) => {
      return getSkillHandler(args);
    }
  );

  server.registerTool(
    'install_skill',
    {
      description: 'Get installation methods for a skill.\n\nUse cases:\n- When you need to install a skill',
      inputSchema: installSkillSchema,
    },
    async (args) => {
      return installSkillHandler(args);
    }
  );

  await server.connect(transport);

  console.error(`${SERVER_NAME} v${SERVER_VERSION} started`);
  console.error('Available tools: search_skills, get_skill, install_skill');
}

// Start the server
startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
