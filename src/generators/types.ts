export interface GeneratorInput {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'checkbox' | 'select';
  options?: string[]; // For select
  defaultValue?: any;
  placeholder?: string;
  required?: boolean;
}

export interface GeneratorOutput {
  files: {
    filename: string;
    content: string;
    language: string; // e.g., 'markdown', 'json'
  }[];
}

export type ProjectType = 'library' | 'cli' | 'web' | 'embedded';

export interface ReadmeSection {
  id: string;
  title: string;
  enabled: boolean;
  defaultFor: ProjectType[];
}

export interface Generator {
  id: string;
  name: string;
  description: string;
  inputs: GeneratorInput[];
  generate: (data: Record<string, any>) => GeneratorOutput;
}
