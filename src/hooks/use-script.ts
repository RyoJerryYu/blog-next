import { RefObject, useEffect, useState } from "react";

export type UseScriptParams = {
  url: string;
  attributes?: Record<string, string>;
  ref: RefObject<HTMLElement | null>;
};

type ScriptStatus = "idle" | "loading" | "ready" | "error";

const useScript = (params: UseScriptParams) => {
  const { url, attributes, ref } = params;

  const [status, setStatus] = useState<ScriptStatus>(url ? "loading" : "idle");
  const setAttributeStatus = (e: Event) => {
    setStatus(e.type === "load" ? "ready" : "error");
  };

  useEffect(
    () => {
      if (!url) {
        setStatus("idle");
        return;
      }

      // prevent adding script tag if it already exists
      // now it's only for using utterances,
      // replacing or only not appending script tag won't work well
      let script: HTMLScriptElement;
      if (ref.current?.children?.length) {
        script = ref.current.children[0] as HTMLScriptElement;
      } else {
        script = document.createElement("script");

        script.src = url;
        script.async = true;
        script.crossOrigin = "anonymous";
        if (attributes) {
          Object.keys(attributes).forEach((key) => {
            script.setAttribute(key, attributes[key]);
          });
        }
        ref.current?.appendChild(script);
      }

      script.addEventListener("load", setAttributeStatus);
      script.addEventListener("error", setAttributeStatus);

      return () => {
        if (script) {
          script.removeEventListener("load", setAttributeStatus);
          script.removeEventListener("error", setAttributeStatus);
        }
      };
    },
    // create script tag only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url, attributes]
  );

  return status;
};

export default useScript;
