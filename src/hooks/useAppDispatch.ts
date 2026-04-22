// this file is used to create a typed version of the useDispatch hook from react-redux. this helps to avoid the need to import the AppDispatch type in every file that uses the useDispatch hook. instead, we can just use the useAppDispatch hook which is already typed with the AppDispatch type.

import { useDispatch } from "react-redux"
import { AppDispatch } from "../redux/store"

export const useAppDispatch = ()=> useDispatch<AppDispatch>()