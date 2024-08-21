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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Layout } from '@/components/Layout';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import log_azo from '../../../assets/log_azo.png';

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
// const userRegisterSchema = z.object({
//   //id: z.number(),
//   username: z.string().min(1, {
//     message: 'El username es requerido.',
//   }),
//   password: z.string().min(5, {
//     message: 'La contraseña de usuario debe tener al menos 5 caracteres.',
//   }),
//   email: z.string().email({
//     message: 'Ingrese un email válido.',
//   }),
//   admin: z.boolean().default(false).optional(),
//   acceptedTerms: z.boolean().refine(val => val === true, {
//     message: 'Debe aceptar los Términos y Condiciones.',
//   }),
// });

const userRegisterSchema = z.object({
  ci: z.string().min(10, 'El documento de identidad debe tener al menos 10 a 13 caracteres'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres.'),
  email: z.string().email('Ingrese un email válido.'),

  fullName: z.string().min(1, 'El nombre completo es requerido.'),
  address: z.string().min(1, 'La dirección es requerida.'),
  phone: z.string().min(9, 'El teléfono debe tener al menos 9 dígitos.'),
  taxpayerCity: z.string().min(1, 'La ciudad es requerida.'),
  houseNumber: z.string().min(1, 'El número de casa es requerido.'),
  birthdate: z.date({
    required_error: 'A date of birth is required.',
  }),
  taxpayerType: z.number().default(0),
  legalPerson: z.number().default(44),
  identificationType: z.number().default(33),
  maritalStatus: z.number().default(37),
  admin: z.boolean().default(false).optional(),
  acceptedTerms: z.boolean().refine(val => val === true, {
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
  const [showTerms, setShowTerms] = useState(false);

  //login
  const { login, handlerLogin  } = useAuth();

  //register: Context useUsers Global Redux.
  const { initialUserForm, handlerRegisterUser, errors } = useUsers();

  //Context useTerms Global Redux.
  const { 
    latestTerm,
    latestTermError,
    userTermsStatus,
    recordingTermsInteractionError,
    getLatestTerms,
    getCheckUserTermsStatus, 
    getRecordTermsInteraction,
  } = useTerms();

  const { toast } = useToast();

  // 1. Define your loginForm and registerForm
  const loginForm = useForm({
    resolver: zodResolver(userLoginSchema),
    defaultValues: initialLoginForm,
  });

  const registerForm = useForm({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: initialUserForm,
  });
  

  //maneja la aceptación de términos para el registro. TermsInteractionDTO
  const handleTermsAcceptance = async (userId, accepted) => {
    try {
      await getRecordTermsInteraction(userId, accepted);
      if (accepted) {
        toast({
          title: 'Éxito',
          description: 'Términos y condiciones aceptados.',
        });
      }
    } catch (error) {
      console.error('Error al procesar los términos:', error);
      toast({
        title: 'Error',
        description: `Hubo un problema al procesar los términos y condiciones: ${recordingTermsInteractionError}`,
        variant: 'destructive',
      });
    }
  };

  // 2. Define a submit handler for login and register.
  const onLoginSubmit = async (data) => {
    console.log('login_data: ', data);
    // Implementación del login
    try {
      const loginResult = await handlerLogin({
        username: loginForm.getValues().username,
        password: loginForm.getValues().password,
      });

      if (loginResult.isAuth) {
        const termsStatus = await getCheckUserTermsStatus(loginResult.user.id);
        if (!termsStatus || !termsStatus.accepted) {
          await getLatestTerms();
          setShowTerms(true);
        } 
        navigate('/users');
      }

    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error de inicio de sesión: ' + error.message,
        variant: 'destructive',
      });
    }
    loginForm.reset();
  };

  const onRegisterSubmit = async (data) => {
    try {
      console.log('register_data: ', data);
      if (!data.acceptedTerms) {
        toast({
          title: 'Error',
          description: 'Debe aceptar los Términos y Condiciones para registrarse.',
          variant: 'destructive',
        });
        return;
      }

      // Asignar ci como username automáticamente
      const registrationData = {
        ...data,
        username: data.ci
      };

      const result = await handlerRegisterUser(registrationData); 
      if (result && result.id) {
        await handleTermsAcceptance(result.id, true);
        toast({
          title: 'Éxito',
          description: 'Usuario creado con éxito!',
        });
        registerForm.reset();
        navigate('/login');

      }else {
        throw new Error('No se pudo obtener el ID del usuario registrado');
      }

    } catch (error) {
      console.error('Error durante el registro:', error);
      toast({
        title: 'Error',
        description: error.message || 'Hubo un problema al registrar el usuario.',
        variant: 'destructive',
      });
    }
    // console.log('register_data: ', data);
    // handlerRegisterUser(data);
    // registerForm.reset();
  };

  const handleViewTerms = () => {
    try {
      getLatestTerms();
      setShowTerms(true);
    } catch (error) {
      toast({
        title: 'Error',
        description: `No se pudieron cargar los términos más recientes: ${latestTermError}`,
        variant: 'destructive',
      });
    }
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

  return (
    <Layout>
      <div className='w-full h-full flex flex-col justify-center items-center gap-4'>
        <Accordion type='single' collapsible className='w-[80%]'>
          <AccordionItem value='item-1'>
            <AccordionTrigger>Gu&iacute;a de Ingreso</AccordionTrigger>
            <AccordionContent>
              <ul className='space-y-2'>
                <li className='flex items-center'>
                  <span className='w-2.5 h-2.5 bg-slate-600 rounded-full inline-block mr-3'></span>
                  Seleccione el tipo de persona.
                </li>
                <li>
                  <span className='w-2.5 h-2.5 bg-slate-600 rounded-full inline-block mr-3'></span>
                  Ingrese su documento de identidad y la información que se le solicita.
                </li>
                <li>
                  <span className='w-2.5 h-2.5 bg-slate-600 rounded-full inline-block mr-3'></span>
                  Acepte el acceso a la información.
                </li>
                <li>
                  <span className='w-2.5 h-2.5 bg-slate-600 rounded-full inline-block mr-3'></span>
                  Presione el botón validar.
                </li>
                <li>
                  <span className='w-2.5 h-2.5 bg-slate-600 rounded-full inline-block mr-3'></span>
                  Confirme el captcha de seguridad.
                </li>
                <li>
                  <span className='w-2.5 h-2.5 bg-slate-600 rounded-full inline-block mr-3'></span>
                  Complete los campos requeridos (*).
                </li>
                <li>
                  <span className='w-2.5 h-2.5 bg-slate-600 rounded-full inline-block mr-3'></span>
                  Acepte el acuerdo de responsabilidad (*).
                </li>
                <li>
                  <span className='w-2.5 h-2.5 bg-slate-600 rounded-full inline-block mr-3'></span>
                  Presione el botón Aceptar y continuar.
                </li>
                <li>
                  <span className='w-2.5 h-2.5 bg-slate-600 rounded-full inline-block mr-3'></span>
                  Para la activación del usuario debe firmar el acuerdo de responsabilidad, 
                  si es persona jurídica el acuerdo debe ser firmado por el representante legal.
                </li>
                <li>
                  <span className='w-2.5 h-2.5 bg-slate-600 rounded-full inline-block mr-3'></span>
                  Escoja si la firma es electrónica (archivo p12) o firma manuscrita.
                </li>
                <li>
                  <span className='w-2.5 h-2.5 bg-slate-600 rounded-full inline-block mr-3'></span>
                  Si la firma es electrónica, presione el botón Firmar Acuerdo y proceda a seleccionar 
                  zona de firma, escoger el archivo p12 e ingresar la contraseña de su firma.
                </li>
                <li>
                  <span className='w-2.5 h-2.5 bg-slate-600 rounded-full inline-block mr-3'></span>
                  Si la firma es manuscrita, presione el botón Descargar Acuerdo, el mismo que deberá 
                  ser impreso y firmado. A continuación debe escanear el acuerdo y subirlo en la sección 
                  Adjuntar Acuerdo. Para la verificación de identidad debe adjuntar una fotografía (tipo selfie) 
                  con su documento de identidad.
                </li>
                <li>
                  <span className='w-2.5 h-2.5 bg-slate-600 rounded-full inline-block mr-3'></span>
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
          className='w-[600px]'>
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
                {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
                  <CardContent className='flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6 p-8 pt-0'>
                    <div className='w-full sm:w-3/10 flex items-center justify-center p-4 border-2 border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
                      <img src={log_azo} className='max-h-40 max-w-full' alt="Logo"></img>
                    </div>
                    <div className='w-full sm:w-7/10 space-y-6'>
                      <FormField
                        control={loginForm.control}
                        name='username'
                        className='space-y-1'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input
                                //className='w-full'
                                placeholder='Ingrese su cedula'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name='password'
                        className='space-y-1'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                //className='w-full'
                                placeholder='Ingrese su password'
                                type='password'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
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

              <Form className='flex flex-col' {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>

                  <CardContent className='space-y-2'>
                    <FormField
                      control={registerForm.control}
                      name='ci'
                      className='space-y-1'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Documento de Identidad</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Ingrese su documento de identidad'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage>{errors?.ci}</FormMessage>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
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
                          <FormDescription>Ejemplo de una contraseña segura: !d8Jqz7@f4R$1P</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
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
                          <FormMessage>{errors?.email}</FormMessage>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name='fullName'
                      className='space-y-1'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre Completo</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Ingrese sus nombres y apellidos'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> 

                    <FormField
                      control={registerForm.control}
                      name='address'
                      className='space-y-1'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dirección</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Ingrese su dirección'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className='flex flex-row w-full justify-center space-x-2'>
                      <FormField
                        control={registerForm.control}
                        name='phone'
                        className='space-y-1'
                        render={({ field }) => (
                          <FormItem className='w-full'>
                            <FormLabel>Celular/ Teléfono</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Ingrese su celular o teléfono'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name='taxpayerCity'
                        className='space-y-1'
                        render={({ field }) => (
                          <FormItem className='w-full'>
                            <FormLabel>Ciudad</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Ingrese la ciudad de residencia'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className='flex flex-col sm:flex-row w-full justify-center space-y-4 sm:space-y-0 sm:space-x-4'>
                      <FormField
                        control={registerForm.control}
                        name='houseNumber'
                        render={({ field }) => (
                          <FormItem className='w-full sm:w-1/2'>
                            <FormLabel>Número de Casa</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Ingrese el número de su casa'
                                className='w-full'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={registerForm.control}
                        name='birthdate'
                        render={({ field }) => (
                          <FormItem className='w-full sm:w-1/2'>
                            <FormLabel>Fecha de Cumpleaños</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={'outline'}
                                    className={cn(
                                      'w-full h-10 px-3 text-left font-normal',
                                      !field.value && 'text-muted-foreground'
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, 'PPP')
                                    ) : (
                                      <span>Seleccione una fecha</span>
                                    )}
                                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className='w-auto p-0' align='start'>
                                <Calendar
                                  mode='single'
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() || date < new Date('1900-01-01')
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className='flex flex-row w-full justify-center space-x-2'>
                      <FormField
                        control={registerForm.control}
                        name='taxpayerType'
                        render={({ field }) => (
                          <FormItem className='w-full'>
                            <FormLabel>Tipo de Contribuyente</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                <SelectTrigger>
                                  <SelectValue placeholder='Seleccione el tipo de contribuyente' />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value='0'>NORMAL</SelectItem>
                                  <SelectItem value='1'>PROVEEDOR</SelectItem>
                                  <SelectItem value='2'>EMPLEADO</SelectItem>
                                  <SelectItem value='3'>TRABAJADOR</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage>{errors?.taxpayerType}</FormMessage>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={registerForm.control}
                        name='legalPerson'
                        render={({ field }) => (
                          <FormItem className='w-full'>
                            <FormLabel>Tipo de Persona</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                <SelectTrigger>
                                  <SelectValue placeholder='Seleccione el tipo de persona' />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value='44'>PERSONA NATURAL</SelectItem>
                                  <SelectItem value='45'>JURÍDICA DERECHO PÚBLICO</SelectItem>
                                  <SelectItem value='46'>JURÍDICA DERECHO PRIVADO</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage>{errors?.legalPerson}</FormMessage>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className='flex flex-row w-full justify-center space-x-2'>
                      <FormField
                        control={registerForm.control}
                        name='identificationType'
                        render={({ field }) => (
                          <FormItem className='w-full'>
                            <FormLabel>Tipo de Identificación</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                <SelectTrigger>
                                  <SelectValue placeholder='Seleccione el tipo de identificación' />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value='33'>CÉDULA</SelectItem>
                                  <SelectItem value='34'>PASAPORTE</SelectItem>
                                  <SelectItem value='36'>RUC</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage>{errors?.identificationType}</FormMessage>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={registerForm.control}
                        name='maritalStatus'
                        render={({ field }) => (
                          <FormItem className='w-full'>
                            <FormLabel>Estado Civil</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                <SelectTrigger>
                                  <SelectValue placeholder='Seleccione el estado civil' />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value='37'>SOLTERO(A)</SelectItem>
                                  <SelectItem value='38'>CASADO(A)</SelectItem>
                                  <SelectItem value='39'>UNIÓN LIBRE</SelectItem>
                                  <SelectItem value='40'>DIVORCIADO(A)</SelectItem>
                                  <SelectItem value='41'>VIUDO(A)</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage>{errors?.maritalStatus}</FormMessage>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={registerForm.control}
                      name='acceptedTerms'
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
                              Términos de servicio y Política de privacidad.
                            </FormLabel>
                            <FormDescription>
                              Acepto{' '}
                              <Link className='font-semibold underline' onClick={handleViewTerms}>Términos y Condiciones</Link>
                              {' '}del servico.
                            </FormDescription>
                            <FormMessage />
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

      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Términos y Condiciones</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {latestTerm ? latestTerm.content : 'Cargando términos...'}
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setShowTerms(false)} variant='outline'>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </Layout>
  );
}

export { LoginPage };
