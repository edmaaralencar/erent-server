module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@/use-cases': './src/use-cases',
          '@/lib': './src/lib',
          '@/http': './src/http',
          '@/config': './src/config',
          '@/repositories': './src/repositories',
          '@/errors': './src/errors',
          '@/utils': './src/utils',
          '@/providers': './src/providers',
        },
      },
    ],
  ],
}
