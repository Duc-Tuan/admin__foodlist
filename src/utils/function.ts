import { useEffect, useRef, useState } from 'react';

const Function = {
  params: (params: any) => {
    const query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
    return `?${query}`;
  },
  convertBase64: (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (readerEvt: any) => {
        let encoded = readerEvt.target.result.toString().replace(/^data:(.*,)?/, '');
        resolve(encoded);
      };
      reader.onerror = (error) => reject(error);
    });
  },
  useOnClickOutside: (ref: any, handler: any, clas: string, subClass?: string) => {
    const listener = (event: any) => {
      const path = event.path || (event.composedPath && event.composedPath());
      if (
        !ref.current ||
        ref.current.contains(event.target) ||
        path.filter((i: any) => i.className === clas).length !== 0 ||
        (subClass && path.filter((i: any) => i.className === subClass).length !== 0)
      ) {
        return;
      }
      handler(event);
    };
    useEffect(() => {
      document.addEventListener('mousedown', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
      };
    }, [ref, handler]);
  },
  useDebounce: (value: any, delay = 470, callback = (f: any) => f) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
        callback(null);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  },
  useInterval: (callback: any, delay: any) => {
    const savedCallback = useRef<any>();
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    useEffect(() => {
      function tick() {
        if (savedCallback) {
          savedCallback.current();
        }
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  },
  useTitle: (title: string) => {
    useEffect(() => {
      const prevTitle = document.title;
      document.title = title;

      const link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
      link.href = 'https://iris-buck.s3.ap-southeast-1.amazonaws.com/production/logo.ico';

      return () => {
        document.title = prevTitle;
      };
    });
  },
};
export default Function;
