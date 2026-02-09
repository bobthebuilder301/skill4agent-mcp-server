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
    language?: 'original' | 'translated';
}
export interface InstallSkillResponse {
    skillId: string;
    skillName: string;
    packageType: string;
    fileSize: number;
    downloadUrl: string;
    npxCommand: string;
    installPath: string;
    note?: string;
    noteDetail?: string;
    requestedLanguage?: string;
    actualLanguage?: string;
}
export interface APIError {
    error: string;
    details?: string;
    suggestion?: string;
}
//# sourceMappingURL=index.d.ts.map