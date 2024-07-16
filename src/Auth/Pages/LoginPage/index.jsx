import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/auth/hooks/useAuth';
import { useUsers } from '@/hooks/useUsers';
import { useTerms } from '@/hooks/useTerms';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
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
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'Debe aceptar los Términos y Condiciones.',
  }),
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

  //terms
  const { 
    //initialTermForm, 
    //latestTerms, 
    isLoading, 
    //getLatestTerms, 
    //getRecordTermsInteraction 
  } = useTerms();

  const { toast } = useToast();

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

  const onSubmitRegister = async (data) => {
    try {
      handlerRegisterUser(data);
      //const user = handlerRegisterUser(data);
      // if (data.acceptTerms) {
      //   await getRecordTermsInteraction(user.id, true, '127.0.0.1');  // Use actual IP in production
      // }
      toast({
        title: 'Success',
        description: 'Usuario creada con éxito!',
      });
      formRegister.reset();
      
    } catch (error) {
      console.error(error);
    }
    // console.log('register_data: ', data);
    // handlerRegisterUser(data);
    // formRegister.reset();
  };

  //redirigir Tab login or register
  const handleTabChange = (value) => {
    setSelected(value);
    navigate(value === 'account' ? '/login' : '/register');
  };

  //account and register
  useEffect(() => {
    setSelected(location.pathname === '/login' ? 'account' : 'register');
  }, [location.pathname]);

  //Terms
  // useEffect(() => {
  //   getLatestTerms();
  // }, [getLatestTerms]);

  return (
    <Layout>
      <div className='w-full h-full flex flex-col justify-center items-center gap-4'>
        <Accordion type='single' collapsible className='w-[80%]'>
          <AccordionItem value='item-1'>
            <AccordionTrigger>Gu&iacute;a de Ingreso</AccordionTrigger>
            <AccordionContent>
              <ul className='space-y-2'>
                <li className='flex items-center'>
                  <span class='w-2.5 h-2.5 bg-slate-600 rounded-full inline-block mr-3'></span>
                  Seleccione el tipo de persona.
                </li>
                <li>
                  <span class='w-2.5 h-2.5 bg-slate-600 rounded-full inline-block mr-3'></span>
                  Ingrese su documento de identidad y la información que se le solicita.
                </li>
                <li>
                  <span class='w-2.5 h-2.5 bg-slate-600 rounded-full inline-block mr-3'></span>
                  Acepte el acceso a la información.
                </li>
                <li>
                  <span class='w-2.5 h-2.5 bg-slate-600 rounded-full inline-block mr-3'></span>
                  Presione el botón validar.
                </li>
                <li>
                  <span class='w-2.5 h-2.5 bg-slate-600 rounded-full inline-block mr-3'></span>
                  Confirme el captcha de seguridad.
                </li>
                <li>
                  <span class='w-2.5 h-2.5 bg-slate-600 rounded-full inline-block mr-3'></span>
                  Complete los campos requeridos (*).
                </li>
                <li>
                  <span class='w-2.5 h-2.5 bg-slate-600 rounded-full inline-block mr-3'></span>
                  Acepte el acuerdo de responsabilidad (*).
                </li>
                <li>
                  <span class='w-2.5 h-2.5 bg-slate-600 rounded-full inline-block mr-3'></span>
                  Presione el botón Aceptar y continuar.
                </li>
                <li>
                  <span class='w-2.5 h-2.5 bg-slate-600 rounded-full inline-block mr-3'></span>
                  Para la activación del usuario debe firmar el acuerdo de responsabilidad, 
                  si es persona jurídica el acuerdo debe ser firmado por el representante legal.
                </li>
                <li>
                  <span class='w-2.5 h-2.5 bg-slate-600 rounded-full inline-block mr-3'></span>
                  Escoja si la firma es electrónica (archivo p12) o firma manuscrita.
                </li>
                <li>
                  <span class='w-2.5 h-2.5 bg-slate-600 rounded-full inline-block mr-3'></span>
                  Si la firma es electrónica, presione el botón Firmar Acuerdo y proceda a seleccionar 
                  zona de firma, escoger el archivo p12 e ingresar la contraseña de su firma.
                </li>
                <li>
                  <span class='w-2.5 h-2.5 bg-slate-600 rounded-full inline-block mr-3'></span>
                  Si la firma es manuscrita, presione el botón Descargar Acuerdo, el mismo que deberá 
                  ser impreso y firmado. A continuación debe escanear el acuerdo y subirlo en la sección 
                  Adjuntar Acuerdo. Para la verificación de identidad debe adjuntar una fotografía (tipo selfie) 
                  con su documento de identidad.
                </li>
                <li>
                  <span class='w-2.5 h-2.5 bg-slate-600 rounded-full inline-block mr-3'></span>
                  Presione el botón Finalizar, si firmó electrónicamente, el usuario será activado de 
                  forma automática. Caso contrario, será activado hasta en 1 día hábil.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

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
                          <FormMessage>{errors?.username}</FormMessage>
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
                          <FormMessage>{errors?.email}</FormMessage>
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

                    <FormField
                      control={formRegister.control}
                      name='acceptTerms'
                      render={({ field }) => (
                        <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className='space-y-1 leading-none'>
                            <FormLabel>
                              Aceptar t&eacute;rminos y condiciones
                            </FormLabel>
                            <FormDescription>
                              Aceptas nuestros Términos de servicio y Política de privacidad.
                              {/* {latestTerms ? latestTerms.content : 'No hay términos disponibles'} */}
                              <Link className='font-medium' href='/termsAcceptance'>
                                T&eacute;rminos y Condiciones
                              </Link> .
                            </FormDescription>
                          </div>
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
