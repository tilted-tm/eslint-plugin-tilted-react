# eslint-plugin-tilted-react

Eslint rules used by Tilted on react projects

## Installation

```shell script
# yarn
yarn add eslint-plugin-tilted-react --dev

# npm
npm install eslint-plugin-tilted-react --save-dev
```


## Usage

Add `tilted-react` to the plugins section of your `.eslintrc` configuration file. Omit the `eslint-plugin-` prefix:

```json
{
  "plugins": [
    "tilted-react"
  ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "tilted-react/too-few-lines-between-jsx-elements": "error"
  }
}
```
