import type { WikilinkPreviewMap } from "@/core/page-template/post-type";
import { createContext, useContext } from "react";

export const WikilinkPreviewContext = createContext<WikilinkPreviewMap>({});

export const useWikilinkPreviewMap = () => useContext(WikilinkPreviewContext);
