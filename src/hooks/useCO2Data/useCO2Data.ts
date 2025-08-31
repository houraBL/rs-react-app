import { CO2_JSON_LINK } from '@app/constants';
import type { CO2Dataset } from '@app/types';

type Resource<T> = {
  read: () => T;
};

function wrapPromise<T>(promise: Promise<T>): Resource<T> {
  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: T;
  let error: unknown;

  const suspender = promise.then(
    (res) => {
      status = 'success';
      result = res;
    },
    (err) => {
      status = 'error';
      error = err;
    }
  );

  return {
    read() {
      if (status === 'pending') throw suspender;
      if (status === 'error') throw error;
      if (result === undefined) {
        throw new Error('Data is undefined after promise resolution');
      }
      return result;
    },
  };
}

const co2DataResource = wrapPromise(
  fetch(CO2_JSON_LINK).then((res) => {
    if (!res.ok) {
      throw new Error('Failed to fetch CO₂ data');
    }
    return res.json() as Promise<CO2Dataset>;
  })
);

export default function useCO2Data() {
  return co2DataResource.read();
}
