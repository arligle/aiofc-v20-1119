import type { GeneratorCallback, Tree } from '@nx/devkit';
import { addDependenciesToPackageJson } from '@nx/devkit';
import { nestJsSchematicsVersion, nxVersion } from '../../../utils/versions';
import { InitGeneratorOptions } from '../schema';
// 将指定的开发依赖项添加到 add-dependencies.ts ) 文件中
export function addDependencies(
  tree: Tree,
  options: InitGeneratorOptions
): GeneratorCallback {
  return addDependenciesToPackageJson(
    tree,
    {},
    {
      '@nestjs/schematics': nestJsSchematicsVersion,
      '@nx/nest': nxVersion,
    },
    undefined,
    options.keepExistingVersions
  );
}
