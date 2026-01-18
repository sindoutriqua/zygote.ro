import type { StructureTemplate, StructureNode, ProjectConfig } from './types';

// Helper to create a file node
const file = (name: string, comment?: string, content: string = ''): StructureNode => ({
    type: 'file',
    name,
    comment,
    content,
});

// Helper to create a dir node
const dir = (name: string, children: StructureNode[] = [], comment?: string): StructureNode => ({
    type: 'dir',
    name,
    children,
    comment,
});

// --- Base Templates ---

export const baseTemplate: StructureTemplate = {
    nodes: [
        file('README.md', 'Project documentation and setup instructions', '# Project Name\n\nDescription...'),
        file('.gitignore', 'Git ignore rules', 'node_modules/\ndist/\n.env'),
    ],
};

// --- Language Templates ---

export const languageTemplates: Record<string, StructureTemplate> = {
    ts: {
        nodes: [
            dir('src', [
                file('index.ts', 'Entry point'),
            ], 'Source code'),
            file('tsconfig.json', 'TypeScript configuration', '{}'),
            file('package.json', 'Project manifest', '{}'),
        ],
    },
    python: {
        nodes: [
            dir('src', [
                file('__init__.py', 'Package marker'),
                file('main.py', 'Entry point'),
            ], 'Source code'),
            file('requirements.txt', 'Dependencies'),
            file('setup.py', 'Package setup'),
        ],
    },
    rust: {
        nodes: [
            dir('src', [], 'Source code'), // Content populated by project type
            file('Cargo.toml', 'Manifest'),
        ],
    },
    go: {
        nodes: [
            dir('cmd', [
                dir('app', [
                    file('main.go', 'Application entry point')
                ])
            ], 'Application commands'),
            dir('internal', [], 'Private application code'),
            dir('pkg', [], 'Public library code'),
            file('go.mod', 'Module definition'),
        ]
    },
    cpp: {
        nodes: [
            dir('src', [
                file('main.cpp', 'Entry point')
            ], 'Source files'),
            dir('include', [], 'Header files'),
            file('CMakeLists.txt', 'Build configuration')
        ]
    }
};

// --- Project Type Refinements ---

export const projectTypeTemplates: Record<string, (config: ProjectConfig) => StructureTemplate> = {
    library: (config) => {
        if (config.language === 'ts') {
            return {
                nodes: [
                    dir('src', [file('index.ts', 'Library export')]), // Overrides possible main.ts
                ]
            }
        }
        if (config.language === 'rust') {
            return {
                nodes: [
                    dir('src', [file('lib.rs', 'Library root')])
                ]
            }
        }
        return { nodes: [] };
    },
    cli: (config) => {
        // CLI specific additions
        if (config.language === 'ts') {
            return {
                nodes: [
                    dir('bin', [file('cli.js', 'Executable shim')], 'Binary executables')
                ]
            }
        }
        if (config.language === 'rust') {
            return {
                nodes: [
                    dir('src', [file('main.rs', 'Binary entry point')])
                ]
            }
        }
        return { nodes: [] };
    },
    web: (config) => {
        if (config.language === 'ts') {
            return {
                nodes: [
                    dir('public', [file('index.html', 'Entry HTML')], 'Static assets'),
                    dir('src', [
                        file('App.ts', 'Main application component'),
                        file('index.css', 'Global styles')
                    ])
                ]
            }
        }
        return { nodes: [] };
    },
    embedded: (config) => {
        // Embedded typically needs specific config files
        return { nodes: [] };
    }
};


// --- Feature Templates ---

export const featureTemplates: Record<string, StructureTemplate> = {
    tests: {
        nodes: [
            dir('tests', [
                file('example.test.ts', 'Example test file') // Generic name, extension could vary
            ], 'Test suite'),
        ],
    },
    examples: {
        nodes: [
            dir('examples', [
                file('basic-usage.ts', 'Simple usage example')
            ], 'Usage examples')
        ]
    },
    docs: {
        nodes: [
            dir('docs', [], 'Documentation files')
        ]
    },
    ci: {
        nodes: [
            dir('.github', [
                dir('workflows', [
                    file('ci.yml', 'CI pipeline definition', 'name: CI\n...'),
                ]),
            ], 'GitHub Actions'),
        ],
    },
    docker: {
        nodes: [
            file('Dockerfile', 'Container definition', 'FROM node:18\n...'),
            file('.dockerignore', 'Docker ignore rules'),
        ],
    },
};
