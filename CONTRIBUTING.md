# Contributing

Github actions are a bit different than your usual node module, in that
you either need to version control your dependencies, or version control
your compiled build.

We've chosen the latter approach, and as such, any pull request should include a new
`dist/index.js` file if any of the action's source code has changed.

At the moment, we don't have any workflows in place to validate this, but that will
be coming soon. See the [build](#build) instructions below for details on how to build.

## Setup

```
git clone <your fork>
cd tagging-strategy
git checkout -b feature-my-feature-or-fix-description master
npm i && npm i -g @zeit/ncc
```
You are now ready to make your changes, and then procede to [build](#build) before
submitting your contributing

## Build

```
rm -rf package-lock.json ./node_modules
npm i --production
ncc build index.js
```
