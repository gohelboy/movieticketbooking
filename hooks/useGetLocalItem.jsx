import { useEffect, useState } from 'react'

const useGetLocalItem = (localItem) => {
    const [item, setItem] = useState("");

    useEffect(() => {
        const storedItem = localStorage.getItem(localItem);
        if (storedItem) {
            setItem(JSON.parse(storedItem));
        }
    }, [localItem]);

    return item;
}

export default useGetLocalItem