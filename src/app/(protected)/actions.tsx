import { CONFIGS } from '@/lib/configs';
import { convertObjectToURLParams } from '@/lib/helpers';
import { maskEmail } from '@/lib/utils';
import { ListRequest, ListResponse } from '@/types/common';
import { User } from '@/types/user';

export async function getUsersData(
  query: ListRequest = {},
): Promise<ListResponse<User>> {
  const queryParams = convertObjectToURLParams(query);

  const res = await fetch(`${CONFIGS.BASE_API_URL}/users?${queryParams}`);

  if (!res.ok) {
    throw new Error('Failed to fetch user data');
  }

  return res.json();
}

export async function getAllUsersData(): Promise<User[]> {
  let maxPage = 1;
  let currentPage = 1;
  const pendingRemainingPage: Promise<ListResponse<User>>[] = [];

  const firstPage = await getUsersData({
    page: maxPage,
    per_page: CONFIGS.PER_PAGE_PER_FETCH_USERS,
  });

  maxPage = firstPage.total_pages;

  while (currentPage < maxPage) {
    currentPage++;

    pendingRemainingPage.push(
      getUsersData({
        page: currentPage,
        per_page: CONFIGS.PER_PAGE_PER_FETCH_USERS,
      }),
    );
  }

  const remainingPage = await Promise.all(pendingRemainingPage);

  const results = transformUsersList([
    ...firstPage.data,
    ...remainingPage.map((res) => res.data).flat(),
  ]);

  return results;
}

export function transformUsersList(usersList: User[]) {
  return usersList
    .filter(
      (user) =>
        user.first_name.startsWith('G') || user.last_name.startsWith('W'),
    )
    .map((user) => ({
      ...user,
      email: maskEmail(user.email),
    }));
}
