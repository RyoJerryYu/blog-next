# `src/statics`

codes in `statics` should only be used for static build-time (in `getStaticPaths` and `getStaticProps` ).

If need to use in component, pass it as page props when `getStaticProps` .

## terms

- post: Represent a post, which can be an article or an idea, abstract.
- page: Represent a page on the website.

### slug

The path argument used for a post.

e.g. For `src/pages/articles/[slug].tsx`, for the post of `/articles/hello-world`, the slug is `hello-world`.

For one type of post (article or ideas), the slug should be unique for a post.

Should have no any `/` in the slug.

### path

The path of a resource on the website after build, related from `SITE_BASE_PATH`. Always start with `/`.

e.g. For the post of `/articles/hello-world`, the path is `/articles/hello-world`.

`path` should be unique for a resource. For a post, the `path` is different between the page and the post static file resource.

`path` should always start with `/`.

### file

The static file path for a post, relative to the project root directory. Always start with `public/`.

e.g. For the post of `/articles/hello-world`, the `file` is `public/articles/hello-world/index.html`.

`file` should be unique for a post.

`file` should not start with `/`.

### mediaDir

The directory for media files attached from a post, relative to the project root directory. Relative from `SITE_BASE_PATH`, always start with `/`, is the directory for media files attached from a post.

Now we have static file alias index, `mediaDir` can be deprecated in the future.


## MD for post and statics

An path without extension is an page, with extension `.md` is a static resource for md.

e.g. for file `public/content/articles/hello-world.md`:

- `/articles/hello-world` is a page.
- `content/articles/hello-world.md` is a static resource for md.

### Reference

Obsidian Rich Syntax means sth like `![[file|label]]`.

After resolved, always refer to the path of the static resource.

For md file reference, file in syntax would allow omitting the `.md` extension. If omitted extension not found, will try to find the file with `.md` extension.

