export interface IPaginatedResponse<T> {
  error: {
    status: boolean;
  };
  metadata: {
    total_items: number;
    total_pages: number;
    page: number;
    items_per_page: number;
    items_in_current_page: number;
  };
  data: T[];
}

export interface IErrorResponse {
  error: {
    status: true;
    messages: string[] | string;
    code?: string;
  };
}
