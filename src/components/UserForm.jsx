import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUsers } from '@/hooks/useUsers';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

//const existingValues = errors;

//Validation Schema
const userSchema = z.object({
  id: z.number(),
  username: z.string().min(1, {
    message: 'El username es requerido.',
  }),
  password: z.string().min(5, {
    message: 'El password debe tener al menos 5 caracteres.'
  }),
  email: z.string().email({
    message: 'Ingrese un email válido.',
  }),
  admin: z.boolean().default(false).optional(),
  // username: z.string(),
  // email: z.string(),
  // password: z.string(),
});

function UserForm({ userSelected, handlerCloseForm }) {

  //Context useUsers Global Redux
  const { initialUserForm, handlerAddUser, errors } = useUsers();
  
  // 1. Define your form.
  const form = useForm({
    resolver: 
      (!userSelected.username || !userSelected.password && userSelected.id === 0 || !userSelected.email) ?
      zodResolver(userSchema) : '',
    defaultValues: initialUserForm,
  });

  // 2. Define a submit handler.
  const onSubmit = (userForm) => {
    console.log('user_form: ', userForm);
    handlerAddUser(userForm);
    form.reset();
  }

  //3. Selecccionar rows de tabla user
  useEffect(()=>{
    async function loadUser(){
      if (userSelected){
        const user = await {
          ...userSelected, 
          password:'',
        };
        //console.log('use_Effect: ',user.admin);
        form.setValue('id', user.id);
        form.setValue('username', user.username);
        form.setValue('password', user.password);
        form.setValue('email', user.email);
        form.setValue('admin', user.admin);
      }
    }
    loadUser()
  },[form, userSelected]);

  const onCloseForm = () => {
    handlerCloseForm();
    form.reset();
  }

  return (
    <>
    <div className='flex flex-col w-full'>
      <Card className='w-[400px] p-6'>
        <Form className='flex flex-col gap-4' {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='Ingrese su username' {...field} />
                  </FormControl>
                  <FormMessage>
                    {errors?.username}
                  </FormMessage>
                </FormItem>
              )}
            />
            { userSelected.id > 0 || 
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input placeholder='Ingrese su password' type='password' {...field} />
                    </FormControl>
                    <FormDescription>
                      Ingrese una contraseña segura
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> 
            }
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Ingres su email' {...field} />
                  </FormControl>
                  <FormMessage>
                    {errors?.email}
                  </FormMessage>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name='admin'
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
                      Role Admin
                    </FormLabel>
                    <FormDescription>
                      Seleccione para un Usuario Admistrador.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='id'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type='hidden' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type='submit'>
              { userSelected.id === 0 ? 'Crear' : 'Actualizar' }
            </Button>
            {
              !handlerCloseForm ||
              <Button 
                type='button'
                className='mx-2'
                variant='destructive'
                onClick={ ()=>onCloseForm() }
              >
                  Cerrar
              </Button>
            }
          </form>
        </Form>
      </Card>
    </div>
    </>
  );
}

UserForm.propTypes = {
  userSelected: PropTypes.object,
  handlerCloseForm: PropTypes.func,
}

export { UserForm, userSchema };
