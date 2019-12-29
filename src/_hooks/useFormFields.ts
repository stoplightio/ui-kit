import { useImmer } from 'use-immer';
import { Dictionary } from '../types';

export function useFormFields<T extends string>(
  defaultValues: Dictionary<string, T>,
): [Dictionary<string, T>, (key: T, value: string) => void, (value: Dictionary<string, T>) => void] {
  const [variables, _updateVariables] = useImmer(defaultValues);

  function updateVariable(key: string, value: string) {
    // @ts-ignore
    _updateVariables(draft => {
      draft[key] = value;
    });
  }

  function updateVariables(value: Dictionary<string, T>) {
    // @ts-ignore
    _updateVariables(() => {
      return value;
    });
  }

  return [variables, updateVariable, updateVariables];
}
