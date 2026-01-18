import type { GitignoreRuleSet } from '../types';

export const frameworkRules: Record<string, GitignoreRuleSet> = {
    node: {
        id: 'node',
        name: 'Node.js',
        content: [
            'node_modules/',
            'npm-debug.log*',
            'yarn-debug.log*',
            'yarn-error.log*',
            'pnpm-debug.log*',
            '.npm/',
        ],
    },
    react: {
        id: 'react',
        name: 'React',
        content: [
            'build/',
            'dist/',
        ],
    },
    vite: {
        id: 'vite',
        name: 'Vite',
        content: [
            'dist/',
            '.env',
            '.env.local',
            '.env.development.local',
            '.env.test.local',
            '.env.production.local',
            'npm-debug.log*',
            'yarn-debug.log*',
            'yarn-error.log*',
            'pnpm-debug.log*',
        ],
    },
    nextjs: {
        id: 'nextjs',
        name: 'Next.js',
        content: [
            '.next/',
            'out/',
            'build/',
            'dist/',
            'next-env.d.ts',
            '.vercel/',
        ]
    },
    arduino: {
        id: 'arduino',
        name: 'Arduino',
        content: [
            '*.elf',
            '*.hex',
            '*.ino.cpp',
            '*.ino.d',
        ],
    },
    platformio: {
        id: 'platformio',
        name: 'PlatformIO',
        content: [
            '.pio/',
            '.pioenvs/',
            '.piolibdeps/',
            '.clang_complete',
            '.gcc-flags.json',
        ],
    },
};
