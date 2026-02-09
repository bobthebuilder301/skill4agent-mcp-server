import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
export declare const getSkillSchema: z.ZodObject<{
    skillId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    skillId: string;
}, {
    skillId: string;
}>;
export declare function getSkillHandler(args: z.infer<typeof getSkillSchema>): Promise<{
    content: Array<{
        type: 'text';
        text: string;
    }>;
}>;
export declare function createGetSkillTool(): Tool;
//# sourceMappingURL=detail.d.ts.map