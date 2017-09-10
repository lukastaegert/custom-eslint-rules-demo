module.exports = {
  create: context => ({
    'MethodDefinition[kind="constructor"] > FunctionExpression': node =>
      context.getDeclaredVariables(node).forEach(variable => {
        if (variable.references.length === 0) {
          context.report(
            variable.identifiers[0],
            `Constructor argument "${variable.name}" is not used.`
          );
        }
      })
  })
};
