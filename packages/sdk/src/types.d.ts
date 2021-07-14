'use strict'
export interface Options {
  url?: string,
  privateKey?: string,
  jwt?: string,
  zone?: 'cn' | 'global' | 'beta',

}

export interface PinRes {
  PinHash: string,
  PinSize: string,
  PinDate: string
}

export interface PinHashRes{
  HashToPin: string,
  JobId: number,
  JobStatus: string
}

export interface Endpoint{
  id: number,
  createAt: string,
  dcName: string,
  dcType: 0,
  httpHost: string,
  httpPassword: string,
  ipfsApiHost: string,
  lastUpdateAt: string,
  publicKey: string,
  seed: string,
  userId: number
}
