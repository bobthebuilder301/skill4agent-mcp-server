import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { getAPIClient } from '../api/client.js';

// Zod schema for get_skill
export const getSkillSchema = z.object({
  skillId: z.string().describe('The skill ID to query. Can be obtained from the results returned by the search_skills tool.'),
});

export async function getSkillHandler(
  args: z.infer<typeof getSkillSchema>
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const api = getAPIClient();

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
  } catch (error) {
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

export function createGetSkillTool(): Tool {
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
