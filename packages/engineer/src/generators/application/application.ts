import type { GeneratorCallback, Tree } from '@nx/devkit';
import { formatFiles, runTasksInSerial } from '@nx/devkit';
import { assertNotUsingTsSolutionSetup } from '@nx/js/src/utils/typescript/ts-solution-setup';
import { applicationGenerator as nodeApplicationGenerator } from '@nx/node';

import { initGenerator } from '../init/init';
import {
  createFiles,
  normalizeOptions,
  toNodeApplicationGeneratorOptions,
  updateTsConfig,
} from './lib';
import type { ApplicationGeneratorOptions } from './schema';
import { ensureDependencies } from '../../utils/ensure-dependencies';

export async function applicationGenerator(
  tree: Tree,
  rawOptions: ApplicationGeneratorOptions
): Promise<GeneratorCallback> {
  return await applicationGeneratorInternal(tree, {
    addPlugin: false,
    ...rawOptions,
  });
}

export async function applicationGeneratorInternal(
  tree: Tree,
  rawOptions: ApplicationGeneratorOptions
): Promise<GeneratorCallback> {
  // 检查当前项目是否使用了特定的 TypeScript 配置，并在不支持该配置时输出错误信息并终止进程。
  assertNotUsingTsSolutionSetup(tree, 'nest', 'application');
  // 对传入的原始选项进行处理和标准化，以确保它们符合预期的格式和要求。
  const options = await normalizeOptions(tree, rawOptions);
  // 对文件系统进行更改后执行的回调函数的数组
  // GeneratorCallback就是一个函数类型：type GeneratorCallback = () => void | Promise<void>;
  const tasks: GeneratorCallback[] = [];
  // 根据传入的选项初始化生成器，添加必要的依赖，并格式化项目文件
  const initTask = await initGenerator(tree, {
    skipPackageJson: options.skipPackageJson,
    skipFormat: true,
  });
  // 执行一个回调函数initTask
  tasks.push(initTask);
  // 生成 Node.js 应用程序
  const nodeApplicationTask = await nodeApplicationGenerator(
    tree,
    toNodeApplicationGeneratorOptions(options)
  );
  tasks.push(nodeApplicationTask);
  createFiles(tree, options);
  updateTsConfig(tree, options);

  if (!options.skipPackageJson) {
    tasks.push(ensureDependencies(tree));
  }

  if (!options.skipFormat) {
    await formatFiles(tree);
  }

  return runTasksInSerial(...tasks);
}

export default applicationGenerator;
