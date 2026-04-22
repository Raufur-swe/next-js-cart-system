// this file is used to create a typed version of the useSelector hook from react-redux
// this he
import { useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { RootState } from "../redux/store";
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector