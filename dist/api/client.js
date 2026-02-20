"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIClient = void 0;
exports.getAPIClient = getAPIClient;
const axios_1 = __importDefault(require("axios"));
const DEFAULT_API_URL = 'https://skill4agent.com/api/mcp';
class APIClient {
    constructor(apiUrl) {
        this.apiUrl = apiUrl || process.env.SKILL4AGENT_API_URL || DEFAULT_API_URL;
        this.client = axios_1.default.create({
            baseURL: this.apiUrl,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    async searchSkills(params) {
        try {
            const response = await this.client.post('/search', {
                keyword: params.keyword,
                categories: params.categories,
                limit: params.limit || 10,
            });
            return response.data;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                throw this.handleError(error);
            }
            throw new Error('Failed to search skills: Unknown error');
        }
    }
    async getSkill(params) {
        try {
            const response = await this.client.get(`/skills/${encodeURIComponent(params.skillId)}`);
            return response.data;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                throw this.handleError(error);
            }
            throw new Error('Failed to get skill: Unknown error');
        }
    }
    async installSkill(params) {
        try {
            const response = await this.client.get(`/install?skillId=${encodeURIComponent(params.skillId)}`);
            return response.data;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                throw this.handleError(error);
            }
            throw new Error('Failed to install skill: Unknown error');
        }
    }
    handleError(error) {
        if (error.response?.data?.error) {
            const { error: message, details, suggestion } = error.response.data;
            let fullMessage = message;
            if (details) {
                fullMessage += ` Details: ${details}`;
            }
            if (suggestion) {
                fullMessage += ` Suggestion: ${suggestion}`;
            }
            return new Error(fullMessage);
        }
        if (error.response?.status) {
            return new Error(`HTTP ${error.response.status}: ${error.message}`);
        }
        if (error.code === 'ECONNABORTED') {
            return new Error('Request timeout: The API server did not respond in time');
        }
        return new Error(`Network error: ${error.message}`);
    }
}
exports.APIClient = APIClient;
let apiClient = null;
function getAPIClient() {
    if (!apiClient) {
        apiClient = new APIClient();
    }
    return apiClient;
}
//# sourceMappingURL=client.js.map