import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label"

import { UserCircleIcon } from '@heroicons/react/24/solid';

//mod email

function UserMenu({ login, handlerLogout }) {
  return (
    <>
      <Label className='text-zinc-500 text-sm'>{login.user?.username}</Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          
          <Button
            variant='secondary'
            size='icon'
            className='rounded-full'>
            <UserCircleIcon className='h-5 w-5' />
            <span className='sr-only'>Toggle user menu</span>
          </Button>
          
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Ajustes</DropdownMenuItem>
          <DropdownMenuItem>Soporte</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button onClick={handlerLogout} variant='destructive' className='w-full h-7'>
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export { UserMenu }