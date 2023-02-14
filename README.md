# A simple blog manager + site for users

> Update, now i'm using NextJS allow for better SEO and load times, still a lot of simplification is left but it works much better.

Take a look at the demo at: [my homepage](https://meetesh06.github.io)

The content for the first page can be adjusted by changing **src/config.js**

The blog posts are written in markdown format and are contained inside **public/posts** directory.
The markdown files must have the following headers to be recognized.

```
<!-- Title -->
<!-- Category -->
<!-- Lineage -->
<!-- Tagline -->
<!-- Date of Creation: (DD/MM/YY) -->

... post content​
```

Demo for the legacy branch: 
[demo](https://meetesh06.github.io/Blog)

## TODO
- Blog page needs some navigation for categories, lineages
- Bring back encrypted secret posts
