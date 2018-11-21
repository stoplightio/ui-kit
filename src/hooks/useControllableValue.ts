import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useControllableValue = (externalValue: string = ''): [string, Dispatch<SetStateAction<string>>] => {
  const [value, setValue] = useState(externalValue);

  useEffect(
    () => {
      if (value !== externalValue) {
        setValue(externalValue);
      }
    },
    [externalValue]
  );

  return [value, setValue];
};
