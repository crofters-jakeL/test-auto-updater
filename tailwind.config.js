
module.exports = {
  mode: 'jit',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    safeList: [],
    content: ['./renderer.html', './src/**/*.tsx', './src/**/*.ts'],
  },
  theme: {},
  variants: {},
  plugins: [],
}
