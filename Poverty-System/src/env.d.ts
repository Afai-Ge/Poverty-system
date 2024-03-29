/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  VITE_APP_TITLE: string
  VITE_APP_PORT: number
  VITE_APP_BASE_URL: string
}

declare module "nprogress"
declare module "md5"
