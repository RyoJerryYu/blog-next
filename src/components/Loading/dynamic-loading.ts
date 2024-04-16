import dynamic, { Loader } from "next/dynamic";
import { createElement } from "react";
import { Loading } from "./Loading";

export const dynamicLoading = <P>(loader: Loader<P>) => {
  return dynamic(loader, {
    ssr: false,
    loading: (props) => {
      return createElement(Loading, props);
    },
  });
};
