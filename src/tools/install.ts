import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { getAPIClient } from '../api/client.js';

export const installSkillSchema = z.object({
  skillId: z.string().describe('The skill ID to install. Can be obtained from the results returned by the search_skills or get_skill tool.'),
});

export async function installSkillHandler(
  args: z.infer<typeof installSkillSchema>
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const api = getAPIClient();

  try {
    const result = await api.installSkill({
      skillId: args.skillId,
    });

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
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

export function createInstallSkillTool(): Tool {
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
      },
      required: ['skillId'],
    },
  };
}
