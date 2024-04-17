# `core/indexing`

## Terms

example:

Consider an `.md` file `public/content/articles/2020-02-02-hello-world.md`:

- The page could be accessed by `https://xx.xx.x/articles/hello-world` is a `Page`. What this page shows is the content of the `Post`.
- `https://xx.xx.x/articles` is also a `Page`, but it is not a `Post`.
- The static resource could be accessed by `https://xx.xx.x/content/articles/2020-02-02-hello-world.md` is not a `Page`, but a static resource.
- The `filePath` is `public/content/articles/2020-02-02-hello-world.md`.
- The `pagePath` is `/articles/hello-world`.
- The `slug` is `hello-world`.

### Page

Represent a page on the website.

### Post

Represent a post, which can be an article or an idea, abstract.

### filePath

The path to a static file, should be available for `fs.readFileSync(filePath, "utf-8")`.

Mostly relative to the project root directory, start with `public/`.

### pagePath

The path of a page on the website, related from `SITE_BASE_PATH`. Always start with `/`.

Could be accessible from the browser by `${SITE_BASE_PATH}${pagePath}`.

### slug

The path argument used for a post.

e.g. For `src/pages/articles/[slug].tsx`, for the post of `/articles/hello-world`, the slug is `hello-world`.

For one type of post (article or ideas), the slug should be unique for a post.

Should have no any `/` in the slug.

