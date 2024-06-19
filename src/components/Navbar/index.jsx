import { NavLink } from 'react-router-dom';

import {
  BellAlertIcon,
  InboxStackIcon,
  UserCircleIcon,
  HomeIcon,
  PresentationChartBarIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UsersIcon,
  InboxIcon,
} from '@heroicons/react/24/solid';


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

import { Layout } from '../Layout';
import { NewCard } from '../NewCard';

const Navbar = () => {
  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <div className='hidden border-r bg-muted/40 md:block'>
        <div className='flex h-full max-h-screen flex-col gap-2'>

          {/* Logo Azogues */}
          <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
            <NavLink className='flex items-center gap-2 font-semibold'>
              <InboxStackIcon className='h-6 w-6' />
              <span className=''>Alcaldía Azogues</span>
            </NavLink>

            <Button
              variant='outline'
              size='icon'
              className='ml-auto h-8 w-8'>
              <BellAlertIcon className='h-4 w-4' />
              <span className='sr-only'>Toggle notifications</span>
            </Button>
          </div>

          {/* Navbar */}
          <div className='flex-1'>
            <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
              <NavLink
                to='/'
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                <HomeIcon className='h-4 w-4' />
                Dashboard
              </NavLink>
              <NavLink
                to='/'
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                <ShoppingCartIcon className='h-4 w-4' />
                Orders
                <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>
                  6
                </Badge>
              </NavLink>
              <NavLink
                to='/'
                className='flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary'>
                <InboxIcon className='h-4 w-4' />
                Products{' '}
              </NavLink>
              <NavLink
                to='/'
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                <UsersIcon className='h-4 w-4' />
                Customers
              </NavLink>
              <NavLink
                to='/'
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                <PresentationChartBarIcon className='h-4 w-4' />
                Analytics
              </NavLink>
            </nav>
          </div>

          {/* Card */}
          <div className='mt-auto p-4'>
            <NewCard />
          </div>

        </div>
      </div>

      <div className='flex flex-col'>
        <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='shrink-0 md:hidden'>
                <Bars3Icon className='h-5 w-5' />
                <span className='sr-only'>Toggle navigation menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side='left'
              className='flex flex-col'>

              {/* Navbar movile */}
              <nav className='grid gap-2 text-lg font-medium'>
                <NavLink
                  to='/'
                  className='flex items-center gap-2 text-lg font-semibold'>
                  <InboxStackIcon className='h-6 w-6' />
                  <span className='sr-only'>Alcaldía Azogues</span>
                </NavLink>
                <NavLink
                  to='/'
                  className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'>
                  <HomeIcon className='h-5 w-5' />
                  Dashboard2
                </NavLink>
                <NavLink
                  to='/'
                  className='mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground'>
                  <ShoppingCartIcon className='h-5 w-5' />
                  Orders2
                  <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>
                    6
                  </Badge>
                </NavLink>
                <NavLink
                  to='/'
                  className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'>
                  <InboxIcon className='h-5 w-5' />
                  Products2
                </NavLink>
                <NavLink
                  to='/'
                  className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'>
                  <UsersIcon className='h-5 w-5' />
                  Customers2
                </NavLink>
                <NavLink
                  to='/'
                  className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'>
                  <PresentationChartBarIcon className='h-5 w-5' />
                  Analytics2
                </NavLink>
              </nav>

              {/* Card */}
              <div className='mt-auto'>
                <NewCard />
              </div>

            </SheetContent>
          </Sheet>

          {/* Input Buscar */}
          <div className='w-full flex-1'>
            <form>
              <div className='relative'>
                <MagnifyingGlassIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  type='search'
                  placeholder='Buscar...'
                  className='w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3'
                />
              </div>
            </form>
          </div>

          {/* Menu Usuario */}
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
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </header>

        {/* Layout */}
        <Layout />

        {/* <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
          <div className='flex items-center'>
            <h1 className='text-lg font-semibold md:text-2xl'>Usuarios</h1>
          </div>

          <div
            className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'
          >
            <div className='flex flex-col items-center gap-1 text-center'>
              <h3 className='text-2xl font-bold tracking-tight'>No tiene usuarios</h3>
              <p className='text-sm text-muted-foreground'>
                Puede comenzar a crear usuarios tan pronto como agregues uno nuevo..
              </p>
              <Button className='mt-4'>Add Cliente</Button>
            </div>
          </div>
        </main> */}

      </div>
    </div>
  );
};

export { Navbar };
