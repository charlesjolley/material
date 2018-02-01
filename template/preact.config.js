import preactCliTypeSCript from 'preact-cli-plugin-typescript';

export default function (config, env, helpers) {
  // Add TypeScript support
  preactCliTypeSCript(config);

  // Autogenerate Typings for CSS Modules so they can be included
  let cssLoaders = helpers.getLoadersByName(config, 'css-loader');
  for (let loader of cssLoaders) {
    let rule = config.module.loaders[loader.ruleIndex];
    let def = rule.loader[loader.loaderIndex];
    if (def.options && def.options.modules) {
      def.loader = 'typings-for-css-modules-loader';
      def.options.namedExport = true;
      def.options.camelCase = true;
      def.options.banner =
        "// This file is automatically generated. Edits may be overwritten."
    }
  }

  // Don't watch CSS/LESS/SASS.d.ts files to avoid webpack rebuilding
  config.plugins.push(
    new helpers.webpack.WatchIgnorePlugin([
      /\.(css|less|s[ac]ss|styl)\.d\.ts$/
    ])
  );

}