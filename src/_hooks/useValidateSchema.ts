import { isEqual } from 'lodash';
import * as React from 'react';
import * as yup from 'yup';

export function useValidateSchema(
  schema?: yup.Schema<any>,
  value?: any,
  { abortEarly, recursive, context }: yup.ValidateOptions = {},
): string[] {
  const [errors, setErrors] = React.useState<string[]>([]);
  const memoizedSchema = useDeepCompareMemoize(schema);
  const memoizedContext = useDeepCompareMemoize(context);

  React.useEffect(() => {
    if (!memoizedSchema) {
      setErrors([]);
      return;
    }
    memoizedSchema
      .validate(value, { strict: true, abortEarly, recursive, context: memoizedContext }) // to avoid taking a useEffect dependency on validateOpts that is an object
      .then(() => {
        setErrors([]);
      })
      .catch(e => {
        setErrors(e.errors || ['Input is invalid']);
      });
  }, [memoizedSchema, value, abortEarly, recursive, memoizedContext]);

  return errors;
}

function useDeepCompareMemoize<T>(value: T) {
  const ref = React.useRef<T>();

  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}
