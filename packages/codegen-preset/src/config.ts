export interface GraphacePresetConfig {
  /**
   * @description Specify the name of the "graphql tag" function to use
   * @default "graphql"
   *
   * E.g. `graphql` or `gql`.
   *
   * @exampleMarkdown
   * ```tsx
   * const config = {
   *    schema: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
   *    documents: ['src/**\/*.tsx', '!src\/gql/**\/*'],
   *    generates: {
   *       './src/gql/': {
   *          preset: 'client',
   *          presetConfig: {
   *            gqlTagName: 'gql',
   *          }
   *        },
   *    },
   * };
   * export default config;
   * ```
   */
  gqlTagName?: string;
}