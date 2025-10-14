import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type ScriptStatus = "idle" | "loading" | "ready" | "error";

type GlobalScriptContextType = {
  initScript: (
    id: string,
    url: string,
    attributes?: Record<string, string>
  ) => ScriptStatus;
  statusMap: Record<string, ScriptStatus>;
};

const GlobalScriptContext = createContext<GlobalScriptContextType>({
  initScript: () => "idle",
  statusMap: {},
});

export const GlobalScriptProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const scriptRef = useRef<HTMLDivElement>(null);
  const domMap = useRef<Record<string, HTMLElement | null>>({});
  const [statusMap, setStatusMap] = useState<Record<string, ScriptStatus>>({});

  const initScript = useCallback(
    (id: string, url: string, attributes?: Record<string, string>) => {
      if (domMap.current[id]) {
        return statusMap[id];
      }
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.crossOrigin = "anonymous";
      if (attributes) {
        Object.keys(attributes).forEach((key) => {
          script.setAttribute(key, attributes[key]);
        });
      }
      scriptRef.current?.appendChild(script);
      script.addEventListener("load", () => {
        setStatusMap((prev) => ({ ...prev, [id]: "ready" }));
      });
      script.addEventListener("error", () => {
        setStatusMap((prev) => ({ ...prev, [id]: "error" }));
      });
      domMap.current[id] = script;
      return "loading";
    },
    [statusMap]
  );

  return (
    <>
      <GlobalScriptContext.Provider
        value={{ initScript: initScript, statusMap: statusMap }}
      >
        {children}
      </GlobalScriptContext.Provider>
      <div ref={scriptRef} />
    </>
  );
};

type UseGlobalScriptProps = {
  id: string;
  url: string;
  attributes?: Record<string, string>;
};

export const useGlobalScript = (props: UseGlobalScriptProps) => {
  const { id, url, attributes } = props;
  const { initScript, statusMap } = useContext(GlobalScriptContext);

  useEffect(() => {
    initScript(id, url, attributes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, url, attributes]);

  return statusMap[id];
};
