import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
export declare const searchSkillsSchema: z.ZodObject<{
    keyword: z.ZodString;
    categories: z.ZodOptional<z.ZodArray<z.ZodEnum<[string, ...string[]]>, "many">>;
    limit: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    keyword: string;
    categories?: string[] | undefined;
    limit?: number | undefined;
}, {
    keyword: string;
    categories?: string[] | undefined;
    limit?: number | undefined;
}>;
export declare function searchSkillsHandler(args: z.infer<typeof searchSkillsSchema>): Promise<{
    content: Array<{
        type: 'text';
        text: string;
    }>;
}>;
export declare function createSearchSkillsTool(): Tool;
//# sourceMappingURL=search.d.ts.map