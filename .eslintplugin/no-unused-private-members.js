module.exports = {
  create: context => {
    const usagesByClass = [];

    const reportUnusedIdentifiers = () => {
      const currentUsagesByName = usagesByClass.shift();
      Object.keys(currentUsagesByName).forEach(identifierName => {
        if (currentUsagesByName[identifierName].length === 1) {
          context.report(
            currentUsagesByName[identifierName][0],
            `Private member "${identifierName}" is only used once.`
          );
        }
      });
    };

    const addIdentifierToCurrentClass = identifier => {
      const name = identifier.name;

      usagesByClass[0][name] = usagesByClass[0][name] || [];
      usagesByClass[0][name].push(identifier);
    };

    return {
      ':matches(ClassExpression,ClassDeclaration)': () => usagesByClass.unshift({}),
      ':matches(ClassExpression,ClassDeclaration):exit': reportUnusedIdentifiers,
      'MemberExpression[object.type="ThisExpression"][property.type="Identifier"][property.name.0="_"]': node =>
        addIdentifierToCurrentClass(node.property),
      'MethodDefinition[key.type="Identifier"][key.name.0="_"]': node =>
        addIdentifierToCurrentClass(node.key)
    };
  }
};
