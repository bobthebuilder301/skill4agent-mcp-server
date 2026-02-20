import axios, { AxiosInstance } from 'axios';
import {
  SearchSkillsParams,
  SearchSkillsResponse,
  GetSkillParams,
  GetSkillResponse,
  InstallSkillParams,
  InstallSkillResponse,
  APIError,
} from '../types/index.js';

const DEFAULT_API_URL = 'https://skill4agent.com/api/mcp';

export class APIClient {
  private client: AxiosInstance;
  private apiUrl: string;

  constructor(apiUrl?: string) {
    this.apiUrl = apiUrl || process.env.SKILL4AGENT_API_URL || DEFAULT_API_URL;
    this.client = axios.create({
      baseURL: this.apiUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async searchSkills(params: SearchSkillsParams): Promise<SearchSkillsResponse> {
    try {
      const response = await this.client.post<SearchSkillsResponse>(
        '/search',
        {
          keyword: params.keyword,
          categories: params.categories,
          limit: params.limit || 10,
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw this.handleError(error);
      }
      throw new Error('Failed to search skills: Unknown error');
    }
  }

  async getSkill(params: GetSkillParams): Promise<GetSkillResponse> {
    try {
      const response = await this.client.get<GetSkillResponse>(
        `/skills/${encodeURIComponent(params.skillId)}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw this.handleError(error);
      }
      throw new Error('Failed to get skill: Unknown error');
    }
  }

  async installSkill(params: InstallSkillParams): Promise<InstallSkillResponse> {
    try {
      const response = await this.client.get<InstallSkillResponse>(
        `/install?skillId=${encodeURIComponent(params.skillId)}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw this.handleError(error);
      }
      throw new Error('Failed to install skill: Unknown error');
    }
  }

  private handleError(error: axios.AxiosError<APIError>): Error {
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

let apiClient: APIClient | null = null;

export function getAPIClient(): APIClient {
  if (!apiClient) {
    apiClient = new APIClient();
  }
  return apiClient;
}
