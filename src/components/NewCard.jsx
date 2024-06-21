import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';

function NewCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Noticias</CardTitle>
        <CardDescription>
          Esta en Proceso la digitalización de procesos del Gad Municipal.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          size='sm'
          className='w-full'>
          Upgrade
        </Button>
      </CardContent>
    </Card>
  );
}

export { NewCard };
