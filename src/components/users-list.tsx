'use client';

import UserCard from '@/components/user-card';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  handleToggleEmailMask,
  selectCurrentUserId,
} from '@/store/usersListSlice';
import { User } from '@/types/user';

export default function UsersList({ users }: { users: User[] }) {
  const currentUserId = useAppSelector(selectCurrentUserId);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col gap-2">
      {users.map((item) => (
        <UserCard
          key={item.id}
          id={item.id}
          email={item.email}
          first_name={item.first_name}
          last_name={item.last_name}
          avatar={item.avatar}
          isEmailMasked={currentUserId !== item.id}
          onUnmaskEmail={() => dispatch(handleToggleEmailMask(item.id))}
        />
      ))}
    </div>
  );
}
