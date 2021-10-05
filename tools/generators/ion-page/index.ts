import { formatFiles, installPackagesTask, names, Tree } from '@nrwl/devkit';
import { wrapAngularDevkitSchematic } from '@nrwl/devkit/ngcli-adapter';

/**
 * The change detection strategy to use in the new component.
 */
enum ChangeDetection {
  Default = 'Default',
  OnPush = 'OnPush',
}

/**
 * The file extension or preprocessor to use for style files, or 'none' to skip generating
 * the style file.
 */
enum Style {
  Css = 'css',
  Less = 'less',
  None = 'none',
  Sass = 'sass',
  Scss = 'scss',
}

/**
 * The view encapsulation strategy to use in the new component.
 */
enum ViewEncapsulation {
  Emulated = 'Emulated',
  None = 'None',
  ShadowDom = 'ShadowDom',
}

interface IonPageSchema {
  /**
   * The change detection strategy to use in the new component.
   */
  changeDetection?: ChangeDetection;
  /**
   * Specifies if the style will contain `:host { display: block; }`.
   */
  displayBlock?: boolean;
  /**
   * The declaring NgModule exports this component.
   */
  export?: boolean;
  /**
   * Create the new files at the top level of the current project.
   */
  flat?: boolean;
  /**
   * Include styles inline in the component.ts file. Only CSS styles can be included inline.
   * By default, an external styles file is created and referenced in the component.ts file.
   */
  inlineStyle?: boolean;
  /**
   * Include template inline in the component.ts file. By default, an external template file
   * is created and referenced in the component.ts file.
   */
  inlineTemplate?: boolean;
  /**
   * The declaring NgModule.
   */
  module?: string;
  /**
   * The name of the component.
   */
  name: string;
  /**
   * The path at which to create the component file, relative to the current workspace.
   * Default is a folder with the same name as the component in the project root.
   */
  path?: string;
  /**
   * The prefix to apply to the generated component selector.
   */
  prefix?: string;
  /**
   * The name of the project.
   */
  project?: string;
  /**
   * The HTML selector to use for this component.
   */
  selector?: string;
  /**
   * Do not import this component into the owning NgModule.
   */
  skipImport?: boolean;
  /**
   * Specifies if the component should have a selector or not.
   */
  skipSelector?: boolean;
  /**
   * Do not create "spec.ts" test files for the new component.
   */
  skipTests?: boolean;
  /**
   * The file extension or preprocessor to use for style files, or 'none' to skip generating
   * the style file.
   */
  style?: Style;
  /**
   * Adds a developer-defined type to the filename, in the format "name.type.ts".
   */
  type?: string;
  /**
   * The view encapsulation strategy to use in the new component.
   */
  viewEncapsulation?: ViewEncapsulation;
}

export default async function (tree: Tree, schema: IonPageSchema) {
  const normalizedNames = names(schema.name);

  const componentGenerator = wrapAngularDevkitSchematic(
    '@schematics/angular',
    'component'
  );

  await componentGenerator(tree, { ...schema, name: normalizedNames.fileName });

  const componentChanges = tree
    .listChanges()
    .filter((change) => change.path.includes('.component.'));

  for (const componentChange of componentChanges) {
    tree.rename(
      componentChange.path,
      componentChange.path.replace('.component.', '.page.')
    );
  }

  const moduleChange = tree
    .listChanges()
    .filter((change) => change.path.includes('.module.'))
    .pop();

  if (moduleChange && moduleChange.type === 'UPDATE') {
    const content = tree.read(moduleChange.path, 'utf-8');

    tree.write(
      moduleChange.path,
      content
        .replace(
          `${normalizedNames.fileName}.component`,
          `${normalizedNames.fileName}.page`
        )
        .replace(
          new RegExp(`${normalizedNames.className}Component`, 'g'),
          `${normalizedNames.className}Page`
        )
    );
  }

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}
