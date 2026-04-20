import { useDispatch, UseDispatch } from "react-redux"
import { AppDispatch } from "../redux/store"

export const useAppDispatch = useDispatch<AppDispatch>()