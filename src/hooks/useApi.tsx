import { useState, useEffect } from 'react'
import { ApiStatus } from '../interfaces'

interface IApiData {
    status: ApiStatus;
    error: any;
    data: any;
}

export const useApi = (url: string) => {
    const [data, setData] = useState<IApiData>({
      status: ApiStatus.Loading,
      error: null,
      data: null,
    });
  
    useEffect(() => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json()
        })
        .then((data) => {
          setData({
            status: ApiStatus.Success,
            error: null,
            data
          });
        })
        .catch((err: Error) => {
            setData({
              status: ApiStatus.Error,
              data: null,
              error: err
            });
        });
    }, [url]);
  
    return data;
  }

export default useApi;