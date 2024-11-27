import eslintRecommended from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['node_modules'], // Ignorar node_modules por padrão
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...eslintRecommended.rules, // Regras recomendadas do ESLint
      'prettier/prettier': 'error', // Habilita Prettier
    },
  },
];
