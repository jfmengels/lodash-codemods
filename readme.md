# lodash-codemods [![Build Status](https://travis-ci.org/jfmengels/lodash-codemods.svg?branch=master)](https://travis-ci.org/jfmengels/lodash-codemods)

> Codemods for [Lodash](https://lodash.com/) that simplifies upgrading to newer versions

Codemods are small programs that help you automate changes to your codebase. Think of them as search and replace on steroids.

This module contains a set of codemods that enable you to upgrade your code between various Lodash releases.

#### EXPERIMENTAL

These codemods are experimental and not complete. You can apply them on your codebase, but you need to properly review and test the outputted code before using it.

## Install

```
$ npm install --global lodash-codemods
```


## Usage

```
$ lodash-codemods --help

  Codemods to simplify upgrading Lodash versions

  Usage
    $ lodash-codemods [<file|glob> ...]

  Options
    --force, -f    Bypass safety checks and forcibly run codemods

  Available upgrades
    - 3.x.x → 4.x.x
```

Simply run `lodash-codemods` in your terminal and answer a few questions. You can pass a filename directly to the CLI. If you do not, you will be prompted for one.

Ensure you have a backup of your tests or commit the latest changes before running this.


## Supported codemods

- Upgrading to 4

## License

MIT © [Jeroen Engels](https://github.com/jfmengels)
