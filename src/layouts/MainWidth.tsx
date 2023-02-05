export type MainWidthProps = {
  children: React.ReactNode;
};

export default function MainWidth({ children }: MainWidthProps) {
  return <div className="max-w-2xl mx-auto p-2">{children}</div>;
}
