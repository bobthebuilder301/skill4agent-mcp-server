"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installSkillSchema = void 0;
exports.installSkillHandler = installSkillHandler;
exports.createInstallSkillTool = createInstallSkillTool;
const zod_1 = require("zod");
const client_js_1 = require("../api/client.js");
// Zod schema for install_skill
exports.installSkillSchema = zod_1.z.object({
    skillId: zod_1.z.string().describe('The skill ID to install. Can be obtained from the results returned by the search_skills or get_skill tool.'),
    language: zod_1.z.enum(['original', 'translated']).optional().describe('Language version to install.\n- `original`: Original version (usually English), default option\n- `translated`: Translated version (usually Chinese)'),
});
async function installSkillHandler(args) {
    const api = (0, client_js_1.getAPIClient)();
    try {
        const result = await api.installSkill({
            skillId: args.skillId,
            language: args.language || 'original',
        });
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(result, null, 2),
                },
            ],
        };
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to get installation info';
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        error: message,
                        message: 'Failed to get installation info. Please check: 1. Parameter format is correct 2. Network connection is normal',
                    }, null, 2),
                },
            ],
        };
    }
}
function createInstallSkillTool() {
    return {
        name: 'install_skill',
        description: 'Get installation methods for a skill.\n\nUse cases:\n- When you need to install a skill',
        inputSchema: {
            type: 'object',
            properties: {
                skillId: {
                    type: 'string',
                    description: 'The skill ID to install. Can be obtained from the results returned by the search_skills or get_skill tool.',
                },
                language: {
                    type: 'string',
                    enum: ['original', 'translated'],
                    description: 'Language version to install.\n- `original`: Original version (usually English), default option\n- `translated`: Translated version (usually Chinese)',
                },
            },
            required: ['skillId'],
        },
    };
}
//# sourceMappingURL=install.js.map