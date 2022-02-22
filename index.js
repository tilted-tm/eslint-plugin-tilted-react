/**
 * @credits The too-few-lines-between-jsx-elements rule comes from this gist:
 * https://gist.github.com/Sparragus/dc0348f23459b5e402df723397ce1f7f
 *
 * We published it in our plugin for ease of use.
 * Special thanks to @Sparragus for writing this rule:
 * https://gist.github.com/Sparragus
 *
 */

const JSXELEMENT_CHILDREN = [
  'JSXText',
  'JSXExpressionContainer',
  'JSXSpreadChild',
  'JSXElement',
  'JSXFragment'
]

const isJSXElementChildrenType = x => !!(x && JSXELEMENT_CHILDREN.includes(x.type))

module.exports = {
  rules: {
    'too-few-lines-between-jsx-elements': {
      create: function(context) {
        return {
          JSXElement(node) {
            node.children.forEach((child, index, children) => {
              if (child.type === 'JSXText') {
                const prevChild = children[index - 1]
                const nextChild = children[index + 1]

                const isBetweenJSXElements = [prevChild, nextChild].every(isJSXElementChildrenType)
                if (isBetweenJSXElements) {
                  const valueWithoutTabsAndSpaces = child.value.replace(/([\t \r])/g, '')
                  const hasTooFewLinesBetween = /^\n{1}$/.test(valueWithoutTabsAndSpaces)

                  if (hasTooFewLinesBetween) {
                    context.report({
                      node: child,
                      message: 'Too few lines between JSX elements',
                      fix: function(fixer) {
                        return fixer.insertTextAfter(child, '\n')
                      }
                    })
                  }
                }
              }
            })
          }
        }
      },
      meta: {
        docs: {
          description: 'Check if there is a line between each child of a JSX element',
          recommended: true,
          url: "https://github.com/tilted-tm/eslint-plugin-tilted-react"
        },
        fixable: 'whitespace',
        type: 'layout'
      }
    }
  }
}
