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
