module.exports = api => {
  console.info('[BABEL] | Gets Configuration');

  api.cache(true);

  return {
    presets: [
      '@babel/preset-flow',
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: '2',
          shippedProposals: true,
          targets: {
            node: '10.15.0',
          },
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-optional-chaining',
    ],
  };
};
