import type { Generator } from './types';
import { readmeGenerator } from './readme/generator';
import { gitignoreGenerator } from './gitignore/generator';
import { structureGenerator } from './structure/generator';

export const generators: Record<string, Generator> = {
    readme: readmeGenerator,
    gitignore: gitignoreGenerator,
    structure: structureGenerator,
};

export function getGenerator(id: string): Generator | undefined {
    return generators[id];
}

export function getAllGenerators(): Generator[] {
    return Object.values(generators);
}
