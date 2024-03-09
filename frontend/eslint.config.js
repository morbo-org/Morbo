import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

const sources = {
  files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
  ignores: ['dist/*'],
};

export default [
  ...tseslint.config({
    ...sources,
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }),
  {
    ...sources,
    ...stylistic.configs.customize({
      semi: true,
    }),
  },
];
