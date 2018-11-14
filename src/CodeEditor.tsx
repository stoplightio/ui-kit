import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-javascript';
import * as React from 'react';
import Editor from 'react-simple-code-editor';
import { createGlobalStyle } from 'styled-components';
import { themeGet } from 'styled-system';

const CodeEditorStyle = createGlobalStyle`
  .ui-kit-code-editor {
    background: ${themeGet('components.codeEditor.bg', '#fff')};
    border: 1px solid ${themeGet('components.codeEditor.border', '#000')};
    
    textarea {
      &:focus {
        outline: none;
      }
    }
    
    .namespace {
      opacity: 0.7;
    }
      
    .token {
      &.comment,
      &.prolog,
      &.doctype,
      &.cdata {
        color: ${themeGet('components.codeEditor.syntax.comment', '#90a4ae')};
      }
    
      &.punctuation {
        color: #9e9e9e;
      }
      
      &.property,
      &.tag,
      &.boolean,
      &.number,
      &.symbol,
      &.deleted {
        color: ${themeGet('components.codeEditor.syntax.primary', '#e91e63')};
      }
      
      &.selector,
      &.attr-name,
      &.string,
      &.char,
      &.builtin,
      &.inserted {
        color: ${themeGet('components.codeEditor.syntax.secondary', '#4caf50')};
      }

      &.operator,
      &.entity,
      &.url {
        color: ${themeGet('components.codeEditor.syntax.operator', '#795548')};
      }
      
      &.atrule,
      &.attr-value,
      &.keyword {
        color: ${themeGet('components.codeEditor.syntax.keyword', '#3f51b5')};
      }
      
      &.function {
        color: ${themeGet('components.codeEditor.syntax.function', '#f44336')};
      }
      
      &.variable {
        color: ${themeGet('components.codeEditor.syntax.variable', '#ff9800')};
      }

      &.regex,
      &.important {
        color: ${themeGet('components.codeEditor.syntax.regex', '#ff9800')};
      }

      &.important,
      &.bold {
        font-weight: bold;
      }
    
      &.italic {
        font-style: italic;
      }
    
      &.entity {
        cursor: help;
      }
    }
  }
`;

export interface ICodeEditorProps {
  initialCode?: string;
  onCodeChange: (code: string) => any;
  style?: object;
}

export interface ICodeEditorState {
  code: string;
}

export class CodeEditor extends React.PureComponent<ICodeEditorProps, ICodeEditorState> {
  constructor(props: ICodeEditorProps) {
    super(props);

    this.state = {
      code: props.initialCode || '',
    };
  }

  private handleCodeChange = (code: string) => {
    this.setState({ code });
    this.props.onCodeChange(code);
  };

  public render() {
    const {
      props: { style },
      state: { code }
    } = this;

    return (
      <div className="ui-kit-code-editor">
        <CodeEditorStyle />
        <Editor
          value={code}
          onValueChange={this.handleCodeChange}
          highlight={(currentCode: string) => highlight(currentCode, languages.js)}
          padding={10}
          style={style}
        />
      </div>
    );
  }
}
