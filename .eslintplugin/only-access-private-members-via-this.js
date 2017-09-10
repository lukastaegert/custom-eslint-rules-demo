module.exports = {
  create: context => ({
    'MemberExpression[object.type!="ThisExpression"][property.type="Identifier"][property.name.0="_"][property.name.1!="_"]': node =>
      context.report(
        node.property,
        `Illegal access to private member "${node.property
          .name}". Private members may only be accessed via "this".`
      )
  })
};
