import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/Components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { useContext } from 'react';
import { AuthContext } from '@/Auth/Context/AuthContext';

//Validation Schema
const userSchema = z.object({
  email: z.string().email({
    message: 'Ingrese un email válido.',
  }),
  password: z.string().min(5, {
    message: 'La contraseña de usuario debe tener al menos 5 caracteres.'
  }),
});

//const requiredUser = userSchema.required();

const initialLoginForm = {
  email: '',
  password: '',
};

function LoginPage() {

  const { handlerLogin } = useContext(AuthContext);
  
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: initialLoginForm,
  });

  // 2. Define a submit handler.
  const onSubmit = (data) => {
    console.log(data);
    //console.log('prueba', form.getValues().email);

    // Implementación  del login
    handlerLogin({
      email: form.getValues().email, 
      password: form.getValues().password,
    });
    
    form.reset();
  };

  return (
    <>
      <div className='w-full h-screen flex justify-center items-center'>
        <Tabs
          defaultValue='account'
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
                      name='email'
                      className='space-y-1'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Ingrese su email'
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
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>

                  <CardFooter>
                    <Button type='submit'>Iniciar Sesión</Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>

          <TabsContent value='register'>
            <Card>
              <CardHeader>
                <CardTitle>Registrar Cuenta</CardTitle>
                <CardDescription>Registro de una nueva cuenta.</CardDescription>
              </CardHeader>
              <CardContent className='space-y-2'>
                <div className='space-y-1'>
                  <Label htmlFor='current'>Current password</Label>
                  <Input
                    id='current'
                    type='password'
                  />
                </div>
                <div className='space-y-1'>
                  <Label htmlFor='new'>New password</Label>
                  <Input
                    id='new'
                    type='password'
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Crear Cuenta</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export { LoginPage };
