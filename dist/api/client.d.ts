import { SearchSkillsParams, SearchSkillsResponse, GetSkillParams, GetSkillResponse, InstallSkillParams, InstallSkillResponse } from '../types/index.js';
export declare class APIClient {
    private client;
    private apiUrl;
    constructor(apiUrl?: string);
    searchSkills(params: SearchSkillsParams): Promise<SearchSkillsResponse>;
    getSkill(params: GetSkillParams): Promise<GetSkillResponse>;
    installSkill(params: InstallSkillParams): Promise<InstallSkillResponse>;
    private handleError;
}
export declare function getAPIClient(): APIClient;
//# sourceMappingURL=client.d.ts.map