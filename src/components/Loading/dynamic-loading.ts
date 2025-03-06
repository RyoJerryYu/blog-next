import dynamic, { LoaderComponent } from "next/dynamic";
import { createElement } from "react";
import { Loading } from "./Loading";

export const dynamicLoading = <P>(loader: () => LoaderComponent<P>) => {
  return dynamic(
    () => {
      try {
        console.log("Dynamic loading component initialized");
        const component = loader();
        console.log("Dynamic loading component loaded");
        return component;
      } catch (error) {
        console.error("Error in dynamic loading:", error);
        throw error;
      }
    },
    {
      ssr: false,
      loading: (props) => {
        return createElement(Loading, props);
      },
    }
  );
};
