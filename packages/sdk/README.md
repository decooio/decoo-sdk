# Decoo SDK

Official JavaScript SDK for [Decoo](https://wiki.decoo.io).

## Installation

```sh
npm install --save @decooio/sdk
```

or,
```sh
yarn add @decooio/sdk
```

## Usage

```javascript
import * as fs from "fs";

const decooSdk = require('@decooio/sdk');

// List available endpoints
const decooEndpoints = await decooSdk.listEndpoints({
  zone: "cn", // default 'cn'
  jwt: "********"
});

// Get Ipfs CID of local file
const decooUtils = decooSdk.utils;
const localFileHash = await decooUtils.getFileHash(fs.createReadStream('/Some/Local/File/Path'));
console.log(localFileHash);

// Connect to an endpoint, and pin local file
const decooClient = decooSdk.create({
  zone: "cn", // default 'cn'
  url: decooEndpoints[0].apiHost,
  jwt: "********",
  privateKey: "********"
});

// pinFile 
const addedFileHash = await decooClient.pinFile('/Some/Local/File/Path');
console.log(addedFileHash);

// pinByHash
const byHash = await decooClient.pingByHash('Qmalksjkjfkaklsjdkf');
console.log(byHash)
```
