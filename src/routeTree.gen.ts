/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index.route'
import { Route as UserIndexRouteImport } from './routes/user/index.route'
import { Route as TopicIndexRouteImport } from './routes/topic/index.route'
import { Route as SeriesIndexRouteImport } from './routes/series/index.route'
import { Route as PostIndexRouteImport } from './routes/post/index.route'
import { Route as PermissionIndexRouteImport } from './routes/permission/index.route'
import { Route as UserIdIndexRouteImport } from './routes/user/$id/index.route'
import { Route as TopicNewIndexRouteImport } from './routes/topic/new/index.route'
import { Route as TopicNameIndexRouteImport } from './routes/topic/$name/index.route'
import { Route as SeriesNewIndexRouteImport } from './routes/series/new/index.route'
import { Route as SeriesNameIndexRouteImport } from './routes/series/$name/index.route'
import { Route as PostNewIndexRouteImport } from './routes/post/new/index.route'
import { Route as PostTitleIndexRouteImport } from './routes/post/$title/index.route'
import { Route as PermissionNewIndexRouteImport } from './routes/permission/new/index.route'
import { Route as PermissionNameIndexRouteImport } from './routes/permission/$name/index.route'
import { Route as UserIdPermissionIndexRouteImport } from './routes/user/$id/permission/index.route'

// Create/Update Routes

const IndexRouteRoute = IndexRouteImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const UserIndexRouteRoute = UserIndexRouteImport.update({
  path: '/user/',
  getParentRoute: () => rootRoute,
} as any)

const TopicIndexRouteRoute = TopicIndexRouteImport.update({
  path: '/topic/',
  getParentRoute: () => rootRoute,
} as any)

const SeriesIndexRouteRoute = SeriesIndexRouteImport.update({
  path: '/series/',
  getParentRoute: () => rootRoute,
} as any)

const PostIndexRouteRoute = PostIndexRouteImport.update({
  path: '/post/',
  getParentRoute: () => rootRoute,
} as any)

const PermissionIndexRouteRoute = PermissionIndexRouteImport.update({
  path: '/permission/',
  getParentRoute: () => rootRoute,
} as any)

const UserIdIndexRouteRoute = UserIdIndexRouteImport.update({
  path: '/user/$id/',
  getParentRoute: () => rootRoute,
} as any)

const TopicNewIndexRouteRoute = TopicNewIndexRouteImport.update({
  path: '/topic/new/',
  getParentRoute: () => rootRoute,
} as any)

const TopicNameIndexRouteRoute = TopicNameIndexRouteImport.update({
  path: '/topic/$name/',
  getParentRoute: () => rootRoute,
} as any)

const SeriesNewIndexRouteRoute = SeriesNewIndexRouteImport.update({
  path: '/series/new/',
  getParentRoute: () => rootRoute,
} as any)

const SeriesNameIndexRouteRoute = SeriesNameIndexRouteImport.update({
  path: '/series/$name/',
  getParentRoute: () => rootRoute,
} as any)

const PostNewIndexRouteRoute = PostNewIndexRouteImport.update({
  path: '/post/new/',
  getParentRoute: () => rootRoute,
} as any)

const PostTitleIndexRouteRoute = PostTitleIndexRouteImport.update({
  path: '/post/$title/',
  getParentRoute: () => rootRoute,
} as any)

const PermissionNewIndexRouteRoute = PermissionNewIndexRouteImport.update({
  path: '/permission/new/',
  getParentRoute: () => rootRoute,
} as any)

const PermissionNameIndexRouteRoute = PermissionNameIndexRouteImport.update({
  path: '/permission/$name/',
  getParentRoute: () => rootRoute,
} as any)

