import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/auth/hooks/useAuth';
import { useUsers } from '@/hooks/useUsers';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layout } from '@/components/Layout';


//mod email
//Validation Schema Login
const userLoginSchema = z.object({
  username: z.string().min(1, {
    message: 'El username es requerido.',
  }),
  password: z.string().min(5, {
    message: 'La contraseña de usuario debe tener al menos 5 caracteres.',
  }),
});

//Validation Schema Register
const userRegisterSchema = z.object({
  id: z.number(),
  username: z.string().min(1, {
    message: 'El username es requerido.',
  }),
  password: z.string().min(5, {
    message: 'La contraseña de usuario debe tener al menos 5 caracteres.',
  }),
  email: z.string().email({
    message: 'Ingrese un email válido.',
  }),
  admin: z.boolean().default(false).optional(),
});

//initial Login
const initialLoginForm = {
  username: '',
  password: '',
};

function LoginPage() {

  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname === '/login' ? 'account' : 'register');

  //login
  const { handlerLogin } = useAuth();

  //register: Context useUsers Global Redux.
  const { initialUserForm, handlerRegisterUser, errors } = useUsers();

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(userLoginSchema),
    defaultValues: initialLoginForm,
  });

  //Register
  const formRegister = useForm({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: initialUserForm,
  });

  // 2. Define a submit handler.
  const onSubmit = (data) => {
    console.log('login_data: ', data);
    // Implementación  del login
    handlerLogin({
      username: form.getValues().username,
      password: form.getValues().password,
    });
    form.reset();
  };

  const onSubmitRegister = (data) => {
    console.log('register_data: ', data);
    handlerRegisterUser(data);
    formRegister.reset();
  };

  //redirigir Tab login or register
  const handleTabChange = (value) => {
    setSelected(value);
    navigate(value === 'account' ? '/login' : '/register');
  };

  useEffect(() => {
    setSelected(location.pathname === '/login' ? 'account' : 'register');
  }, [location.pathname]);

  return (
    <Layout>
      <div className='w-full h-full flex justify-center items-center'>
        <Tabs
          value={selected}
          onValueChange={handleTabChange}
          //defaultValue='account'
          className='w-[400px]'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='account'>Account</TabsTrigger>
            <TabsTrigger value='register'>Register</TabsTrigger>
          </TabsList>
          <TabsContent value='account'>
            <Card>
              <CardHeader>
                <CardTitle>Login Cuenta</CardTitle>
                <CardDescription>Inicio de sesión.</CardDescription>
              </CardHeader>

              <Form
                className='flex flex-col'
                {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardContent className='space-y-2'>
                    <FormField
                      control={form.control}
                      name='username'
                      className='space-y-1'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Ingrese su username'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='password'
                      className='space-y-1'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Ingrese su password'
                              type='password'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>

                  <CardFooter className='flex flex-col'>
                    <Button type='submit'>Iniciar Sesión</Button>
                    <div className='mt-4 text-center text-sm'>
                      ¿No tienes una cuenta?{' '}
                      <NavLink to='/register' className='underline'>
                        Sign up
                      </NavLink>
                    </div>
                  </CardFooter>
                </form>
              </Form>

            </Card>
          </TabsContent>

          <TabsContent value='register'>
            <Card>
              <CardHeader>
                <CardTitle>Registrar Cuenta</CardTitle>
                <CardDescription>Es rápido y facil.</CardDescription>
              </CardHeader>

              <Form
                className='flex flex-col'
                {...formRegister}>
                <form
                  onSubmit={formRegister.handleSubmit(onSubmitRegister)}>

                  <CardContent className='space-y-2'>
                    <FormField
                      control={formRegister.control}
                      name='username'
                      className='space-y-1'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Ingrese su username'
                              {...field}
                            />
                          </FormControl>
                          {/* <FormMessage>{errors?.username}</FormMessage> */}
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={formRegister.control}
                      name='password'
                      className='space-y-1'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contraseña</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Ingrese su password'
                              type='password'
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>Ingrese una contraseña segura</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={formRegister.control}
                      name='email'
                      className='space-y-1'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Ingres su email'
                              {...field}
                            />
                          </FormControl>
                          {/* <FormMessage>{errors?.email}</FormMessage> */}
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formRegister.control}
                      name='id'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type='hidden' {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                  </CardContent>
                  <CardFooter className='flex flex-col'>
                    <Button type='submit'>Crear Cuenta</Button>
                    <div className='mt-4 text-center text-sm'>
                      ¿Ya tienes una cuenta?{' '}
                      <NavLink to='/login' className='underline'>
                        Sign in
                      </NavLink>
                    </div>
                  </CardFooter>

                </form>
              </Form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

export { LoginPage };
