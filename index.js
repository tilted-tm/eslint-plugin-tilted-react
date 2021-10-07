const JSXELEMENT_CHILDREN = [
  'JSXText',
  'JSXExpressionContainer',
  'JSXSpreadChild',
  'JSXElement',
  'JSXFragment'
]

const isJSXElementChildrenType = x => x && JSXELEMENT_CHILDREN.includes(x.type)

module.exports = {
  rules: {
    'too-few-lines-between-jsx-elements': {
      create: function(context) {
        return {
          JSXElement(node) {
            node.children.forEach((child, index, children) => {
              if (child.type === 'Literal') {
                const prevChild = children[index - 1]
                const nextChild = children[index + 1]

                const isBetweenJSXElements = [prevChild, nextChild].every(isJSXElementChildrenType)
                if (isBetweenJSXElements) {
                  const valueWithoutTabsAndSpaces = child.value.replace(/(\t| )/g, '')
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
      }
    }
  }
}
