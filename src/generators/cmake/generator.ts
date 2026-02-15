import type { Generator, GeneratorOutput } from '../types';

export const cmakeGenerator: Generator = {
    id: 'cmake',
    name: 'CMakeLists.txt Generator',
    description: 'Generate CMakeLists.txt for standard C++ or ESP-IDF projects.',
    inputs: [
        {
            name: 'projectType',
            label: 'Project Type',
            type: 'select',
            options: ['executable', 'library', 'esp-idf'],
            defaultValue: 'executable',
            required: true,
        },
        {
            name: 'projectName',
            label: 'Project Name',
            type: 'text',
            placeholder: 'e.g., my_project',
            defaultValue: 'my_project',
            required: true,
        },
        {
            name: 'cmakeVersion',
            label: 'Minimum CMake Version',
            type: 'text',
            defaultValue: '3.10',
            required: true,
        },
        {
            name: 'cppStandard',
            label: 'C++ Standard',
            type: 'select',
            options: ['11', '14', '17', '20', '23'],
            defaultValue: '17',
            required: true,
        },
        {
            name: 'sources',
            label: 'Source Files (space separated)',
            type: 'text',
            defaultValue: 'main.cpp',
            placeholder: 'main.cpp src/utils.cpp',
        },
        {
            name: 'includeDirs',
            label: 'Include Directories (space separated)',
            type: 'text',
            defaultValue: 'include',
            placeholder: 'include src',
        },
    ],
    generate: (data: Record<string, any>): GeneratorOutput => {
        const {
            projectType = 'executable',
            projectName = 'my_project',
            cmakeVersion = '3.10',
            cppStandard = '17',
            sources = 'main.cpp',
            includeDirs = 'include',
        } = data;

        const files = [];

        if (projectType === 'esp-idf') {
            // ESP-IDF Style
            const content = `cmake_minimum_required(VERSION ${cmakeVersion})

include($ENV{IDF_PATH}/tools/cmake/project.cmake)
project(${projectName})
`;
            files.push({
                filename: 'CMakeLists.txt',
                content: content,
                language: 'cmake',
            });

            // Usually ESP-IDF also has a main/CMakeLists.txt
            const mainContent = `idf_component_register(SRCS "${sources}"
                    INCLUDE_DIRS "${includeDirs}")
`;
            files.push({
                filename: 'main/CMakeLists.txt',
                content: mainContent,
                language: 'cmake',
            });
        } else {
            // Standard CMake
            let content = `cmake_minimum_required(VERSION ${cmakeVersion})
project(${projectName} LANGUAGES CXX)

set(CMAKE_CXX_STANDARD ${cppStandard})
set(CMAKE_CXX_STANDARD_REQUIRED ON)

`;

            const sourceList = sources.split(/\s+/).filter(Boolean).join('\n    ');
            const includeList = includeDirs.split(/\s+/).filter(Boolean).join('\n    ');

            if (projectType === 'library') {
                content += `add_library(${projectName} STATIC
    ${sourceList}
)
`;
            } else {
                content += `add_executable(${projectName}
    ${sourceList}
)
`;
            }

            if (includeList) {
                content += `
target_include_directories(${projectName} PRIVATE
    ${includeList}
)
`;
            }

            files.push({
                filename: 'CMakeLists.txt',
                content: content,
                language: 'cmake',
            });
        }

        return { files };
    },
};
