import path from "path";
export default (env, agrv) => {
  const isDev = agrv.mode === "development";
  return {
    entry: "./src/index.js",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["@babel/plugin-transform-runtime"],
            },
          },
        },
        {
          test: /\.(s[ac]ss|css)$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: { sourceMap: isDev ? true : false },
            },
            {
              loader: "sass-loader",
              options: { sourceMap: isDev ? true : false },
            },
          ],
        },
      ],
    },
    resolve: { extensions: [".js", ".jsx"] },
    output: {
      path: path.resolve("public"),
      publicPath: "../public/dist",
      filename: "bundle.js",
      environment: {
        arrowFunction: false,
        bigIntLiteral: false,
        const: false,
        destructuring: false,
        dynamicImport: false,
        forOf: false,
        module: true,
      },
    },
    devtool: isDev ? "source-map" : false,
    devServer: {
      hot: true,
      devMiddleware: {
        publicPath: "/dist/",
      },
      static: {
        directory: "public/page",
      },
      port: 3000,
    },
    watch: true,
  };
};
