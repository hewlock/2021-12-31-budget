import {
    useCallback,
    useState,
} from 'react';

export default function useBooleanState(initialState) {
    const [state, setState] = useState(initialState);
    const setTrue = useCallback(() => setState(true), [setState]);
    const setFalse = useCallback(() => setState(false), [setState]);
    return [state, setTrue, setFalse];
}
