import { NavLink } from 'react-router-dom';
import { useAuth } from '@/auth/hooks/useAuth';

//Icons
import {
  BellAlertIcon,
  InboxStackIcon,
  HomeIcon,
  PresentationChartBarIcon,
  Bars3Icon,
  ShoppingCartIcon,
  UsersIcon,
  InboxIcon,
} from '@heroicons/react/24/solid';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import log_azo from '../../assets/log_azo.jpg';

//components
import { NewCard } from '../NewCard';
import { SearchInput } from './SearchInput';
import { UserMenu } from './UserMenu';


const Navbar = () => {

  const { login, handlerLogout } = useAuth();

  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <div className='hidden border-r bg-muted/40 md:block'>
        <div className='flex h-full max-h-screen flex-col gap-2'>

          {/* Logo Azogues */}
          <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
            <NavLink className='flex items-center gap-2 font-semibold'>
              {/* <InboxStackIcon className='h-6 w-6' /> */}
              <img src={log_azo} className='h-10 w-10'></img>
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
                Inicio
              </NavLink>
              <NavLink
                to='/'
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                <ShoppingCartIcon className='h-4 w-4' />
                Consulta y Pago de Obligaciones
                <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>
                  6
                </Badge>
              </NavLink>
              <NavLink
                to='/'
                className='flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary'>
                <InboxIcon className='h-4 w-4' />
                Trámites
              </NavLink>
              <NavLink
                to='/'
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                <UsersIcon className='h-4 w-4' />
                Servicios Tributarios
              </NavLink>
              <NavLink
                to='/'
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                <PresentationChartBarIcon className='h-4 w-4' />
                Atención Ciudadana
              </NavLink>
              <NavLink
                to='/users'
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                <PresentationChartBarIcon className='h-4 w-4' />
                Usuarios{' '}
              </NavLink>

              {!login.isAdmin ||
                <NavLink
                  to='/users/register'
                  className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'>
                  <PresentationChartBarIcon className='h-4 w-4' />
                  Registar Usuarios{' '}
                </NavLink>
              }
              
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
                  Inicio
                </NavLink>
                <NavLink
                  to='/'
                  className='mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground'>
                  <ShoppingCartIcon className='h-5 w-5' />
                  Consulta y Pago de Obligaciones
                  <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>
                    6
                  </Badge>
                </NavLink>
                <NavLink
                  to='/'
                  className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'>
                  <InboxIcon className='h-5 w-5' />
                  Trámites
                </NavLink>
                <NavLink
                  to='/'
                  className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'>
                  <UsersIcon className='h-5 w-5' />
                  Servicios Tributarios
                </NavLink>
                <NavLink
                  to='/'
                  className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'>
                  <PresentationChartBarIcon className='h-5 w-5' />
                  Atención Ciudadana
                </NavLink>
              </nav>

              {/* Card */}
              <div className='mt-auto'>
                <NewCard />
              </div>

            </SheetContent>
          </Sheet>

          {/* Input Buscar */}
          <SearchInput />

          {/* Menu Usuario */}
          <UserMenu login={login} handlerLogout={handlerLogout} />

        </header>

        {/* Layout */}
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
