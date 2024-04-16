# `core/indexing`

## Terms

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

