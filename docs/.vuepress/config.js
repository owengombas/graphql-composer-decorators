module.exports = {
  title: "graphql-composer-decorators",
  description: "Create your GraphQL API using decorators!",
  lang: "en",
  base: "/graphql-composer-decorators/",
  locales: {
    "/": {
      path: "/",
      lang: "en"
    },
    "/fr/": {
      lang: "fr",
      description: "Créez votre API GraphQL avec des décorateurs !"
    },
  },
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
      "/": {
        ariaLabel: "Languages",
        editLinkText: "Edit this file on GitHub",
        lang: "en-US",
        title: "graphql-composer-decorators",
        description: "Create your GraphQL API using decorators!",
        sidebar: [
          {
            collapsable: false,
            title: "Introduction",
            path: "/intro/introduction",
            children: [
              "/intro/introduction",
              "/intro/installation",
              "/intro/getting-started",
              "/intro/typegraphql-comparison"
            ]
          },
          {
            collapsable: false,
            title: "Types",
            path: "/types/object-type",
            children: [
              "/types/object-type",
              "/types/input-type",
              "/types/interface-type",
              "/types/union-type",
              "/types/enum-type",
              "/types/inheritance",
              "/types/generic-type",
              "/types/field",
            ]
          },
          {
            collapsable: false,
            title: "Queries",
            path: "/queries/resolver",
            children: [
              "/queries/resolver",
              "/queries/middlewares",
            ]
          },
          {
            collapsable: false,
            title: "Meta",
            path: "/queries/description",
            children: [
              "/meta/description",
              "/meta/extensions",
              "/meta/deprecated",
              "/meta/directives",
            ]
          }
        ]
      },
      "/fr/": {
        ariaLabel: "Langue",
        editLinkText: "Modifier ce fichier sur GitHub",
        lang: "fr-FR",
        title: "graphql-composer-decorators",
        description: "Créez votre API GraphQL avec des décorateurs !",
        sidebar: [
          {
            collapsable: false,
            title: "Introduction",
            path: "/fr/intro/introduction",
            children: [
              "/fr/intro/introduction",
              "/fr/intro/installation",
              "/fr/intro/getting-started",
              "/fr/intro/typegraphql-comparison"
            ]
          },
          {
            collapsable: false,
            title: "Types",
            path: "/fr/types/object-type",
            children: [
              "/fr/types/object-type",
              "/fr/types/input-type",
              "/fr/types/interface-type",
              "/fr/types/union-type",
              "/fr/types/enum-type",
              "/fr/types/inheritance",
              "/fr/types/generic-type",
              "/fr/types/field",
            ]
          },
          {
            collapsable: false,
            title: "Queries",
            path: "/fr/queries/resolver",
            children: [
              "/fr/queries/resolver",
              "/fr/queries/middlewares",
            ]
          },
          {
            collapsable: false,
            title: "Meta",
            path: "/fr/queries/description",
            children: [
              "/fr/meta/description",
              "/fr/meta/extensions",
              "/fr/meta/deprecated",
              "/fr/meta/directives",
            ]
          }
        ]
      }
    }
  }
}
