import { useUsers } from '@/hooks/useUsers';
import { useAuth } from '@/auth/hooks/useAuth';

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Card } from '@/components/ui/card';
import { UserRow } from './UserRow';

const UsersList = () => {

  const { users } = useUsers();
  const { login } = useAuth();

  return (
    <>
      <Card className='w-full'>
        <Table>
          <TableCaption>Lista de Usuarios</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>Email</TableHead>
              {!login.isAdmin ||
                <TableHead>Acciones</TableHead>
              }
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map(({ id, username, email, admin }) => (
              <UserRow
                key={id}
                id={id}
                username={username}
                email={email}
                admin={admin}
              />
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};

export { UsersList };
