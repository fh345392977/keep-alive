class RuleLog {
  key: number = 0;

  disabled: boolean = false;

  href: string = '';

  name: string = '';

  owner: string = '';

  desc: string = '';

  callNo: number = 0;

  status: number = 0;

  updatedAt: Date;

  createdAt: Date;

  progress: number = 0;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: RuleLog[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
