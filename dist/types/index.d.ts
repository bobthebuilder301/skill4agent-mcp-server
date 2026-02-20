export interface SearchSkillsParams {
    keyword: string;
    categories?: string[];
    limit?: number;
}
export interface SkillSearchResult {
    skillId: string;
    skillName: string;
    description: string;
    descriptionTranslated: string;
    categoryName: string;
    tags: string;
    tagsCn: string;
    totalInstalls: number;
    relevance: number;
}
export interface SearchSkillsResponse {
    skills: SkillSearchResult[];
    total: number;
    query: string;
    categories?: string[];
    suggestions?: string[];
    warnings?: string[];
}
export interface GetSkillParams {
    skillId: string;
}
export interface GetSkillResponse {
    skill: {
        skillId: string;
        skillName: string;
        categoryName: string;
        tags: string;
        tagsCn: string;
        totalInstalls: number;
        content: string | null;
    };
    tip: string;
}
export interface InstallSkillParams {
    skillId: string;
}
export interface InstallSkillResponse {
    skillId: string;
    skillName: string;
    installMethods: {
        npx: {
            description: string;
            command: Array<{
                english_version?: string;
                chinese_version?: string;
            }>;
            result: string;
        };
        download: {
            description: string;
            url: Array<{
                english_version?: string;
                chinese_version?: string;
            }>;
            result: string;
        };
    };
}
export interface APIError {
    error: string;
    details?: string;
    suggestion?: string;
}
//# sourceMappingURL=index.d.ts.map