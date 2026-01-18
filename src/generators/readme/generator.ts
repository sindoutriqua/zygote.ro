import type { Generator, GeneratorOutput, ProjectType, ReadmeSection } from '../types';

export const readmeGenerator: Generator = {
    id: 'readme',
    name: 'README.md Generator',
    description: 'Generate a professional README.md for your GitHub project.',
    inputs: [
        {
            name: 'projectType',
            label: 'Project Type',
            type: 'select',
            options: ['library', 'cli', 'web', 'embedded'],
            defaultValue: 'library',
            required: true,
        },
        {
            name: 'projectName',
            label: 'Project Name',
            type: 'text',
            placeholder: 'e.g., My Awesome Project',
            required: true,
        },
        {
            name: 'description',
            label: 'Short Description',
            type: 'textarea',
            placeholder: 'What does this project do?',
            required: true,
        },
        {
            name: 'sections',
            label: 'Sections',
            type: 'checkbox', // This will need to be handled specially in the UI, or we can use a custom type if needed.
            // For now we'll assume the UI can handle 'checkbox' with dynamic options provided in the generator or inferred.
            // Actually, 'checkbox' type in generic GeneratorInput might be simple boolean or multi-select.
            // Let's stick to the current plan: the UI will need to handle section toggling.
            // But wait, the standard input types are limited. 
            // Let's treat 'sections' as a special input hidden from the standard form loop if needed, 
            // OR we'll just pass it as data.
            // However, to make it configurable via the standard form, we need a way to pass the list of sections.
            // For this iteration, let's assume the UI will explicitly handle 'sections' selection based on the `readmeGenerator` properties (which we might need to expose).
            // Instead of hacking the schema, let's just make sure we receive 'sections' in the data.
            // We'll add a dummy input for it if we want it to show up, OR we rely on the custom UI component to inject it.
            // Since we are updating ReadmeUi.astro specifically, we can control how it sends data.
            // We'll add 'installation', 'usage' etc as regular inputs but make them dependent on sections?
            // No, the requirements say "Toggle sections on/off".
            // Let's keep the content inputs (installation, usage, etc) but allow the user to toggle whether they are included.
            options: ['overview', 'installation', 'usage', 'configuration', 'api', 'cli', 'examples', 'license', 'contributing'],
            // We'll use a multi-select for sections to include
        },
        {
            name: 'installation',
            label: 'Installation Command',
            type: 'text',
            placeholder: 'npm install my-project',
            defaultValue: 'npm install',
        },
        {
            name: 'usage',
            label: 'Usage Example',
            type: 'textarea',
            placeholder: 'import { foo } from "bar";',
        },
        {
            name: 'license',
            label: 'License',
            type: 'select',
            options: ['MIT', 'Apache-2.0', 'GPL-3.0', 'Unlicense'],
            defaultValue: 'MIT',
        },
    ],
    generate: (data: Record<string, any>): GeneratorOutput => {
        const {
            projectType = 'library',
            projectName,
            description,
            installation,
            usage,
            license,
            enabledSections // We expect the UI to pass this array of section IDs
        } = data;

        // Default enabled sections if not provided (fallback)
        const activeSections = enabledSections || getDefaultSectionsForType(projectType);

        const files = [];
        const readmeLines: string[] = [];

        // Header (Always included)
        readmeLines.push(`# ${projectName || 'Project Name'}`);
        if (description) readmeLines.push(`\n${description}`);

        // Helpers to check if section is enabled
        const isEnabled = (id: string) => activeSections.includes(id);

        if (isEnabled('installation') && installation) {
            readmeLines.push(`\n## Installation\n\n\`\`\`bash\n${installation}\n\`\`\``);
        }

        if (isEnabled('usage') && usage) {
            readmeLines.push(`\n## Usage\n\n\`\`\`javascript\n${usage}\n\`\`\``);
        }

        // API (Library specific example)
        if (isEnabled('api') && projectType === 'library') {
            readmeLines.push(`\n## API Reference\n\nSee [documentation](docs/) for more details.`);
        }

        // CLI Options (CLI specific example)
        if (isEnabled('cli') && projectType === 'cli') {
            readmeLines.push(`\n## CLI Options\n\nRun \`${projectName} --help\` to see all options.`);
        }

        if (isEnabled('license') && license) {
            readmeLines.push(`\n## License\n\nThis project is licensed under the ${license} License.`);

            // Generate LICENSE file
            files.push({
                filename: 'LICENSE',
                content: `The ${license} License (See full text at https://opensource.org/licenses/${license})`,
                language: 'text'
            });
        }

        if (isEnabled('contributing')) {
            readmeLines.push(`\n## Contributing\n\nPlease see [CONTRIBUTING.md](CONTRIBUTING.md) for details.`);

            // Generate CONTRIBUTING.md
            files.push({
                filename: 'CONTRIBUTING.md',
                content: `# Contributing to ${projectName}\n\n1. Fork the repo\n2. Create a branch\n3. Submit a PR`,
                language: 'markdown'
            });
        }

        files.unshift({
            filename: 'README.md',
            content: readmeLines.join('\n'),
            language: 'markdown',
        });

        return { files };
    },
};

// Helper: Define sections and their defaults
export const SECTIONS: ReadmeSection[] = [
    { id: 'overview', title: 'Overview', enabled: true, defaultFor: ['library', 'cli', 'web', 'embedded'] },
    { id: 'installation', title: 'Installation', enabled: true, defaultFor: ['library', 'cli', 'web'] },
    { id: 'usage', title: 'Usage', enabled: true, defaultFor: ['library', 'cli', 'web'] },
    { id: 'configuration', title: 'Configuration', enabled: false, defaultFor: ['cli', 'web'] },
    { id: 'api', title: 'API Reference', enabled: false, defaultFor: ['library'] },
    { id: 'cli', title: 'CLI Options', enabled: false, defaultFor: ['cli'] },
    { id: 'examples', title: 'Examples', enabled: false, defaultFor: ['library'] },
    { id: 'license', title: 'License', enabled: true, defaultFor: ['library', 'cli', 'web', 'embedded'] },
    { id: 'contributing', title: 'Contributing', enabled: true, defaultFor: ['library', 'cli'] },
];

export function getDefaultSectionsForType(type: ProjectType): string[] {
    return SECTIONS.filter(s => s.defaultFor.includes(type)).map(s => s.id);
}
