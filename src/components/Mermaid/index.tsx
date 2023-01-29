"use client";

import mermaid from "mermaid";
import React, { useEffect, useLayoutEffect } from "react";

type MermaidProps = {
  name?: string;
  children: string;
  className?: string;
};

const Mermaid = ({ name = "mermaid", children, className }: MermaidProps) => {
  // const [inited, setInited] = React.useState(false);
  const [diagram, setDiagram] = React.useState("");

  useEffect(() => {
    mermaid.render(name, children, (svg) => {
      console.log(`mermaid rendered: ${name}`);
      setDiagram(svg);
    });
  }, [name, children]);

  return diagram === "" ? (
    <code>{children}</code>
  ) : (
    <div
      className={className ? `mermaid ${className}` : `mermaid`}
      dangerouslySetInnerHTML={{ __html: diagram }}
    />
  );
};

export default Mermaid;
