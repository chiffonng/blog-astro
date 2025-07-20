// @ts-check

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
export default {
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  jsxSingleQuote: true,
  printWidth: 100,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: false,
  singleAttributePerLine: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false,
  vueIndentScriptAndStyle: false,

  // Prettier plugins
  plugins: ['prettier-plugin-astro', '@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '<BUILTIN_MODULES>',
    '',
    '^(astro$)|^astro/(.*)$', // core astro
    '^(astro:(.*)$)|^@astrojs/(.*)$', // astro official plugin
    '^(.*)/astro|^astro-(.*)', // astro integration from other libraries
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/plugins$|^@/plugins/(.*)$',
    '^@/site-config$',
    '^@/theme$',
    '^@/types|^@/types/(.*)$|^@/(.*)/types$',
    '^@/server$|^@/server/(.*)$',
    '^@/lib$|^@/lib/(.*)$',
    '^@/pages/(.*)$',
    '^@/layouts$|^@/layouts/(.*)$',
    '^@/components$|^@/components/(.*)$',
    '^@/utils$|^@/utils/(.*)$',
    '^@/assets/(.*)$',
    '',
    '^[./]',
    '.css$',
    '^content/(.*)$',
    '.*\\.md$'
  ],
  importOrderParserPlugins: ['astro', 'typescript', 'jsx', 'decorators-legacy'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    },
    {
      files: '*.{md,mdx}',
      options: {
        proseWrap: 'always',
        printWidth: 100
      }
    }
  ]
}
