export function getOffset(page: number, size: number): number {
  return (page - 1) * size;
}

export function paginatedData(opts: { page: number; size: number; count: number }) {
  return { page: opts.page, size: opts.size, count: opts.count };
}
