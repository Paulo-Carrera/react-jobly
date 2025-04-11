import {useState, useEffect} from "react";

function useLocalStorage(key, firstValue) {
    const initialValue = localStorage.getItem(key) || firstValue;

    const [item, setItem] = useState(initialValue);

    useEffect(function setKeyInLocalStorage(){
        console.debug("hooks useLocalStorage useEffect", "item=", item);
        localStorage.setItem(key, item);
    }, [key, item])

    return [item, setItem];
}

export default useLocalStorage;