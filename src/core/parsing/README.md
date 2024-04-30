# `core/parsing`

This directory contains the mdx parsing logic.

Mostly contains about:

- `remark` plugins
- `rehype` plugins
- `complex` plugins

## Complex Plugins

Complex plugins are the plugins about defining a new syntax, parsing it and provide a new JSX element for it.
It may mainly contains:

- `type` definition, which is the interface between the parsing plugin and the rendering component.
- `remark` plugin or `rehype` plugin, which is the parsing logic.

Mostly should define a new component, which should receive props of type defined in `type`.

Attention:

All modules in this directory should not be imported by any Component at rendering time, except the `type`.