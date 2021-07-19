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
const decooEndpoints = await decooSdk.listEndpoints();

// Get Ipfs CID of local file
const decooUtils = decooSdk.utils;
const localFileHash = await decooUtils.getFileHash(fs.createReadStream('/Some/Local/File/Path'));
console.log(localFileHash);

// Connect to an endpoint, and pin local file
const decooClient = decooSdk.create({
  url: decooEndpoints[0].httpHost,
  jwt: "",
  privateKey: ""
});

const addedFileHash = await decooClient.pinFile('/Some/Local/File/Path');
console.log(addedFileHash);
```
