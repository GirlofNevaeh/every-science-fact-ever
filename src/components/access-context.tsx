import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getAccess } from "@/lib/access";

type AccessValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const AccessContext = createContext<AccessValue>({ open: false, setOpen: () => {} });

export function useAccess(): AccessValue {
  return useContext(AccessContext);
}

export function AccessProvider({ serverOpen, children }: { serverOpen: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(serverOpen);
  const read = useServerFn(getAccess);
  useEffect(() => {
    setOpen(serverOpen);
  }, [serverOpen]);
  useEffect(() => {
    if (serverOpen) return;
    let live = true;
    void read()
      .then((result) => {
        if (live && result.open) setOpen(true);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [read, serverOpen]);
  return <AccessContext.Provider value={{ open, setOpen }}>{children}</AccessContext.Provider>;
}
