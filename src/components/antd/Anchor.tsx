import { AnchorProps } from "antd";
import { dynamicLoading } from "../Loading/dynamic-loading";

const AnchorDyn = dynamicLoading(
  async () => (await import("antd")).Anchor,
  true
);

export function Anchor(props: AnchorProps) {
  return <AnchorDyn {...props} />;
}
