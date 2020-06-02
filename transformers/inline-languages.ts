import * as ts from 'typescript';

export type Options = {
  languages: string[];
};

export default function({ languages }: Options): ts.TransformerFactory<ts.SourceFile> {
  return (context: ts.TransformationContext) => (file: ts.SourceFile) => {
    ts.visitNodes(file.statements, visitNode, ts.isImportDeclaration);
    return file;
  };
}

function visitNode(node: ts.ImportDeclaration): ts.ImportDeclaration {
  if (node.moduleSpecifier && node.moduleSpecifier.getText() === `'prismjs/components/{language}'`) {
    return ts.createImportDeclaration(void 0, void 0, void 0, ts.createStringLiteral('prismjs/components/prism-php'));
  }
  return node;
}
