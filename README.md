
# Development

## Install [lerna](https://github.com/lerna/lerna)
```sh
$ yarn global add lerna
```

## Install [aegir](https://github.com/ipfs/aegir)
```sh
$ yarn global add aegir
```

## Build
```sh
$ yarn build
```

# Publish

Create an *.npmrc* file under the project directory with following contents:
```
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

and run command:
```sh
$ yarn release
```
