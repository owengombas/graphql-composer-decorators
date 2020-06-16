module.exports = {
  title: "graphql-composer",
  description: "",
  lang: "en",
  locales: {
    "/": {
      path: "/",
      lang: "en"
    },
    "/fr/": {
      lang: "fr",
      title: "graphql-composer-decorators",
      description: ""
    },
  },
  plugins: [
    [
    ]
  ],
  head: [
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon/apple-touch-icon.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon/favicon-96x96.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon/favicon-32x32.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon/favicon-16x16.png"}],
    ['link', { rel: "manifest", href: "/favicon/site.webmanifest"}],
    ['link', { rel: "mask-icon", href: "/favicon/safari-pinned-tab.svg", color: "#3a0839"}],
    ['link', { rel: "shortcut icon", href: "/favicon/favicon.ico"}],
    ['meta', { name: "msapplication-TileColor", content: "#3a0839"}],
    ['meta', { name: "msapplication-config", content: "/favicon/browserconfig.xml"}],
    ['meta', { name: "theme-color", content: "#ffffff"}],
  ],
  themeConfig: {
    logo: '/logo.png',
    repo: "owencalvin/graphql-composer-decorators",
    docsDir: "docs",
    editLinks: true,
    locales: {
      "/": {},
      "/fr/": {
        ariaLabel: "Langue",
        editLinkText: "Modifier ce fichier sur GitHub",
        lang: "fr",
        title: "graphql-composer-decorators",
        description: "Create your GraphQL API using decorators!",
        sidebar: [
          {
            title: "Decorateurs",
            path: "/fr/decorators/intro/introduction",
            collapsable: false,
            sidebarDepth: 4,
            children: [
              {
                collapsable: false,
                title: "Introduction",
                path: "/fr/decorators/intro/introduction",
                children: [
                  "/fr/decorators/intro/introduction",
                  "/fr/decorators/intro/installation",
                  "/fr/decorators/intro/getting-started",
                  "/fr/decorators/intro/typegraphql-comparison"
                ]
              },
              {
                collapsable: false,
                title: "Types",
                path: "/fr/decorators/types/object-type",
                children: [
                  "/fr/decorators/types/object-type",
                  "/fr/decorators/types/input-type",
                  "/fr/decorators/types/interface-type",
                  "/fr/decorators/types/union-type",
                  "/fr/decorators/types/enum-type",
                  "/fr/decorators/types/generic-type",
                  "/fr/decorators/types/field",
                ]
              },
              {
                collapsable: false,
                title: "Queries",
                path: "/fr/decorators/queries/resolver",
                children: [
                  "/fr/decorators/queries/resolver",
                  "/fr/decorators/queries/middlewares",
                ]
              },
              {
                collapsable: false,
                title: "Meta",
                path: "/fr/decorators/queries/description",
                children: [
                  "/fr/decorators/meta/description",
                  "/fr/decorators/meta/extensions",
                  "/fr/decorators/meta/deprecated",
                  "/fr/decorators/meta/directives",
                ]
              }
            ]
          }
        ]
      }
    }
  }
}
