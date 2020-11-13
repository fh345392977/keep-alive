export interface TableListData<T> {
  list: T[];
  total: number;
}

export interface TableListBaseParams {
  page: number;
  page_size: number;
  sort_order?: string;
  sort_way?: string;
}
