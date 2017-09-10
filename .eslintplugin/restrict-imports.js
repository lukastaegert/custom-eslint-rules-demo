module.exports = {
  create: context => ({
    'ImportDeclaration': node => {
      const srcPath = node.source.value;

      if (
        /^\.\.(\w|\/)*(\.js)?$/.test(srcPath)
        || /^\.\/\w+(\.js)?$/.test(srcPath)
      ) {
        context.report(node, `You are not allowed to import ${srcPath}. You may only import from nested folders.`)
      }
    }
  })
};
