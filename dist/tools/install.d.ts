import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
export declare const installSkillSchema: z.ZodObject<{
    skillId: z.ZodString;
    language: z.ZodOptional<z.ZodEnum<["original", "translated"]>>;
}, "strip", z.ZodTypeAny, {
    skillId: string;
    language?: "original" | "translated" | undefined;
}, {
    skillId: string;
    language?: "original" | "translated" | undefined;
}>;
export declare function installSkillHandler(args: z.infer<typeof installSkillSchema>): Promise<{
    content: Array<{
        type: 'text';
        text: string;
    }>;
}>;
export declare function createInstallSkillTool(): Tool;
//# sourceMappingURL=install.d.ts.map