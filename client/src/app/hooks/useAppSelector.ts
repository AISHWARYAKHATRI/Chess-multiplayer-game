// useAppSelector.ts
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../redux/store"; // Adjust the import path

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
