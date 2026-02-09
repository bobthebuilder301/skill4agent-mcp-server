import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { getAPIClient } from '../api/client.js';

const CATEGORIES = [
  'Frontend Development', '前端开发',
  'AI & Machine Learning', '人工智能',
  'Code Quality', '代码质量',
  'Backend Development', '后端开发',
  'DevOps & Cloud Services', 'DevOps与云服务',
  'Tools & Utilities', '工具与效率',
  'Testing & QA', '测试保障',
  'Data Processing', '数据处理',
  'Security & Compliance', '安全与合规',
  'Product & Design', '产品与设计',
  'Project Management', '项目管理',
  'Mobile Development', '移动开发',
  'Version Control', '版本控制',
  'Marketing & Growth', '营销与增长',
  'Platform Services', '平台服务',
  'Documentation & Writing', '文档与写作',
  'Document Processing', '文档处理',
  'Automation', '自动化',
];

// Zod schema for search_skills
export const searchSkillsSchema = z.object({
  keyword: z.string().describe('Search keyword. Can be English, Chinese, or mixed. (e.g., "React", "n8n-workflow", "frontend development", "copywriting", "langchain docs")'),
  categories: z.array(z.enum(CATEGORIES as [string, ...string[]])).optional().describe('Optional category filter. Supports both English and Chinese category names. Can pass multiple categories. (e.g., ["Frontend Development", "AI & Machine Learning"])'),
  limit: z.number().min(1).max(100).optional().describe('Limit the number of results returned. Default is 10, maximum is 100. Set according to your needs to avoid returning too many results.'),
});

export async function searchSkillsHandler(
  args: z.infer<typeof searchSkillsSchema>
): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const api = getAPIClient();

  try {
    const result = await api.searchSkills({
      keyword: args.keyword,
      categories: args.categories,
      limit: args.limit || 10,
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
    const message = error instanceof Error ? error.message : 'Search failed';
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            error: message,
            message: 'Search failed. Please check: 1. Parameter format is correct 2. Network connection is normal',
          }, null, 2),
        },
      ],
    };
  }
}

export function createSearchSkillsTool(): Tool {
  return {
    name: 'search_skills',
    description: 'Search for Skills by keyword, with optional category filtering. Returns a list of matching skills.\n\nUse cases:\n- When looking for skills in a specific domain\n- When unsure what skill is needed but have a general direction',
    inputSchema: {
      type: 'object',
      properties: {
        keyword: {
          type: 'string',
          description: 'Search keyword. Can be English, Chinese, or mixed. (e.g., "React", "n8n-workflow", "frontend development", "copywriting", "langchain docs")',
        },
        categories: {
          type: 'array',
          items: { 
            type: 'string',
            enum: CATEGORIES,
          },
          description: 'Optional category filter. Supports both English and Chinese category names. Can pass multiple categories. (e.g., ["Frontend Development", "AI & Machine Learning"])',
        },
        limit: {
          type: 'number',
          minimum: 1,
          maximum: 100,
          description: 'Limit the number of results returned. Default is 10, maximum is 100. Set according to your needs to avoid returning too many results.',
        },
      },
      required: ['keyword'],
    },
  };
}
