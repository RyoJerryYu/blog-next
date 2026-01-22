import { LoadError } from "@/components/Loading/LoadError";
import { Loading } from "@/components/Loading/Loading";
import { ExcalidrawElement } from "@excalidraw/excalidraw/dist/types/excalidraw/element/types";
import LZString from "lz-string";
import useSWR from "swr";
import { ExcalidrawScene } from "./ExcalidrawScene";

export type EmbededExcalidrawProps = {
  file: string;
  url: string;
  label?: string;
};

/**
 * 从 Markdown 格式的 excalidraw 文件中提取 compressed-json 代码块并解压
 */
function parseExcalidrawMarkdown(content: string): ExcalidrawElement[] | null {
  // 查找 compressed-json 代码块
  const compressedJsonMatch = content.match(
    /```compressed-json\n([\s\S]*?)\n```/
  );
  if (!compressedJsonMatch) {
    return null;
  }

  // 提取 base64 字符串并移除所有空白字符（包括换行和空格）
  const compressedBase64 = compressedJsonMatch[1].replace(/\s/g, "");
  if (!compressedBase64) {
    return null;
  }

  try {
    // 解压缩 base64 编码的 LZ-String 数据
    const decompressed = LZString.decompressFromBase64(compressedBase64);
    if (!decompressed) {
      return null;
    }

    // 解析 JSON
    const parsed = JSON.parse(decompressed);
    return parsed.elements as ExcalidrawElement[];
  } catch (error) {
    console.error("Failed to parse excalidraw markdown:", error);
    return null;
  }
}

/**
 * 从 JSON 格式的 excalidraw 数据中提取 elements
 */
function parseExcalidrawJson(data: any): ExcalidrawElement[] | null {
  if (data && Array.isArray(data.elements)) {
    return data.elements as ExcalidrawElement[];
  }
  return null;
}

export default function EmbededExcalidraw({
  file,
  url,
  label,
}: EmbededExcalidrawProps) {
  const { data: refData, isLoading } = useSWR(url, async (url) => {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type") || "";

    // 如果是 JSON 格式
    if (contentType.includes("application/json")) {
      const json = await response.json();
      return parseExcalidrawJson(json);
    }

    // 如果是文本格式（可能是 Markdown）
    const text = await response.text();

    // 尝试解析为 JSON（向后兼容）
    try {
      const json = JSON.parse(text);
      const elements = parseExcalidrawJson(json);
      if (elements) {
        return elements;
      }
    } catch {
      // 不是 JSON，继续尝试 Markdown 格式
    }

    // 尝试解析为 Markdown 格式
    return parseExcalidrawMarkdown(text);
  });

  return (
    <div className="relative h-[600px] my-4">
      {isLoading ? (
        <Loading />
      ) : refData ? (
        <ExcalidrawScene elements={refData} />
      ) : (
        <LoadError />
      )}
    </div>
  );
}
