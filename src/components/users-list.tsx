'use client';

import UserCard from '@/components/user-card';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  fetchUserById,
  resetUnmaskedUser,
  selectIsLoading,
  selectLoadingUserId,
  selectUnmaskedUser,
} from '@/store/usersListSlice';
import { User } from '@/types/user';

export default function UsersList({ users }: { users: User[] }) {
  const unmaskedUser = useAppSelector(selectUnmaskedUser);
  const isLoading = useAppSelector(selectIsLoading);
  const loadingUserId = useAppSelector(selectLoadingUserId);
  const dispatch = useAppDispatch();

  const handleUnmaskEmail = (userId: number) => {
    if (unmaskedUser?.id !== userId) {
      dispatch(fetchUserById(userId));
    } else {
      dispatch(resetUnmaskedUser());
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {users.map((item) => {
        const user = unmaskedUser?.id === item.id && unmaskedUser;
        const isLoadingUser = item.id === loadingUserId && isLoading;

        return (
          <UserCard
            key={item.id}
            id={item.id}
            email={user ? user.email : item.email}
            first_name={item.first_name}
            last_name={item.last_name}
            avatar={item.avatar}
            isEmailMasked={!unmaskedUser}
            isLoading={isLoadingUser}
            onUnmaskEmail={() => handleUnmaskEmail(item.id)}
          />
        );
      })}
    </div>
  );
}
