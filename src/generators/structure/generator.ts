import type { Generator, GeneratorOutput } from '../types';
import type { ProjectConfig, StructureNode, DirNode, FileNode } from './types';
import { baseTemplate, languageTemplates, projectTypeTemplates, featureTemplates } from './templates';

// Deep merge helper for directory structures
function mergeNodes(existing: StructureNode[], incoming: StructureNode[]): StructureNode[] {
    const result = [...existing];

    for (const newNode of incoming) {
        const existingNodeIndex = result.findIndex(n => n.name === newNode.name);

        if (existingNodeIndex === -1) {
            // New node, just add it
            result.push(newNode);
        } else {
            // Conflict / Merge
            const existingNode = result[existingNodeIndex];

            if (existingNode.type === 'dir' && newNode.type === 'dir') {
                // Merge directories
                existingNode.children = mergeNodes(existingNode.children, newNode.children);
                // Preserve description if existing is missing one
                if (!existingNode.comment && newNode.comment) {
                    existingNode.comment = newNode.comment;
                }
            } else {
                // File conflict or Type mismatch: Overwrite with incoming (last one wins)
                result[existingNodeIndex] = newNode;
            }
        }
    }

    // Sort directories first, then files
    return result.sort((a, b) => {
        if (a.type === b.type) return a.name.localeCompare(b.name);
        return a.type === 'dir' ? -1 : 1;
    });
}

function generateAsciiTree(nodes: StructureNode[], prefix: string = '', isLast: boolean = true): string {
    let output = '';

    nodes.forEach((node, index) => {
        const isLastNode = index === nodes.length - 1;
        const marker = isLastNode ? '└── ' : '├── ';
        const childPrefix = isLastNode ? '    ' : '│   ';

        const comment = node.comment ? ` # ${node.comment}` : '';
        output += `${prefix}${marker}${node.name}${comment}\n`;

        if (node.type === 'dir') {
            output += generateAsciiTree(node.children, `${prefix}${childPrefix}`, isLastNode);
        }
    });

    return output;
}

function flattenFiles(nodes: StructureNode[], pathPrefix: string = ''): { filename: string, content: string, language: string }[] {
    let files: { filename: string, content: string, language: string }[] = [];

    for (const node of nodes) {
        if (node.type === 'file') {
            const ext = node.name.split('.').pop() || 'txt';
            files.push({
                filename: `${pathPrefix}${node.name}`,
                content: node.content || '',
                language: ext === 'ts' || ext === 'js' ? 'typescript' : ext === 'json' ? 'json' : ext === 'md' ? 'markdown' : 'plaintext'
            });
        } else {
            files = files.concat(flattenFiles(node.children, `${pathPrefix}${node.name}/`));
        }
    }

    return files;
}

export const structureGenerator: Generator = {
    id: 'structure',
    name: 'Project Structure',
    description: 'Generate a clean, opinionated folder structure for new projects.',
    inputs: [
        { name: 'projectName', label: 'Project Name', type: 'text', required: true, defaultValue: 'my-project' },
        {
            name: 'type',
            label: 'Project Type',
            type: 'select',
            options: ['library', 'cli', 'web', 'embedded'],
            required: true,
            defaultValue: 'library'
        },
        {
            name: 'language',
            label: 'Language',
            type: 'select',
            options: ['ts', 'python', 'rust', 'go', 'cpp'],
            required: true,
            defaultValue: 'ts'
        },
        {
            name: 'features',
            label: 'Features',
            type: 'checkbox',
            // In a real UI we might need multi-select, for now assume keys map to multiple inputs or comma-separated
            // Ideally the UI handles a list of checkboxes. 
            // The GeneratorInput interface might need to be richer for checkboxes groups, but for now we'll simulate.
            options: ['tests', 'examples', 'docs', 'ci', 'docker']
        }
    ],
    generate: (data: Record<string, any>) => {
        const config: ProjectConfig = {
            projectName: data.projectName || 'my-project',
            type: data.type || 'library',
            language: data.language || 'ts',
            features: {
                tests: data.tests || false,
                examples: data.examples || false,
                docs: data.docs || false,
                ci: data.ci || false,
                docker: data.docker || false
            }
        };

        // 1. Start with base
        let nodes = [...baseTemplate.nodes];

        // 2. Merge Language
        if (languageTemplates[config.language]) {
            nodes = mergeNodes(nodes, languageTemplates[config.language].nodes);
        }

        // 3. Merge Project Type
        if (projectTypeTemplates[config.type]) {
            const typeTemplate = projectTypeTemplates[config.type](config);
            nodes = mergeNodes(nodes, typeTemplate.nodes);
        }

        // 4. Merge Features
        // Note: The UI usually passes boolean flags for features.
        // We iterate our known features and check if they are in the config.
        Object.keys(featureTemplates).forEach(featureKey => {
            // @ts-ignore
            if (config.features[featureKey]) { // Accessing dynamic key on matched structure
                nodes = mergeNodes(nodes, featureTemplates[featureKey].nodes);
            }
        });

        // 5. Generate Output
        const treeFile = {
            filename: 'STRUCTURE.md',
            content: `# Project Structure: ${config.projectName}\n\n\`\`\`\n${config.projectName}/\n${generateAsciiTree(nodes)}\`\`\``,
            language: 'markdown'
        };

        const generatedFiles = flattenFiles(nodes);
        generatedFiles.unshift(treeFile);

        return {
            files: generatedFiles
        };
    }
};
