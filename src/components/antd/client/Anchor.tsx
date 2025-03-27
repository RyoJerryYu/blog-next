import { pink500 } from "@/utils/theme";
import { type AnchorProps, Anchor as AntdAnchor, ConfigProvider } from "antd";

export function Anchor(props: AnchorProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: pink500,
        },
      }}
    >
      <AntdAnchor {...props} />
    </ConfigProvider>
  );
}
