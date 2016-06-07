# lodash-codemods [![Build Status](https://travis-ci.org/jfmengels/lodash-codemods.svg?branch=master)](https://travis-ci.org/jfmengels/lodash-codemods)

> Codemods for [Lodash](https://lodash.com/) that simplifies upgrading to newer versions

Codemods are small programs that help you automate changes to your codebase. Think of them as search and replace on steroids.

This module contains a set of codemods that enable you to upgrade your code between various Lodash releases.

# WARNING

This tool should help migrate your codebase from one version of [Lodash](https://lodash.com/) to another. That said, it may not be 100% complete or able to apply all the necessary changes. You should NOT rely on the fact that this will work entirely, and you therefore NEED to review the changes made and test that your code is still working.

In cases where static analysis is not enough to figure whether a change should be made, instructions will be printed to the console, and you should follow them to complete the migration.

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
    --from <version> Specify the version of Lodash currently used
    --to <version>   Specify the version of Lodash to move to
    --force, -f      Bypass safety checks and forcibly run codemods
    --silent, -S     Disable log output

  Available upgrades
    - [] → 4.0.0
```

Simply run `lodash-codemods` in your terminal and answer a few questions. You can pass one or more filenames directly to the CLI. If you do not, you will be prompted for it.

Ensure you have a backup of your tests or commit the latest changes before running this.


## Supported codemods

- Upgrading to 4

## License

MIT © [Jeroen Engels](https://github.com/jfmengels)
