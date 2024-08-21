import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/hooks/useAuth';
import { useTerms } from '@/hooks/useTerms';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Skeleton } from './ui/skeleton';

export function TermsAcceptanceModal() {
  const [showTerms, setShowTerms] = useState(false);
  const { login, handlerLogout } = useAuth();
  const { toast } = useToast();
  const {
    latestTerm,
    getLatestTerms,
    getCheckUserTermsStatus,
    getRecordTermsInteraction,
    isLoading,
    errors,
  } = useTerms();
  const navigate = useNavigate();
  
  const checkTermsStatus = useCallback(async () => {
    if (!login.user?.id) return;
    
    try {
      const status = await getCheckUserTermsStatus(login.user.id);
      //console.log('checkTermsStatus:', login.user.id);
      
      if (!status) {
        await getLatestTerms();
        setShowTerms(true);
      }
    } catch (error) {
      console.error('Error al verificar el estado de los términos:', error);
      toast({
        title: 'Error',
        description: 'No se pudo verificar el estado de los términos. Por favor, inténtelo de nuevo más tarde.',
        variant: 'destructive',
      });
    }
  }, [login.user?.id, getCheckUserTermsStatus, getLatestTerms, toast]);

  useEffect(() => {
    if (login.isAuth && login.user?.id) {
      checkTermsStatus();
    }
  }, [login.isAuth, login.user?.id, checkTermsStatus]);

  const handleAcceptTerms = async () => {
    if (!login.user?.id) {
      toast({
        title: 'Error',
        description: 'No se pudo identificar al usuario. Por favor, intente iniciar sesión nuevamente.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await getRecordTermsInteraction(login.user.id, true);
      setShowTerms(false);
      toast({
        title: 'Éxito',
        description: 'Términos y condiciones aceptados correctamente.',
      });
    } catch (error) {
      console.error('Error al aceptar los términos:', error);
      toast({
        title: 'Error',
        description: 'Hubo un problema al aceptar los términos y condiciones. Por favor, inténtelo de nuevo.',
        variant: 'destructive',
      });
    }
  };

  const handleReject = () => {
    setShowTerms(false);
    handlerLogout();
    navigate('/login');
  };

  if (!login.isAuth) return null;

  return (
    <Dialog open={showTerms} onOpenChange={setShowTerms}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevos Términos y Condiciones</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {isLoading ? (
            <Skeleton className='h-4 w-[200px]' />
          ) : errors ? (
            <p className='text-red-500'>{errors}</p>
          ) : (
            latestTerm ? latestTerm.content : 'No se pudieron cargar los términos.'
          )}
        </DialogDescription>
        <DialogFooter>
          <Button onClick={handleAcceptTerms} disabled={isLoading || errors}>Aceptar</Button>
          <Button onClick={handleReject}  disabled={isLoading} variant='outline'>Rechazar y cerrar sesión</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}