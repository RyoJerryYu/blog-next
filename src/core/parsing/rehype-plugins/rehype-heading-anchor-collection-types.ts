export type AnchorTree = {
  key: string;
  href: string;
  id?: string;
  heading: number;
  title: string;
  children: AnchorTree[];
};
