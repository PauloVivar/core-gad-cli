import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTerms } from '@/hooks/useTerms';

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

import { Calendar } from '@/components/ui/calendar';
import { Textarea } from './ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

//Validation Schema
const termSchema = z.object({
  id: z.number(),
  version: z.string().min(1, {
    message: 'La versión es requerida.',
  }),
  content: z.string().min(1, {
    message: 'El contenido es requerido.'
  }),
  effectiveDate: z.date({
    required_error: 'Se requiere una Fecha efectiva.',
  }),
});

function TermForm({ termSelected, handlerCloseForm }) {

  //Context useTerms Global Redux.
  const { initialTermForm, handlerAddTerm, errors } = useTerms();
  
  // 1. Define your form.
  const form = useForm({
    resolver: 
      (!termSelected.version || !termSelected.content && termSelected.id === 0 || !termSelected.effectiveDate) ?
      zodResolver(termSchema) : '',
    defaultValues: initialTermForm,
  });

  // 2. Define a submit handler.
  const onSubmit = (data) => {
    console.log('datos: ', data);
    handlerAddTerm(data);
    form.reset();
  }

  //3. Selecccionar rows de tabla term.
  useEffect(()=>{
    async function loadTerm(){
      if (termSelected){
        const term = await {
          ...termSelected,
          created_date:'',
          last_modified_date:'',
        };
        //console.log('use_Effect: ',term.admin);
        form.setValue('id', term.id);
        form.setValue('version', term.version);
        form.setValue('content', term.content);
        form.setValue('effectiveDate', term.effectiveDate);
      }
    }
    loadTerm()
  },[form, termSelected]);

  const onCloseForm = () => {
    handlerCloseForm();
    form.reset();
  }

  return (
    <div className='flex flex-col w-full'>
      <Card className='w-[400px] p-6'>
        <Form className='flex flex-col gap-4' {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='version'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Versión de Términos y Condiciones</FormLabel>
                  <FormControl>
                    <Input placeholder='Ingrese la version' {...field} />
                  </FormControl>
                  <FormMessage>
                    {errors?.version}
                  </FormMessage>
                </FormItem>
              )}
            />
            { termSelected.id > 0 || 
              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contenido de Términos y Condiciones</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Ingrese su contenido' type='content' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> 
            }

            <FormField
              control={form.control}
              name='effectiveDate'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Fecha Efectiva</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Ingrese la fecha efectiva</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        //onSelect={field.onChange}
                        onSelect={(date) => {
                          // Crear un objeto Date solo con la fecha
                          const dateOnly = new Date(date);
                          dateOnly.setHours(0, 0, 0, 0); // Configurar la hora a 00:00:00
                          field.onChange(dateOnly);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Fecha Efectiva define desde qué momento se aplican los Términos y Condiciones especificados en el documento.
                  </FormDescription>
                  <FormMessage />
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
              { termSelected.id === 0 ? 'Crear' : 'Actualizar' }
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
  );
}

TermForm.propTypes = {
  termSelected: PropTypes.object,
  handlerCloseForm: PropTypes.func,
}

export { TermForm, termSchema };
