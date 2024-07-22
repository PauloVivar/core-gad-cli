import React, { useState, useEffect } from 'react';
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

export function TermsAcceptanceModal() {
  const [showTerms, setShowTerms] = useState(false);
  const { login, handlerLogout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    latestTerm,
    getLatestTerms,
    getCheckUserTermsStatus,
    getRecordTermsInteraction
  } = useTerms();

  useEffect(() => {
    if (login.isAuth) {
      checkTermsStatus();
    }
  }, [login.isAuth]);

  const checkTermsStatus = async () => {
    try {
      await getLatestTerms();
      const status = await getCheckUserTermsStatus(login.user.id);
      console.log('id_user: ', login.user.id)
      if (!status) {
        setShowTerms(true);
      }
    } catch (error) {
      console.error('Error al verificar el estado de los términos:', error);
    }
  };

  const handleAcceptTerms = async () => {
    if (!login.user || !login.user.id) {
      toast({
        title: 'Error',
        description: 'No se pudo identificar al usuario. Por favor, intente iniciar sesión nuevamente.',
        variant: 'destructive',
      });
      return;
    }

    try {
      console.log('test2: ', login.user.id);
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
        description: 'Hubo un problema al aceptar los términos y condiciones.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={showTerms} onOpenChange={setShowTerms}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevos Términos y Condiciones</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {latestTerm ? latestTerm.content : 'Cargando términos...'}
        </DialogDescription>
        <DialogFooter>
          <Button onClick={handleAcceptTerms}>Aceptar</Button>
          <Button onClick={handlerLogout} variant="outline">Rechazar y cerrar sesión</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}