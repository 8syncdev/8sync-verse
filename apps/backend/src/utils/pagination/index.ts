export function getOffset(page: number, pageSize: number): number {
  return (page - 1) * pageSize;
}

export function paginatedData<T>(
  data: T[],
  total: number,
  page: number,
  pageSize: number,
) {
  return {
    success: true,
    result: data,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  };
}
