import { CONFIGS } from '@/lib/configs';

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

export type Response<Item> = {
  data: Item;
  support: Record<string, unknown>;
};

export type PublicRoutes = (typeof CONFIGS.PUBLIC_ROUTES)[number];
