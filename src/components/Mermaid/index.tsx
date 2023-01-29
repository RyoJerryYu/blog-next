"use client";

import mermaid from "mermaid";
import React, { useEffect, useLayoutEffect } from "react";

type MermaidProps = {
  name?: string;
  children: string;
  className?: string;
};

const Mermaid = ({ name = "mermaid", children, className }: MermaidProps) => {
  const svg = mermaid.render(name, children);

  return svg === "" ? (
    <code>{children}</code>
  ) : (
    <div
      className={className ? `mermaid ${className}` : `mermaid`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default Mermaid;
