import { useTerms } from '@/hooks/useTerms';
import { useAuth } from '@/auth/hooks/useAuth';
import { TermRow } from './TermRow';

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Card } from '@/components/ui/card';

const TermsList = () => {

  const { terms } = useTerms();
  const { login } = useAuth();

  return (
    <>
      <Card className='w-full'>
        <Table>
          <TableCaption>Lista de Términos y Condiciones</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>EffectiveDate</TableHead>
              <TableHead>CreatedDate</TableHead>
              <TableHead>LastModifiedDate</TableHead>
              {!login.isAdmin ||
                <TableHead>Acciones</TableHead>
              }
            </TableRow>
          </TableHeader>

          <TableBody>
            {terms.map(({ id, version, content, effectiveDate, created_date, last_modified_date }) => (
              <TermRow
                key={id}
                id={id}
                version={version}
                content={content}
                effectiveDate={effectiveDate}
                created_date={created_date}
                last_modified_date={last_modified_date}
              />
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};

export { TermsList };
