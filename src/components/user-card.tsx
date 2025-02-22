'use client';

import { maskEmail } from '@/lib/utils';
import { DisplayUser } from '@/types/user';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { EllipsisVerticalIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import React from 'react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Card, CardDescription, CardTitle } from './ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export default function UserCard({
  id,
  email,
  first_name,
  last_name,
  avatar,
  isEmailMasked,
}: DisplayUser): React.JSX.Element {
  return (
    <Card className="hover:bg-secondary">
      <div className="flex gap-4 p-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatar} />
          <AvatarFallback>{first_name?.slice(0, 1)}</AvatarFallback>
        </Avatar>

        <div className="my-auto">
          <CardTitle>
            {first_name} {last_name}
          </CardTitle>
          <CardDescription>{maskEmail(email)}</CardDescription>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size={'icon'} className="ml-auto">
              <EllipsisVerticalIcon />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-auto">
            <DropdownMenuItem
              onClick={() =>
                console.log(`WIP masked email: clicked on userId: ${id}`)
              }
            >
              {isEmailMasked ? <EyeOffIcon /> : <EyeIcon />}
              <span>Show/hide full email</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}
