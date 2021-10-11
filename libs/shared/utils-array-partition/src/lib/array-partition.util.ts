export function arrayPartition<TItem>(
  array: TItem[],
  predicate: (item: TItem) => boolean
): [TItem[], TItem[]] {
  return array.reduce(
    (pair: [TItem[], TItem[]], item) => {
      const condition = predicate(item);
      (condition ? pair[0] : pair[1]).push(item);
      return pair;
    },
    [[], []]
  );
}
