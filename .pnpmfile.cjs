// .pnpmfile.cjs
module.exports = {
  hooks: {
    readPackage(pkg) {
      // Allow scripts to run for Prisma-related packages
      if (
        ['@prisma/client', 'prisma', '@prisma/engines'].includes(pkg.name)
      ) {
        pkg.scripts = pkg.scripts || {};
        return pkg;
      }

      return pkg;
    }
  }
};
