'use strict'


export interface CloudOptions {
  zone?: 'cn' | 'global' | 'beta',
  jwt?: string,
}

export interface EndpointsOptions {
  url?: string,
  privateKey?: string,
}

export interface Options extends CloudOptions, EndpointsOptions {
}

export interface TokenOpt extends CloudOptions {
  force?: boolean,
}

export interface PinRes {
  PinHash: string,
  PinSize: number,
  PinDate: number
}

export interface PinHashRes extends PinRes{
  JobId: string,
  JobStatus: string
}

export interface Endpoint {
  id: number,
  name: string,
  apiHost: string,
}

export interface Mtime {
  secs: number
  nsecs?: number
}

export type MtimeLike = Mtime | { Seconds: number, FractionalNanoseconds?: number } | [number, number] | Date

export type ToContent =
  | string
  | InstanceType<typeof String>
  | ArrayBufferView
  | ArrayBuffer
  | Blob
  | ReadableStream<Uint8Array>

export type ToMode =
  | string
  | number

export interface ToFileMetadata {
  mode?: ToMode
  mtime?: MtimeLike
}

export interface ToFile extends ToFileMetadata {
  path?: string
  content: ToContent
}

// export interface ToDirectory extends ToFileMetadata {
//   path: string
//   content?: undefined
// }

export interface ToFileMetadata {
  mode?: ToMode
  mtime?: MtimeLike
}


export type ImportCandidate =
  | ToFile
  // | ToDirectory
  | ToContent
