import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from "rollup-plugin-terser";

const env = process.env.NODE_ENV

const config = {
  input: 'src/index.js',
  external: ['react', 'redux'],
  output: {
    format: 'umd',
    name: 'AmaryllisNotifications',
    globals: {
      react: 'React',
      redux: 'Redux'
    }
  },
  plugins: [
    nodeResolve(),
    babel({
      exclude: '**/node_modules/**'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    commonjs()
  ]
}

if (env === 'production') {
  config.plugins.push(
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  )
}

export default config