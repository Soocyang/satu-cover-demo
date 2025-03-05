'use client';

import { DisplayUser } from '@/types/user';
import { EllipsisVerticalIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Card, CardDescription, CardTitle } from './ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Skeleton } from './ui/skeleton';

type UserCardProps = DisplayUser & {
  isLoading: boolean;
  onUnmaskEmail: (id: number) => void;
};

export default function UserCard({
  id,
  email,
  first_name,
  last_name,
  avatar,
  isEmailMasked,
  isLoading,
  onUnmaskEmail,
}: UserCardProps) {
  return (
    <Card className="hover:bg-secondary">
      <div className="flex gap-4 p-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatar} />
          <AvatarFallback>{first_name?.slice(0, 1)}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-1">
          <CardTitle>
            {first_name} {last_name}
          </CardTitle>
          <CardDescription className="h-3">
            {isLoading ? <Skeleton className="h-3 w-[150px]" /> : email}
          </CardDescription>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size={'icon'} className="ml-auto">
              <EllipsisVerticalIcon />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-auto">
            <DropdownMenuItem onClick={() => onUnmaskEmail(id)}>
              {isEmailMasked ? <EyeIcon /> : <EyeOffIcon />}
              <span>{isEmailMasked ? 'Show' : 'Hide'} email</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}
