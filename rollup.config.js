import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import cleanup from 'rollup-plugin-cleanup'

export default {
  input: 'index.js',
  output: {
    file: 'dist/p-using.js',
    format: 'umd'
  },
  name: 'using',
  plugins: [
    resolve({ jsnext: true, main: true }),
    commonjs(),
    babel(),
    cleanup()
  ]
}
