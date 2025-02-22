import UserCard from '@/components/user-card';
import { getAllUsersData } from './actions';

export default async function HomePage() {
  const data = await getAllUsersData();

  return (
    <div className="w-96 md:w-[720px]">
      <h1 className="text-3xl font-bold mb-4">Users</h1>

      <div className="flex flex-col gap-2">
        {data.map((item) => (
          <UserCard
            key={item.id}
            id={item.id}
            email={item.email}
            first_name={item.first_name}
            last_name={item.last_name}
            avatar={item.avatar}
            isEmailMasked={Math.random() > 0.5}
          />
        ))}
      </div>
    </div>
  );
}
