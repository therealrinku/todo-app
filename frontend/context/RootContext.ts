import { createContext } from "react";

interface ContextProps {
  userEmail: string | null;
  setUserEmail: Function;
}

export const RootContext = createContext<ContextProps>({ userEmail: null, setUserEmail: () => {} });
