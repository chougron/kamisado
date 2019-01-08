module.exports = function(api) {
  const presets = [
    ['@babel/preset-env', { useBuiltIns: 'entry' }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ];

  const plugins = ['@babel/plugin-proposal-class-properties'];

  api.cache.never();

  return { presets, plugins };
};
