import { NavLink } from 'react-router-dom';
import { useAuth } from '@/auth/hooks/useAuth';

//Icons
import {
  BellAlertIcon,
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
import log_azo from '../../assets/log_azo.png';
import log_azo_1 from '../../assets/log_azo_1.png';

//components
import { NewCard } from '../NewCard';
import { SearchInput } from './SearchInput';
import { UserMenu } from './UserMenu';
import { ArrowRightEndOnRectangleIcon, UserPlusIcon } from '@heroicons/react/24/outline';


const Navbar = () => {

  const { login, handlerLogout } = useAuth();

  const commonClasses = 'flex items-center gap-3 rounded-lg px-3 py-2';
  const commonClassesMobile = 'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2';

  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <div className='hidden border-r bg-muted/40 md:block'>
        <div className='flex h-full max-h-screen flex-col gap-2'>

          <div className='sticky top-0 z-20'>
            {/* Logo Azogues */}
            <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-muted '>
              <NavLink className='flex items-center gap-2 font-semibold'>
                {/* <InboxStackIcon className='h-6 w-6' /> */}
                <img src={log_azo} className='h-10 w-10'></img>
                <span className=''>Azogues Alcaldía</span>
              </NavLink>

              <Button
                variant='outline'
                size='icon'
                className='ml-auto h-8 w-8'>
                <BellAlertIcon className='h-4 w-4' />
                <span className='sr-only'>Toggle notifications</span>
              </Button>
            </div>

            {/* Navbar Vertical */}
            <div className='flex-1 bg-muted overflow-y-scroll'>
              <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    `${commonClasses} ${
                      isActive 
                        ? 'bg-muted text-primary transition-all hover:text-primary' 
                        : 'text-muted-foreground transition-all hover:text-primary'
                    }`
                  }
                >
                  <HomeIcon className='h-4 w-4' />
                  Inicio
                  <Badge className='ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full'>
                    4
                  </Badge>
                </NavLink>
                <NavLink
                  to='/payments'
                  className={({ isActive }) =>
                    `${commonClasses} ${
                      isActive 
                        ? 'bg-muted text-primary transition-all hover:text-primary' 
                        : 'text-muted-foreground transition-all hover:text-primary'
                    }`
                  }
                >
                  <ShoppingCartIcon className='h-4 w-4' />
                  Consulta y Pago de Obligaciones
                </NavLink>

                <NavLink
                  to='/procedures'
                  className={({ isActive }) =>
                    `${commonClasses} ${
                      isActive 
                        ? 'bg-muted text-primary transition-all hover:text-primary' 
                        : 'text-muted-foreground transition-all hover:text-primary'
                    }`
                  }
                >
                  <InboxIcon className='h-4 w-4' />
                  Tr&aacute;mites
                </NavLink>
                
                <NavLink
                  to='/taxServices'
                  className={({ isActive }) =>
                    `${commonClasses} ${
                      isActive 
                        ? 'bg-muted text-primary transition-all hover:text-primary' 
                        : 'text-muted-foreground transition-all hover:text-primary'
                    }`
                  }
                >
                  <UsersIcon className='h-4 w-4' />
                  Servicios Tributarios
                </NavLink>
                <NavLink
                  to='/citizenAttention'
                  className={({ isActive }) =>
                    `${commonClasses} ${
                      isActive 
                        ? 'bg-muted text-primary transition-all hover:text-primary' 
                        : 'text-muted-foreground transition-all hover:text-primary'
                    }`
                  }
                >
                  <PresentationChartBarIcon className='h-4 w-4' />
                  Atenci&oacute;n Ciudadana
                </NavLink>
                <NavLink
                  to='/users'
                  className={({ isActive }) =>
                    `${commonClasses} ${
                      isActive 
                        ? 'bg-muted text-primary transition-all hover:text-primary' 
                        : 'text-muted-foreground transition-all hover:text-primary'
                    }`
                  }
                >
                  <PresentationChartBarIcon className='h-4 w-4' />
                  Usuarios{' '}
                </NavLink>

                {!login.isAdmin ||
                  <>
                    <NavLink
                      to='/users/selectRegister'
                      className={({ isActive }) =>
                        `${commonClasses} ${
                          isActive 
                            ? 'bg-muted text-primary transition-all hover:text-primary' 
                            : 'text-muted-foreground transition-all hover:text-primary'
                        }`
                      }
                    >
                      <PresentationChartBarIcon className='h-4 w-4' />
                      Registar Usuarios{' '}
                    </NavLink>

                    <NavLink
                      to='/terms'
                      className={({ isActive }) =>
                        `${commonClasses} ${
                          isActive 
                            ? 'bg-muted text-primary transition-all hover:text-primary' 
                            : 'text-muted-foreground transition-all hover:text-primary'
                        }`
                      }
                      >
                      <PresentationChartBarIcon className='h-4 w-4' />
                      Téminos y Codiciones{' '}
                    </NavLink>
                  </>
                }
                
              </nav>
            </div>

            {/* Card */}
            <div className='mt-auto p-4'>
              <NewCard />
            </div>
          </div>

        </div>
      </div>

      {/* Navbar Horizontal */}
      <div className='flex flex-col'>
        <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 sticky top-0 z-10'>
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
                  <img src={log_azo_1} className='h-8' />
                  <span className='sr-only'>Azogues Alcald&iacute;a</span>
                </NavLink>
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    `${commonClassesMobile} ${
                      isActive 
                        ? 'bg-muted text-foreground hover:text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`
                  }
                >
                  <HomeIcon className='h-5 w-5' />
                  Inicio
                  <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>
                    4
                  </Badge>
                </NavLink>
                <NavLink
                  to='/payments'
                  className={({ isActive }) =>
                    `${commonClassesMobile} ${
                      isActive 
                        ? 'bg-muted text-foreground hover:text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`
                  }
                >
                  <ShoppingCartIcon className='h-5 w-5' />
                  Consulta y Pago de Obligaciones
                </NavLink>
                <NavLink
                  to='/procedures'
                  className={({ isActive }) =>
                    `${commonClassesMobile} ${
                      isActive 
                        ? 'bg-muted text-foreground hover:text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`
                  }
                >
                  <InboxIcon className='h-5 w-5' />
                  Tr&aacute;mites
                </NavLink>
                <NavLink
                  to='/taxServices'
                  className={({ isActive }) =>
                    `${commonClassesMobile} ${
                      isActive 
                        ? 'bg-muted text-foreground hover:text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`
                  }
                >
                  <UsersIcon className='h-5 w-5' />
                  Servicios Tributarios
                </NavLink>
                <NavLink
                  to='/citizenAttention'
                  className={({ isActive }) =>
                    `${commonClassesMobile} ${
                      isActive 
                        ? 'bg-muted text-foreground hover:text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`
                  }
                >
                  <PresentationChartBarIcon className='h-5 w-5' />
                  Atenci&oacute;n Ciudadana
                </NavLink>

                <NavLink
                  to='/users'
                  className={({ isActive }) =>
                    `${commonClassesMobile} ${
                      isActive 
                        ? 'bg-muted text-foreground hover:text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`
                  }
                >
                  <PresentationChartBarIcon className='h-4 w-4' />
                  Usuarios{' '}
                </NavLink>

                {!login.isAdmin ||
                  <NavLink
                    to='/users/selectRegister'
                    className={({ isActive }) =>
                      `${commonClassesMobile} ${
                        isActive 
                          ? 'bg-muted text-foreground hover:text-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`
                    }
                  >
                    <PresentationChartBarIcon className='h-4 w-4' />
                    Registar Usuarios{' '}
                  </NavLink>
                }
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
          {/* <UserMenu login={login} handlerLogout={handlerLogout} /> */}

          {/* test */}
          {!login.isAuth
            ? <div className='flex gap-3 text-zinc-700 text-sm'>
              <NavLink to='/login' className='flex gap-1'>
                <ArrowRightEndOnRectangleIcon className='size-5' />
                Iniciar Sesi&oacute;n
              </NavLink>
              <NavLink to='/register' className='flex gap-1'>
                <UserPlusIcon className='size-5' />
                Registrarse
              </NavLink>
            </div>
            : <UserMenu login={login} handlerLogout={handlerLogout} />
          }

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
