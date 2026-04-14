export interface DataResponse<T = unknown> {
  success: boolean;
  message?: string;
  result?: T;
}

export interface PaginatedResponse<T = unknown> extends DataResponse<T[]> {
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
