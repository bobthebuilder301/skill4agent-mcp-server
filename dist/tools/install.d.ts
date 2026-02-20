import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
export declare const installSkillSchema: z.ZodObject<{
    skillId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    skillId: string;
}, {
    skillId: string;
}>;
export declare function installSkillHandler(args: z.infer<typeof installSkillSchema>): Promise<{
    content: Array<{
        type: 'text';
        text: string;
    }>;
}>;
export declare function createInstallSkillTool(): Tool;
//# sourceMappingURL=install.d.ts.map