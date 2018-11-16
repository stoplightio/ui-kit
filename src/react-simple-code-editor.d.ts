declare module 'react-simple-code-editor' {
  import * as React from 'react';

  export interface IReactSimpleCodeEditorProps {
    value: string;
    onValueChange: (value: string) => any;
    highlight: (value: string) => string | JSX.Element;
    tabSize?: number;
    insertSpaces?: boolean;
    ignoreTabKey?: boolean;
    padding: number | string;
    style?: {};
  }

  export default class ReactSimpleCodeEditor extends React.Component<IReactSimpleCodeEditorProps> {}
}
