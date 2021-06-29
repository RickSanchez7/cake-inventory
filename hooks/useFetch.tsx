import useSWR from 'swr';
import axios from 'axios';

export function useFetch<Data = any>(url: string) {
  const { data, error } = useSWR<Data>(url, async url => {
    const { data } = await axios.get(url);

    return data;
  });

  return { data, error };
}
