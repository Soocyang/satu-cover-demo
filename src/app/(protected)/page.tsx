import UsersList from '@/components/users-list';
import { getAllUsersData } from './actions';

export default async function HomePage() {
  const data = await getAllUsersData();

  return (
    <div className="w-96 md:w-[720px]">
      <h1 className="text-3xl font-bold mb-4">Users</h1>

      <UsersList users={data} />
    </div>
  );
}
