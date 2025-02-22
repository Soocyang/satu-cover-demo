export type ListRequest = Partial<{
  page: number;
  per_page: number;
}> &
  Record<string, unknown>;

export type ListResponse<ListItem> = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ListItem[];
};
