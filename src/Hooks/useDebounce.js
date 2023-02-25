import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState('');

    useEffect(() => {
        const handlerDelay = setTimeout(() => setDebouncedValue(value), delay);

        // clean up timeout id
        return () => clearTimeout(handlerDelay);
    }, [value]);

    return debouncedValue;
};

export default useDebounce;
