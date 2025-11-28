/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly VITE_API_LOGIN?: string
  readonly VITE_API_REGISTER?: string
  readonly VITE_API_ME?: string
  readonly VITE_API_UPDATE_POINTS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

