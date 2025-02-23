'use client';

import UserCard from '@/components/user-card';
import { User } from '@/types/user';
import { useState } from 'react';

export default function UsersList({ users }: { users: User[] }) {
  // TODO: refactor to use redux
  const [selectedUerId, setSelectedUerId] = useState<number | null>(null);

  const handleToggleEmailMask = (id: number) => {
    setSelectedUerId(id === selectedUerId ? null : id);
  };

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
          isEmailMasked={selectedUerId !== item.id}
          onUnmaskEmail={() => handleToggleEmailMask(item.id)}
        />
      ))}
    </div>
  );
}
