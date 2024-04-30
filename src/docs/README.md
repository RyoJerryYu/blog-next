# src

## About static runtime and rendering runtime

Before Next.js exports the static site, it will run the `getStaticProps` and `getStaticPaths` to generate the static props.
When exporting the static site, Next.js will simply delete the `getStaticProps` and `getStaticPaths` functions, and it's import.
Any thing in the `getStaticProps` and `getStaticPaths` functions will not be included in the static site.

Static runtime always run in node.js, could access the file system, and could never access the browser API.
Rendering runtime may run in the browser or in the server, could not access the file system, can only access the browser API in the browser.

Any time coding should consider the runtime, and should not mix the static runtime and rendering runtime.

## Directory Structure

### Rendering Runtime

- `components`
- `components-parsing`
- `hooks`
- `layouts`
- `styles`

### Static Runtime

- `core`

### Shared

- `utils`

### Special

#### `pages` 

Next.js pages directory. 
In `getStaticProps` and `getStaticPaths` are running in static runtime, but the page itself is running in rendering runtime.
`page` is the realy watershed between static runtime and rendering runtime.

#### `types` in `core`

TypeScript types related to the core logic.
They mostly could be used as a Component's props type.

Mostly types in the modules below are designed to be used as props type in the rendering runtime:

- `Meta` type in `core/indexing/meta-collecting`
- `Props` type in `core/parsing/complex-plugins`
