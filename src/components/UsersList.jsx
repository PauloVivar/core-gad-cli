
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
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { AuthContext } from '@/auth/context/AuthContext';

const UsersList = () => {

  const { users } = useContext(UserContext);
  const { login } = useContext(AuthContext);

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
