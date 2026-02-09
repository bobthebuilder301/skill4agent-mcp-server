"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSkillSchema = void 0;
exports.getSkillHandler = getSkillHandler;
exports.createGetSkillTool = createGetSkillTool;
const zod_1 = require("zod");
const client_js_1 = require("../api/client.js");
// Zod schema for get_skill
exports.getSkillSchema = zod_1.z.object({
    skillId: zod_1.z.string().describe('The skill ID to query. Can be obtained from the results returned by the search_skills tool.'),
});
async function getSkillHandler(args) {
    const api = (0, client_js_1.getAPIClient)();
    try {
        const result = await api.getSkill({ skillId: args.skillId });
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
        const message = error instanceof Error ? error.message : 'Failed to retrieve';
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        error: message,
                        message: 'Failed to get skill. Please check: 1. Parameter format is correct 2. Network connection is normal',
                    }, null, 2),
                },
            ],
        };
    }
}
function createGetSkillTool() {
    return {
        name: 'get_skill',
        description: 'Get detailed information about a skill, including the complete SKILL.md content.\n\nUse cases:\n- When you want to learn detailed information about a skill\n- When you need to view the core documentation (SKILL.md) of a skill\n- Before recommending or installing a skill, you need to confirm the detailed information to analyze whether it meets the requirements',
        inputSchema: {
            type: 'object',
            properties: {
                skillId: {
                    type: 'string',
                    description: 'The skill ID to query. Can be obtained from the results returned by the search_skills tool.',
                },
            },
            required: ['skillId'],
        },
    };
}
//# sourceMappingURL=detail.js.map