const path = require('path');
const fs = require('fs-extra');
const { rollup } = require('rollup');
const { default: nodeResolve } = require('@rollup/plugin-node-resolve');

const { babel } = require('@rollup/plugin-babel');
const { minify } = require('terser');
const pkg = require('../package.json');

const outDir = process.env.NODE_ENV === 'production' ? 'package' : 'build';

const date = {
  day: new Date().getDate(),
  month:
    'January February March April May June July August September October November December'.split(
      ' ',
    )[new Date().getMonth()],
  year: new Date().getFullYear(),
};

const version = process.env.VERSION || pkg.version;

const banner = `
/**
 * DOM64 ${version}
 * ${pkg.description}
 * ${pkg.homepage}
 *
 * Copyright ${date.year}, ${pkg.author}
 *
 * Licensed under ${pkg.license}
 *
 * Released on: ${date.month} ${date.day}, ${date.year}
 */
`.trim();

async function buildUMD() {
  const bundle = await rollup({
    input: path.resolve(__dirname, '../src/dom64.bundle.js'),
    plugins: [nodeResolve(), babel({ babelHelpers: 'bundled' })],
  });
  const { output } = await bundle.write({
    strict: true,
    name: 'DOM64',
    format: 'umd',
    file: path.resolve(__dirname, `../${outDir}/dom64.js`),
    sourcemap: true,
    banner,
  });
  const result = output[0];
  const { code, map } = await minify(result.code, {
    sourceMap: {
      content: result.map,
      filename: `dom64.min.js`,
      url: `dom64.min.js.map`,
    },
    output: {
      preamble: banner,
    },
  });
  await Promise.all([
    fs.writeFile(path.resolve(__dirname, `../${outDir}/dom64.min.js`), code),
    fs.writeFile(path.resolve(__dirname, `../${outDir}/dom64.min.js.map`), map),
  ]);
}

async function buildESM() {
  const bundle = await rollup({
    input: path.resolve(__dirname, '../src/dom64.js'),
    plugins: [nodeResolve(), babel({ babelHelpers: 'bundled' })],
    external: ['ssr-window'],
    onwarn() {
      // eslint-disable-next-line
      return;
    },
  });
  await bundle.write({
    strict: true,
    format: 'esm',
    file: path.resolve(__dirname, `../${outDir}/dom64.esm.js`),
    sourcemap: false,
    banner,
  });
}

async function copyDts() {
  await fs.ensureDir(path.resolve(__dirname, `../${outDir}`));
  await fs.copyFile(
    path.resolve(__dirname, '../src/dom64.d.ts'),
    path.resolve(__dirname, `../${outDir}/dom64.d.ts`),
  );
}

async function copyMeta() {
  const metaFiles = ['README.md', 'LICENSE'];
  for (const f of metaFiles) {
    const src = path.resolve(__dirname, `../${f}`);
    if (fs.existsSync(src)) {
      await fs.copyFile(src, path.resolve(__dirname, `../${outDir}/${f}`));
    }
  }
  const childPkg = {
    name: pkg.name,
    version,
    description: pkg.description,
    sideEffects: false,
    main: 'dom64.js',
    types: 'dom64.d.ts',
    module: 'dom64.esm.js',
    exports: {
      '.': {
        import: './dom64.esm.js',
        require: './dom64.js',
        types: './dom64.d.ts',
      },
    },
    repository: pkg.repository,
    keywords: pkg.keywords,
    author: pkg.author,
    license: pkg.license,
    bugs: pkg.bugs,
    homepage: pkg.homepage,
    dependencies: pkg.dependencies,
  };
  await fs.writeFile(
    path.resolve(__dirname, `../${outDir}/package.json`),
    `${JSON.stringify(childPkg, null, 2)}\n`,
  );
}

async function run() {
  await fs.ensureDir(path.resolve(__dirname, `../${outDir}`));
  await buildUMD();
  await buildESM();
  await copyDts();
  await copyMeta();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
