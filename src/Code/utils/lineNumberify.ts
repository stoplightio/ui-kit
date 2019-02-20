import { ASTNode } from '../types';

const NEW_LINES = /\n/g;

function countNewLines(value: string) {
  const newLines = value.match(NEW_LINES);
  if (newLines === null) return 0;
  return newLines.length;
}

function createLineNumberElement(lineNumber: number): ASTNode {
  return {
    type: 'element',
    tagName: 'span',
    properties: {
      className: ['line-number'],
    },
    children: [
      {
        type: 'text',
        value: String(lineNumber),
      },
    ],
  };
}

function createNewLineElement(): ASTNode {
  return {
    type: 'element',
    tagName: 'span',
    properties: {},
    children: [
      {
        type: 'text',
        value: '\n',
      },
    ],
  };
}

export function lineNumberify(nodes: ASTNode[]) {
  if (nodes.length === 0) return nodes;

  let lineNumber = 1;
  nodes.unshift(createLineNumberElement(lineNumber));

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.type !== 'text') continue;
    const newLinesAmount = countNewLines(node.value!); // text always have value
    if (newLinesAmount > 0) {
      node.value = node.value!.replace(NEW_LINES, '');
      for (let newLine = 0; newLine < newLinesAmount; newLine++) {
        lineNumber++;
        nodes.splice(i, 0, createNewLineElement(), createLineNumberElement(lineNumber));
        i += 2;
      }
    }
  }

  return nodes;
}
