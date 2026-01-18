
import { gitignoreGenerator } from './generator';

function test(name: string, input: any) {
    console.log(`\n=== TEST: ${name} ===`);
    console.log(`Input:`, JSON.stringify(input, null, 2));
    const result = gitignoreGenerator.generate(input);
    const content = result.files[0].content;
    console.log(`Output .gitignore:\n------------------\n${content}------------------`);
}

// 1. Library + Rust + macOS
test('Library + Rust + macOS', {
    projectType: 'library',
    languages: ['rust'],
    os: ['macos'],
    frameworks: [],
    extras: []
});

// 2. Web + Node.js + Windows
test('Web + Node.js + Windows', {
    projectType: 'web',
    languages: ['javascript'], // Node is often implied or separate
    frameworks: ['node'],
    os: ['windows'],
    extras: ['logs']
});

// 3. Deduplication Check
test('Deduplication Check (Node + JS overlapping)', {
    projectType: 'web',
    languages: ['javascript'],
    frameworks: ['node'], // Both might try to ignore node_modules
    os: [],
    extras: []
});

// 4. Rust CLI (Cargo.lock should be ABSENT)
test('Rust CLI', {
    projectType: 'cli',
    languages: ['rust'],
    frameworks: [],
    os: [],
    extras: []
});

// 5. Rust Library (Cargo.lock should be PRESENT)
test('Rust Library', {
    projectType: 'library',
    languages: ['rust'],
    frameworks: [],
    os: [],
    extras: []
});
