
#  Digital Paper Edit - Electron 
Electron Cross Platform Desktop app

---> _Work in progress_ <--

For a ready to use release of the desktop application, checkout the [user instructions](./docs/guides/user-instructions.md) for more details on how to get started.

 
[See here for overall project architecture info](https://github.com/bbc/digital-paper-edit-client#project-architecture)

## Setup
<!-- _stack - optional_
_How to build and run the code/app_ -->

```
git clone git@github.com:bbc/digital-paper-edit-electron.git
```

```
cd digital-paper-edit-electron
```

Optional step to setup [nvm](https://github.com/nvm-sh/nvm) to use node version 10, otherwise just use node version 10
```
nvm use || nvm install`
```

in root of project
```
npm install
```

## Usage

```
npm start
```
 

## System Architecture
<!-- _High level overview of system architecture_ -->

 Electron Cross platform desktop app

## Development env
 <!-- _How to run the development environment_

_Coding style convention ref optional, eg which linter to use_

_Linting, github pre-push hook - optional_ -->

- [ ] npm > `6.1.0`
- [ ] node v 10 - [lts/dubnium](https://scotch.io/tutorials/whats-new-in-node-10-dubnium)
- [ ] see [`.eslintrc`](./.eslintrc) in the various packages for linting rules

Node version is set in node version manager [`.nvmrc`](https://github.com/creationix/nvm#nvmrc)

## Build
<!-- _How to run build_ -->

<!-- 
TODO: needs to pull in React front end from npm. 
eg how it was done in Makefile before

build-electron: build-react
	@echo "Electron build"
	# does areact-build
	# clears build folder inside of electron
	rm -rf ./packages/electron/build
	rm -rf ./packages/electron/dist
	# then copies the react build folder into electron folder
	cp -a ./packages/client/build ./packages/electron/build
	# build/package electron for mac, wind and linux
	cd ./packages/electron && npm run build:mwl

and then run 

```
npm run build:mwl
```
 -->

_TBC_

## Tests
<!-- _How to carry out tests_ -->

 _TBC_

## Deployment
<!-- _How to deploy the code/app into test/staging/production_ -->

_TBC_

<!-- Probably through Travis or Circle CI -->
