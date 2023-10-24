import React from 'react'

const useOnClickOutSlde = (ref: any, handler: any, clas: string, subClass?: string) => {
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
    React.useEffect(() => {
        document.addEventListener('mousedown', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
        };
    }, [ref, handler]);
}

export default useOnClickOutSlde;