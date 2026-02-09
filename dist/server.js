"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const search_js_1 = require("./tools/search.js");
const detail_js_1 = require("./tools/detail.js");
const install_js_1 = require("./tools/install.js");
const SERVER_NAME = 'skill4agent-mcp-server';
const SERVER_VERSION = '0.1.0';
async function startServer() {
    const server = new mcp_js_1.McpServer({
        name: SERVER_NAME,
        version: SERVER_VERSION,
    }, {
        capabilities: {
            tools: {},
        },
    });
    const transport = new stdio_js_1.StdioServerTransport();
    // Register tools with Zod schemas
    server.registerTool('search_skills', {
        description: 'Search for Skills by keyword, with optional category filtering. Returns a list of matching skills.\n\nUse cases:\n- When looking for skills in a specific domain\n- When unsure what skill is needed but have a general direction',
        inputSchema: search_js_1.searchSkillsSchema,
    }, async (args) => {
        return (0, search_js_1.searchSkillsHandler)(args);
    });
    server.registerTool('get_skill', {
        description: 'Get detailed information about a skill, including the complete SKILL.md content.\n\nUse cases:\n- When you want to learn detailed information about a skill\n- When you need to view the core documentation (SKILL.md) of a skill\n- Before recommending or installing a skill, you need to confirm the detailed information to analyze whether it meets the requirements',
        inputSchema: detail_js_1.getSkillSchema,
    }, async (args) => {
        return (0, detail_js_1.getSkillHandler)(args);
    });
    server.registerTool('install_skill', {
        description: 'Get installation methods for a skill.\n\nUse cases:\n- When you need to install a skill',
        inputSchema: install_js_1.installSkillSchema,
    }, async (args) => {
        return (0, install_js_1.installSkillHandler)(args);
    });
    await server.connect(transport);
    console.error(`${SERVER_NAME} v${SERVER_VERSION} started`);
    console.error('Available tools: search_skills, get_skill, install_skill');
}
// Start the server
startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
//# sourceMappingURL=server.js.map