import { LoadError } from "@/components/Loading/LoadError";
import { Loading } from "@/components/Loading/Loading";
import { ExcalidrawElement } from "@excalidraw/excalidraw/dist/types/excalidraw/element/types";
import { Box } from "@mui/material";
import LZString from "lz-string";
import useSWR from "swr";
import { ExcalidrawScene } from "./ExcalidrawScene";

export type EmbededExcalidrawProps = {
  file: string;
  url: string;
  label?: string;
};

/**
 * Parse Markdown format excalidraw file
 * Supports both compressed-json (base64 LZ-String) and plain json code blocks
 */
function parseExcalidrawMarkdown(content: string): ExcalidrawElement[] | null {
  // First, try to find compressed-json code block
  const compressedJsonMatch = content.match(
    /```compressed-json\n([\s\S]*?)\n```/
  );
  if (compressedJsonMatch) {
    // Extract base64 string and remove all whitespace characters (including newlines and spaces)
    const compressedBase64 = compressedJsonMatch[1].replace(/\s/g, "");
    if (!compressedBase64) {
      return null;
    }

    try {
      // Decompress base64-encoded LZ-String data
      const decompressed = LZString.decompressFromBase64(compressedBase64);
      if (!decompressed) {
        return null;
      }

      // Parse JSON
      const parsed = JSON.parse(decompressed);
      return parsed.elements as ExcalidrawElement[];
    } catch (error) {
      console.error(
        "Failed to parse compressed-json excalidraw markdown:",
        error
      );
      return null;
    }
  }

  // If compressed-json not found, try to find plain json code block
  const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
  if (jsonMatch) {
    try {
      const jsonContent = jsonMatch[1].trim();
      if (!jsonContent) {
        return null;
      }

      // Parse JSON directly
      const parsed = JSON.parse(jsonContent);
      return parseExcalidrawJson(parsed);
    } catch (error) {
      console.error("Failed to parse json excalidraw markdown:", error);
      return null;
    }
  }

  return null;
}

/**
 * Extract elements from JSON format excalidraw data
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

    // If it's JSON format
    if (contentType.includes("application/json")) {
      const json = await response.json();
      return parseExcalidrawJson(json);
    }

    // If it's text format (possibly Markdown)
    const text = await response.text();

    // Try to parse as JSON (for backward compatibility)
    try {
      const json = JSON.parse(text);
      const elements = parseExcalidrawJson(json);
      if (elements) {
        return elements;
      }
    } catch {
      // Not JSON, continue trying Markdown format
    }

    // Try to parse as Markdown format
    return parseExcalidrawMarkdown(text);
  });

  return (
    <Box
      sx={{
        position: "relative", // relative
        height: "600px", // h-[600px]
        marginTop: "1rem", // my-4
        marginBottom: "1rem",
      }}
    >
      {isLoading ? (
        <Loading />
      ) : refData ? (
        <ExcalidrawScene elements={refData} />
      ) : (
        <LoadError />
      )}
    </Box>
  );
}
