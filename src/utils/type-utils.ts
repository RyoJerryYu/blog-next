export type MergeList<L extends readonly any[]> = L extends readonly [
  infer First,
  ...infer Remains
]
  ? First & MergeList<Remains>
  : {};
