import { Tree, readNxJson } from '@nx/devkit';
import {
  determineProjectNameAndRootOptions,
  ensureProjectName,
} from '@nx/devkit/src/generators/project-name-and-root-utils';
import { Linter } from '@nx/eslint';
import type { Schema as NodeApplicationGeneratorOptions } from '@nx/node/src/generators/application/schema';
import type { ApplicationGeneratorOptions, NormalizedOptions } from '../schema';
/**
 * @description 标准化应用生成器的选项，确保生成器在不同配置下都能正常工作
 * @export
 * @param tree
 * @param options
 * @return {*}
 */
export async function normalizeOptions(
  tree: Tree,
  options: ApplicationGeneratorOptions
): Promise<NormalizedOptions> {
  await ensureProjectName(tree, options, 'application');
  const { projectName: appProjectName, projectRoot: appProjectRoot } =
    await determineProjectNameAndRootOptions(tree, {
      name: options.name,
      projectType: 'application',
      directory: options.directory,
      rootProject: options.rootProject,
    });
  options.rootProject = appProjectRoot === '.';

  const nxJson = readNxJson(tree);
  const addPlugin =
    process.env.NX_ADD_PLUGINS !== 'false' &&
    nxJson.useInferencePlugins !== false;

  return {
    addPlugin,
    ...options,
    strict: options.strict ?? false,
    appProjectName,
    appProjectRoot,
    linter: options.linter ?? Linter.EsLint,
    unitTestRunner: options.unitTestRunner ?? 'jest',
    e2eTestRunner: options.e2eTestRunner ?? 'jest',
  };
}

export function toNodeApplicationGeneratorOptions(
  options: NormalizedOptions
): NodeApplicationGeneratorOptions {
  return {
    name: options.name,
    directory: options.directory,
    frontendProject: options.frontendProject,
    linter: options.linter,
    skipFormat: true,
    skipPackageJson: options.skipPackageJson,
    standaloneConfig: options.standaloneConfig,
    tags: options.tags,
    unitTestRunner: options.unitTestRunner,
    e2eTestRunner: options.e2eTestRunner,
    setParserOptionsProject: options.setParserOptionsProject,
    rootProject: options.rootProject,
    bundler: 'webpack', // Some features require webpack plugins such as TS transformers
    isNest: true,
    addPlugin: options.addPlugin,
  };
}
