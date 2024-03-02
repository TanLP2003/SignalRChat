import { useEffect, useState } from "react"
import { AppDispatch } from "../../redux";
import { useDispatch } from "react-redux";
import { setSkeleton } from "../../redux/features/loadingSlice";

export const useFetchData = (callback: Function) => {
    const [isFetched, setFetched] = useState<boolean>(false);
    const [error, setError] = useState<Object | null>(null);
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        // dispatch(setSkeleton(true));
        callback()
            .then(() => {
                // dispatch(setSkeleton(false));
                setFetched(true)
            })
            .catch((err: Object) => setError(err))
    }, [])
    return { isFetched, error };
}