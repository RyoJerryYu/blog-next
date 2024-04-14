"use client";

// mermaid.init({
//   startOnLoad: false,
// });

type MermaidProps = {
  name?: string;
  children: string;
  className?: string;
};

// const Mermaid = ({ name = "mermaid", children, className }: MermaidProps) => {
//   const [svg, setSvg] = React.useState("");
//   useEffect(() => {
//     const res = mermaid.render(name, children);
//     setSvg(res);
//   }, [name, children]);

//   // TODO maybe caculate simple size and set default size
//   return svg === "" ? (
//     <code>{children}</code>
//   ) : (
//     <div
//       className={className ? `mermaid ${className}` : `mermaid`}
//       dangerouslySetInnerHTML={{ __html: svg }}
//     />
//   );
// };

// export default Mermaid;
