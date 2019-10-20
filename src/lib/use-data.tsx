import {useEffect, useState} from 'react';
import {ErrorMessage} from '../components/error';
import * as React from 'react';
import {Loading} from '../components/loading';

type Status<T> = {
  error: string | null;
  data: T | undefined;
};


export function useData<T>({
  load,
  render,
  arg
}: {
  load: (arg: any) => Promise<T>,
  render: (data: T) => React.ReactNode,
  arg?: any
}): [React.ReactNode] {
  const [status, setStatus] = useState<Status<T>>({error: null, data: undefined});

  useEffect(() => {
    let enabled = true;
    load(arg)
      .then((data) => {
        if (!enabled) {
          return;
        }
        setStatus({error: null, data});
      })
      .catch((error) => {
        if (!enabled) {
          return;
        }
        setStatus({error: error.message, data: undefined});
      });
    return () => {
      enabled = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arg]);

  if (status.data !== undefined) {
    return [render(status.data)];
  }

  if (status.error !== null) {
    return [<ErrorMessage>{status.error}</ErrorMessage>];
  }

  return [<Loading />];
}