const UserIdPermissionIndexRouteRoute = UserIdPermissionIndexRouteImport.update(
  {
    path: '/user/$id/permission/',
    getParentRoute: () => rootRoute,
  } as any,
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRoute
    }
    '/permission/': {
      id: '/permission/'
      path: '/permission'
      fullPath: '/permission'
      preLoaderRoute: typeof PermissionIndexRouteImport
      parentRoute: typeof rootRoute
    }
    '/post/': {
      id: '/post/'
      path: '/post'
      fullPath: '/post'
      preLoaderRoute: typeof PostIndexRouteImport
      parentRoute: typeof rootRoute
    }
    '/series/': {
      id: '/series/'
      path: '/series'
      fullPath: '/series'
      preLoaderRoute: typeof SeriesIndexRouteImport
      parentRoute: typeof rootRoute
    }
    '/topic/': {
      id: '/topic/'
      path: '/topic'
      fullPath: '/topic'
      preLoaderRoute: typeof TopicIndexRouteImport
      parentRoute: typeof rootRoute
    }
    '/user/': {
      id: '/user/'
      path: '/user'
      fullPath: '/user'
      preLoaderRoute: typeof UserIndexRouteImport
      parentRoute: typeof rootRoute
    }
    '/permission/$name/': {
      id: '/permission/$name/'
      path: '/permission/$name'
      fullPath: '/permission/$name'
      preLoaderRoute: typeof PermissionNameIndexRouteImport
      parentRoute: typeof rootRoute
    }
    '/permission/new/': {
      id: '/permission/new/'
      path: '/permission/new'
      fullPath: '/permission/new'
      preLoaderRoute: typeof PermissionNewIndexRouteImport
      parentRoute: typeof rootRoute
    }
    '/post/$title/': {
      id: '/post/$title/'
      path: '/post/$title'
      fullPath: '/post/$title'
      preLoaderRoute: typeof PostTitleIndexRouteImport
      parentRoute: typeof rootRoute
    }
    '/post/new/': {
      id: '/post/new/'
      path: '/post/new'
      fullPath: '/post/new'
      preLoaderRoute: typeof PostNewIndexRouteImport
      parentRoute: typeof rootRoute
    }
    '/series/$name/': {
      id: '/series/$name/'
      path: '/series/$name'
      fullPath: '/series/$name'
      preLoaderRoute: typeof SeriesNameIndexRouteImport
      parentRoute: typeof rootRoute
    }
    '/series/new/': {
      id: '/series/new/'
      path: '/series/new'
      fullPath: '/series/new'
      preLoaderRoute: typeof SeriesNewIndexRouteImport
      parentRoute: typeof rootRoute
    }
    '/topic/$name/': {
      id: '/topic/$name/'
      path: '/topic/$name'
      fullPath: '/topic/$name'
      preLoaderRoute: typeof TopicNameIndexRouteImport
      parentRoute: typeof rootRoute
    }
    '/topic/new/': {
      id: '/topic/new/'
      path: '/topic/new'
      fullPath: '/topic/new'
      preLoaderRoute: typeof TopicNewIndexRouteImport
      parentRoute: typeof rootRoute
    }
    '/user/$id/': {
      id: '/user/$id/'
      path: '/user/$id'
      fullPath: '/user/$id'
      preLoaderRoute: typeof UserIdIndexRouteImport
      parentRoute: typeof rootRoute
    }
    '/user/$id/permission/': {
      id: '/user/$id/permission/'
      path: '/user/$id/permission'
      fullPath: '/user/$id/permission'
      preLoaderRoute: typeof UserIdPermissionIndexRouteImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRouteRoute
  '/permission': typeof PermissionIndexRouteRoute
  '/post': typeof PostIndexRouteRoute
  '/series': typeof SeriesIndexRouteRoute
  '/topic': typeof TopicIndexRouteRoute
  '/user': typeof UserIndexRouteRoute
  '/permission/$name': typeof PermissionNameIndexRouteRoute
  '/permission/new': typeof PermissionNewIndexRouteRoute
  '/post/$title': typeof PostTitleIndexRouteRoute
  '/post/new': typeof PostNewIndexRouteRoute
  '/series/$name': typeof SeriesNameIndexRouteRoute
  '/series/new': typeof SeriesNewIndexRouteRoute
  '/topic/$name': typeof TopicNameIndexRouteRoute
  '/topic/new': typeof TopicNewIndexRouteRoute
  '/user/$id': typeof UserIdIndexRouteRoute
  '/user/$id/permission': typeof UserIdPermissionIndexRouteRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRouteRoute
  '/permission': typeof PermissionIndexRouteRoute
  '/post': typeof PostIndexRouteRoute
  '/series': typeof SeriesIndexRouteRoute
  '/topic': typeof TopicIndexRouteRoute
  '/user': typeof UserIndexRouteRoute
  '/permission/$name': typeof PermissionNameIndexRouteRoute
  '/permission/new': typeof PermissionNewIndexRouteRoute
  '/post/$title': typeof PostTitleIndexRouteRoute
  '/post/new': typeof PostNewIndexRouteRoute
  '/series/$name': typeof SeriesNameIndexRouteRoute
  '/series/new': typeof SeriesNewIndexRouteRoute
  '/topic/$name': typeof TopicNameIndexRouteRoute
  '/topic/new': typeof TopicNewIndexRouteRoute
  '/user/$id': typeof UserIdIndexRouteRoute
  '/user/$id/permission': typeof UserIdPermissionIndexRouteRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRouteRoute
  '/permission/': typeof PermissionIndexRouteRoute
  '/post/': typeof PostIndexRouteRoute
  '/series/': typeof SeriesIndexRouteRoute
  '/topic/': typeof TopicIndexRouteRoute
  '/user/': typeof UserIndexRouteRoute
  '/permission/$name/': typeof PermissionNameIndexRouteRoute
  '/permission/new/': typeof PermissionNewIndexRouteRoute
  '/post/$title/': typeof PostTitleIndexRouteRoute
  '/post/new/': typeof PostNewIndexRouteRoute
  '/series/$name/': typeof SeriesNameIndexRouteRoute
  '/series/new/': typeof SeriesNewIndexRouteRoute
  '/topic/$name/': typeof TopicNameIndexRouteRoute
  '/topic/new/': typeof TopicNewIndexRouteRoute
  '/user/$id/': typeof UserIdIndexRouteRoute
  '/user/$id/permission/': typeof UserIdPermissionIndexRouteRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/permission'
    | '/post'
    | '/series'
    | '/topic'
    | '/user'
    | '/permission/$name'
    | '/permission/new'
    | '/post/$title'
    | '/post/new'
    | '/series/$name'
    | '/series/new'
    | '/topic/$name'
    | '/topic/new'
    | '/user/$id'
    | '/user/$id/permission'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/permission'
    | '/post'
    | '/series'
    | '/topic'
    | '/user'
    | '/permission/$name'
    | '/permission/new'
    | '/post/$title'
    | '/post/new'
    | '/series/$name'
    | '/series/new'
    | '/topic/$name'
    | '/topic/new'
    | '/user/$id'
    | '/user/$id/permission'
  id:
    | '__root__'
    | '/'
    | '/permission/'
    | '/post/'
    | '/series/'
    | '/topic/'
    | '/user/'
    | '/permission/$name/'
    | '/permission/new/'
    | '/post/$title/'
    | '/post/new/'
    | '/series/$name/'
    | '/series/new/'
    | '/topic/$name/'
    | '/topic/new/'
    | '/user/$id/'
    | '/user/$id/permission/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRouteRoute: typeof IndexRouteRoute
  PermissionIndexRouteRoute: typeof PermissionIndexRouteRoute
  PostIndexRouteRoute: typeof PostIndexRouteRoute
  SeriesIndexRouteRoute: typeof SeriesIndexRouteRoute
  TopicIndexRouteRoute: typeof TopicIndexRouteRoute
  UserIndexRouteRoute: typeof UserIndexRouteRoute
  PermissionNameIndexRouteRoute: typeof PermissionNameIndexRouteRoute
  PermissionNewIndexRouteRoute: typeof PermissionNewIndexRouteRoute
  PostTitleIndexRouteRoute: typeof PostTitleIndexRouteRoute
  PostNewIndexRouteRoute: typeof PostNewIndexRouteRoute
  SeriesNameIndexRouteRoute: typeof SeriesNameIndexRouteRoute
  SeriesNewIndexRouteRoute: typeof SeriesNewIndexRouteRoute
  TopicNameIndexRouteRoute: typeof TopicNameIndexRouteRoute
  TopicNewIndexRouteRoute: typeof TopicNewIndexRouteRoute
  UserIdIndexRouteRoute: typeof UserIdIndexRouteRoute
  UserIdPermissionIndexRouteRoute: typeof UserIdPermissionIndexRouteRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRouteRoute: IndexRouteRoute,
  PermissionIndexRouteRoute: PermissionIndexRouteRoute,
  PostIndexRouteRoute: PostIndexRouteRoute,
  SeriesIndexRouteRoute: SeriesIndexRouteRoute,
  TopicIndexRouteRoute: TopicIndexRouteRoute,
  UserIndexRouteRoute: UserIndexRouteRoute,
  PermissionNameIndexRouteRoute: PermissionNameIndexRouteRoute,
  PermissionNewIndexRouteRoute: PermissionNewIndexRouteRoute,
  PostTitleIndexRouteRoute: PostTitleIndexRouteRoute,
  PostNewIndexRouteRoute: PostNewIndexRouteRoute,
  SeriesNameIndexRouteRoute: SeriesNameIndexRouteRoute,
  SeriesNewIndexRouteRoute: SeriesNewIndexRouteRoute,
  TopicNameIndexRouteRoute: TopicNameIndexRouteRoute,
  TopicNewIndexRouteRoute: TopicNewIndexRouteRoute,
  UserIdIndexRouteRoute: UserIdIndexRouteRoute,
  UserIdPermissionIndexRouteRoute: UserIdPermissionIndexRouteRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/permission/",
        "/post/",
        "/series/",
        "/topic/",
        "/user/",
        "/permission/$name/",
        "/permission/new/",
        "/post/$title/",
        "/post/new/",
        "/series/$name/",
        "/series/new/",
        "/topic/$name/",
        "/topic/new/",
        "/user/$id/",
        "/user/$id/permission/"
      ]
    },
    "/": {
      "filePath": "index.route.tsx"
    },
    "/permission/": {
      "filePath": "permission/index.route.tsx"
    },
    "/post/": {
      "filePath": "post/index.route.tsx"
    },
    "/series/": {
      "filePath": "series/index.route.tsx"
    },
    "/topic/": {
      "filePath": "topic/index.route.tsx"
    },
    "/user/": {
      "filePath": "user/index.route.tsx"
    },
    "/permission/$name/": {
      "filePath": "permission/$name/index.route.tsx"
    },
    "/permission/new/": {
      "filePath": "permission/new/index.route.tsx"
    },
    "/post/$title/": {
      "filePath": "post/$title/index.route.tsx"
    },
    "/post/new/": {
      "filePath": "post/new/index.route.tsx"
    },
    "/series/$name/": {
      "filePath": "series/$name/index.route.tsx"
    },
    "/series/new/": {
      "filePath": "series/new/index.route.tsx"
    },
    "/topic/$name/": {
      "filePath": "topic/$name/index.route.tsx"
    },
    "/topic/new/": {
      "filePath": "topic/new/index.route.tsx"
    },
    "/user/$id/": {
      "filePath": "user/$id/index.route.tsx"
    },
    "/user/$id/permission/": {
      "filePath": "user/$id/permission/index.route.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
