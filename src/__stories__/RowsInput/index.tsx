import { action } from '@storybook/addon-actions';
import { array, boolean, number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Icon } from '../..';
import { Button, ControlGroup, FormInput, RowsInput, SecretInput } from '../..';

export type SavedGitCredential = {
  domain: string;
  username: string;
  password: string;
  name: string;
  email: string;
};

const GitCredentialRow: React.FunctionComponent<{
  row: SavedGitCredential;
  onRemove: () => void;
  onChange: (row: SavedGitCredential) => void;
}> = ({ row, onRemove, onChange }) => {
  const [domain, setDomain] = React.useState(row.domain);
  const [username, setUsername] = React.useState(row.username);
  const [password, setPassword] = React.useState(row.password);
  const [name, setName] = React.useState(row.name);
  const [email, setEmail] = React.useState(row.email);
  const saveRow = () => onChange({ domain, username, password, name, email });
  return (
    <ControlGroup className="my-2">
      <FormInput
        className="flex-1"
        placeholder="Domain"
        value={domain}
        onChange={(e: React.FormEvent<HTMLInputElement>) => setDomain(e.currentTarget.value)}
        onBlur={saveRow}
        autoFocus={row.domain === ''}
      />
      <FormInput
        className="flex-1"
        placeholder="Username"
        value={username}
        onChange={(e: React.FormEvent<HTMLInputElement>) => setUsername(e.currentTarget.value)}
        onBlur={saveRow}
      />
      <SecretInput
        className="flex-1"
        placeholder="Password"
        value={password}
        onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
        onBlur={saveRow}
      />
      <FormInput
        className="flex-1"
        placeholder="Author Name"
        value={name}
        onChange={(e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value)}
        onBlur={saveRow}
      />
      <FormInput
        className="flex-1"
        placeholder="Author Email"
        value={email}
        onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
        onBlur={saveRow}
      />
      <Button icon={<Icon iconSize={12} icon="trash" />} title="Remove" onClick={onRemove} />
    </ControlGroup>
  );
};

storiesOf('RowsInput', module).add('example', () => {
  const [rows, setRows] = React.useState<SavedGitCredential[]>([]);

  return (
    <RowsInput
      rows={rows}
      text="Credential"
      RowInput={GitCredentialRow}
      onAddRow={() => {
        console.log('foo', rows);
        rows.push({
          domain: '',
          username: '',
          password: '',
          name: '',
          email: '',
        });
        setRows(rows);
      }}
      onRemoveRow={i => {
        rows.splice(i, 1);
        setRows(rows);
      }}
      onChangeRow={(i, row) => {
        rows[i] = row;
        setRows(rows);
      }}
    />
  );
});
