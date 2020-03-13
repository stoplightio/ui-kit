import * as React from 'react';
import { Button, ButtonGroup } from '..';

export interface IRowInputProps<T> {
  key: string;
  row: T;
  onRemove: () => void;
  onChange: (row: T) => void;
}

export interface IRowsInputProps<T> {
  rows: T[];
  text: string;
  onAddRow: () => void;
  onRemoveRow: (i: number) => void;
  onChangeRow: (i: number, row: T) => void;
  RowInput: React.FunctionComponent<IRowInputProps<T>>;
}

export function RowsInput<T>({ rows, text, onAddRow, onRemoveRow, onChangeRow, RowInput }: IRowsInputProps<T>) {
  const [rowsShiftedIndex, shiftRows] = React.useReducer(i => i + 1, 0);
  return (
    <>
      <ButtonGroup>
        <Button icon="plus" text={text} onClick={onAddRow} />
      </ButtonGroup>
      {rows.map((row, i) => (
        <RowInput
          key={`${i}-${rowsShiftedIndex}`}
          row={row}
          onRemove={() => {
            onRemoveRow(i);
            shiftRows();
          }}
          onChange={(row: T) => onChangeRow(i, row)}
        />
      ))}
    </>
  );
}
