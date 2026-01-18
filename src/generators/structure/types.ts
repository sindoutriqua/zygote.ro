
export type ProjectType = 'library' | 'cli' | 'web' | 'embedded';
export type Language = 'ts' | 'python' | 'rust' | 'go' | 'cpp';
export type Builder = 'npm' | 'pnpm' | 'cargo' | 'make' | 'cmake' | 'platformio' | 'go' | 'none';

export interface ProjectConfig {
    projectName: string;
    type: ProjectType;
    language: Language;
    builder?: Builder;
    features: {
        tests: boolean;
        examples: boolean;
        docs: boolean;
        ci: boolean;
        docker: boolean;
    };
}

export type FileNode = {
    type: 'file';
    name: string; // The file name
    content?: string; // Optional default content
    comment?: string; // Intent/description for the structure view
};

export type DirNode = {
    type: 'dir';
    name: string;
    children: (FileNode | DirNode)[];
    comment?: string;
};

export type StructureNode = FileNode | DirNode;

export interface StructureTemplate {
    // A template is essentially a partial list of nodes to be merged into the root
    nodes: StructureNode[];
}
