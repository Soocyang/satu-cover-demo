import { signOut } from '@/auth';
import { User } from 'next-auth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

type UserNavProps = {
  user: User;
};

export default function UserNav({ user }: UserNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image ?? ''} alt="user profile image" />
            <AvatarFallback>
              {user.name?.substring(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1 py-1">
            <p className="text-md font-semibold leading-none truncate">
              {user.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <form
          action={async () => {
            'use server';
            await signOut({
              redirectTo: '/login',
            });
          }}
        >
          <DropdownMenuItem asChild>
            <button
              type="submit"
              className="focus-visible:ring-none w-full cursor-pointer"
            >
              Logout
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
