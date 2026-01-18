import type { GitignoreRuleSet } from '../types';

export const commonRules: Record<string, GitignoreRuleSet> = {
    logs: {
        id: 'logs',
        name: 'Logs',
        content: [
            '*.log',
            'logs/',
            '*.log.*',
            'npm-debug.log*',
            'yarn-debug.log*',
            'yarn-error.log*',
        ],
    },
    build_artifacts: {
        id: 'build_artifacts',
        name: 'Build Artifacts',
        content: [
            'dist/',
            'build/',
            'out/',
            'target/',
            'bin/',
            'obj/',
        ],
    },
    editors: {
        id: 'editors',
        name: 'Editor Configs',
        content: [
            '.vscode/',
            '!.vscode/extensions.json',
            '!.vscode/launch.json',
            '!.vscode/tasks.json',
            '!.vscode/settings.json',
            '.idea/',
            '*.sublime-workspace',
            '*.sublime-project',
            '.settings/',
            '.classpath',
            '.project',
        ],
    },
    env: {
        id: 'env',
        name: 'Environment Files',
        content: [
            '.env',
            '.env.local',
            '.env.*.local',
            '*.env',
        ],
    },
};
