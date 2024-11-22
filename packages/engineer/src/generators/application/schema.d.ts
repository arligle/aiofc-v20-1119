import type { Linter, LinterType } from '@nx/eslint';
// 生成器选项，模版文件的变量应在这里定义，配合schema.json使用,获得用户输入的变量值
export interface ApplicationGeneratorOptions {
  directory: string;
  name?: string;
  frontendProject?: string;
  linter?: Linter | LinterType;
  skipFormat?: boolean;
  skipPackageJson?: boolean;
  standaloneConfig?: boolean;
  tags?: string;
  unitTestRunner?: 'jest' | 'none';
  e2eTestRunner?: 'jest' | 'none';
  setParserOptionsProject?: boolean;
  rootProject?: boolean;
  strict?: boolean;
  addPlugin?: boolean;
}

interface NormalizedOptions extends ApplicationGeneratorOptions {
  appProjectName: string;
  appProjectRoot: Path;
}
