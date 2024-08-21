import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/auth/hooks/useAuth';
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';

// Validation schemas
const requestResetSchema = z.object({
  email: z.string().email({
    message: 'Ingrese un email válido.',
  }),
});

const resetPasswordSchema = z.object({
  code: z.string().min(6, {
    message: 'El code debe tener al menos 6 dígitos.',
  }),
  newPassword: z.string().min(5, {
    message: 'La nueva contraseña debe tener al menos 5 caracteres.',
  }),
});

const AccountRecoveryPage = () => {

  const [step, setStep] = useState('request');
  const navigate = useNavigate();
  const { toast } = useToast();

  const { 
    passwordReset: { passwordResetSuccess, passwordResetError },
    handlerRequestPasswordReset,
    handlerResetPassword,
    clearPasswordResetStatus
  } = useAuth();

  const requestForm = useForm({
    resolver: zodResolver(requestResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const resetForm = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      code: '',
      newPassword: '',
    },
  });

  useEffect(() => {
    return () => {
      clearPasswordResetStatus();
    };
  }, [clearPasswordResetStatus]);

  useEffect(() => {
    if (step === 'reset') {
      resetForm.reset({ code: '', newPassword: '' });
      //console.log('Formulario de reset reiniciado');
    }
  }, [step, resetForm]);

  useEffect(() => {
    if (passwordResetSuccess) {
      toast({
        title: 'Contraseña restablecida',
        description: 'Tu contraseña ha sido actualizada exitosamente.',
      });
      navigate('/login');
    }
  }, [passwordResetSuccess, navigate, toast]);

  useEffect(() => {
    if (passwordResetError) {
      toast({
        title: 'Error',
        description: passwordResetError,
        variant: 'destructive',
      });
    }
  }, [passwordResetError, toast]);

  const onRequestSubmit = async (data) => {
    //console.log('Solicitando restablecimiento de contraseña:', data);
    try {
      await handlerRequestPasswordReset(data.email);
      toast({
        title: 'Correo enviado',
        description: 'Se ha enviado un correo con las instrucciones para restablecer tu contraseña.',
      });
      setStep('reset');

    } catch (error) {
      console.error('Error al solicitar restablecimiento de contraseña:', error);
    }
    //requestForm.reset();
  };

  const onResetSubmit = async (data) => {
    //console.log('Restableciendo contraseña:', data);
    try {
      await handlerResetPassword(data.code, data.newPassword);
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
    }
    //resetForm.reset();
  };

  return (
    <Layout>
      <div className='flex justify-center items-center h-screen bg-gray-100'>
        <Card className='w-[400px]'>
          <CardHeader>
            <CardTitle>Recupera tu cuenta</CardTitle>
            <CardDescription>
              {step === 'request' 
                ? 'Ingresa tu correo electrónico para recibir instrucciones.' 
                : 'Ingresa el código recibido y tu nueva contraseña.'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {step === 'request' ? (
              <Form {...requestForm}>
                <form onSubmit={requestForm.handleSubmit(onRequestSubmit)} className='space-y-4'>
                  <FormField
                    control={requestForm.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor='email-input'>Correo electrónico</FormLabel>
                        <FormControl>
                          <Input type='email' id='email-input' placeholder='example@email.com' autoComplete='email' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type='submit' className='w-full'>Enviar instrucciones</Button>
                </form>
              </Form>
             ) : (
              <Form {...resetForm}>
                <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className='space-y-4'>
                  {/* <FormField */}
                  <Controller
                    control={resetForm.control}
                    name='code'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor='code-input'>Código de verificación</FormLabel>
                        <FormControl>
                          <Input type='text' id='code-input' placeholder='Ingresa el código' {...field} 
                            // onChange={(e) => {
                            //   field.onChange(e);
                            //   console.log('Código cambiado:', e.target.value);
                            // }} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={resetForm.control}
                    name='newPassword'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor='newPassword-input'>Nueva contraseña</FormLabel>
                        <FormControl>
                          <Input type='password' id='newPassword-input' placeholder='Nueva contraseña' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type='submit' className='w-full'>Restablecer contraseña</Button>
                </form>
              </Form>
            )}
          </CardContent>

          <CardFooter className='justify-center'>
            <NavLink to='/login' className='hover:underline font-medium text-sm p-2'>
              Volver al inicio de sesión
            </NavLink>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export { AccountRecoveryPage };