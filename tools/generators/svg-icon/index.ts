import { joinPathFragments, Tree } from '@nrwl/devkit';
import { libraryGenerator, Linter } from '@nrwl/workspace';
import { execSync } from 'child_process';

export interface SvgIconGeneratorSchema {
  force: boolean;
}

export default async function (
  tree: Tree,
  schema: SvgIconGeneratorSchema = { force: false }
) {
  const svgsPath = 'libs/icons/svgs';
  const iconsPath = tree
    .children(svgsPath)
    .filter((path) => path.endsWith('.svg'))
    .map((svg) => svg.slice(0, -4));

  execSync(`npx svg-generator`);

  for (const iconPath of iconsPath) {
    const libPath = joinPathFragments('libs/chat-web/shared/icons', iconPath);

    const isLibExist = tree.exists(libPath);

    if (isLibExist && !schema.force) {
      continue;
    }

    await libraryGenerator(tree, {
      name: iconPath,
      directory: 'chat-web/shared/icons',
      buildable: true,
      tags: 'scope:shared,type:icon',
      linter: Linter.None,
      strict: false,
      unitTestRunner: 'none',
      testEnvironment: 'node',
    });

    tree.delete(`${libPath}/src/lib/chat-web-shared-icons-${iconPath}.ts`);

    tree.write(
      `${libPath}/src/lib/${iconPath}.ts`,
      tree.read(`${svgsPath}/${iconPath}.ts`)
    );

    tree.write(
      `${libPath}/src/index.ts`,
      `
export * from './lib/${iconPath}';
    `
    );

    execSync(`rm ${svgsPath}/${iconPath}.ts`);
  }
}
