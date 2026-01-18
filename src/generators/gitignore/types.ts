
export interface GitignoreRuleSet {
    /**
     * Layout-friendly id (e.g. 'macos', 'node')
     */
    id: string;
    /**
     * Human readable name (e.g. 'macOS', 'Node.js')
     */
    name: string;
    /**
     * The actual gitignore patterns
     */
    content: string[];
}

export type GitignoreCategory = 'os' | 'language' | 'toolchain' | 'framework' | 'common' | 'project';

export interface RatedRuleSet extends GitignoreRuleSet {
    category: GitignoreCategory;
}
