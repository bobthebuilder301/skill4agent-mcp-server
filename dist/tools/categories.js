"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALL_CATEGORIES = void 0;
exports.updateSearchCategoriesEnum = updateSearchCategoriesEnum;
const zod_1 = require("zod");
const client_js_1 = require("../api/client.js");
const ALL_CATEGORIES = [
    { nameCn: '前端开发', nameEn: 'Frontend Development' },
    { nameCn: '人工智能', nameEn: 'AI & Machine Learning' },
    { nameCn: '代码质量', nameEn: 'Code Quality' },
    { nameCn: '后端开发', nameEn: 'Backend Development' },
    { nameCn: 'DevOps与云服务', nameEn: 'DevOps & Cloud Services' },
    { nameCn: '工具与功效', nameEn: 'Tools & Utilities' },
    { nameCn: '测试保障', nameEn: 'Testing & QA' },
    { nameCn: '数据处理', nameEn: 'Data Processing' },
    { nameCn: '安全与合规', nameEn: 'Security & Compliance' },
    { nameCn: '产品与设计', nameEn: 'Product & Design' },
    { nameCn: '项目管理', nameEn: 'Project Management' },
    { nameCn: '移动开发', nameEn: 'Mobile Development' },
    { nameCn: '版本控制', nameEn: 'Version Control' },
    { nameCn: '营销与增长', nameEn: 'Marketing & Growth' },
    { nameCn: '平台服务', nameEn: 'Platform Services' },
    { nameCn: '文档与写作', nameEn: 'Documentation & Writing' },
    { nameCn: '文档处理', nameEn: 'Document Processing' },
    { nameCn: '自动化', nameEn: 'Automation' },
    { nameCn: '未分类', nameEn: 'Uncategorized' },
];
exports.ALL_CATEGORIES = ALL_CATEGORIES;
const CATEGORY_NAMES_CN = ALL_CATEGORIES.map((cat) => cat.nameCn);
const CATEGORY_NAMES_EN = ALL_CATEGORIES.map((cat) => cat.nameEn);
function updateSearchCategoriesEnum(server) {
    server.registerTool('search_skills', {
        title: 'Search Skills',
        description: `搜索 AI skills。可以按关键词搜索，并可选按分类筛选。返回匹配 skills 的列表，按相关度排序。

**可用分类（支持中文或英文）：**
${ALL_CATEGORIES.map((cat) => `- ${cat.nameCn} / ${cat.nameEn}`).join('\n')}

**使用建议：**
- 关键词建议简洁（如 "React"、"PDF"、"SEO"）
- 可以使用中文、英文或中英混合关键词
- 分类筛选可选，建议使用中文分类名
- 建议先不加分类筛选，如果结果太多再加`,
        inputSchema: {
            keyword: zod_1.z.string().describe('搜索关键词。可以是英文、中文或中英混合。'),
            categories: zod_1.z
                .array(zod_1.z.string())
                .optional()
                .describe(`可选的分类筛选条件。支持中文和英文分类名。\n\n可用分类：\n${CATEGORY_NAMES_CN.map((name) => `- ${name}`).join('\n')}`),
            limit: zod_1.z.number().optional().describe('返回结果数量限制。默认 10，最大 100。'),
        },
    }, async ({ keyword, categories, limit }) => {
        const api = (0, client_js_1.getAPIClient)();
        try {
            const result = await api.searchSkills({
                keyword,
                categories,
                limit: limit || 10,
            });
            let text = `找到 ${result.total} 个相关 skills：\n\n`;
            for (const skill of result.skills) {
                text += `## ${skill.skillName}\n`;
                text += `ID: \`${skill.skillId}\`\n`;
                text += `分类: ${skill.categoryName}\n`;
                text += `下载量: ${skill.totalInstalls.toLocaleString()}\n`;
                text += `标签: ${skill.tagsCn}\n`;
                text += `说明: ${skill.descriptionTranslated}\n`;
                text += `---\n`;
            }
            if (result.suggestions && result.suggestions.length > 0) {
                text += `\n💡 搜索建议：\n`;
                for (const suggestion of result.suggestions) {
                    text += `- ${suggestion}\n`;
                }
            }
            if (result.warnings && result.warnings.length > 0) {
                text += `\n⚠️ 警告：\n`;
                for (const warning of result.warnings) {
                    text += `- ${warning}\n`;
                }
            }
            return {
                content: [
                    {
                        type: 'text',
                        text,
                    },
                ],
            };
        }
        catch (error) {
            const message = error instanceof Error ? error.message : '搜索失败';
            return {
                content: [
                    {
                        type: 'text',
                        text: `❌ 搜索失败：${message}`,
                    },
                ],
            };
        }
    });
}
//# sourceMappingURL=categories.js.map