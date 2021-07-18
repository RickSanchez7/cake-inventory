import useSWR from 'swr';
import axios from 'axios';

export function useFetch<Data = any>(
  url: string,
  initialData: any = undefined
) {
  const { data, error } = useSWR<Data>(url, { initialData });

  return { data, error, isLoading: !error && !data };
}
