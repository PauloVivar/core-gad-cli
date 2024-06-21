
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Components/ui/table';

import { Card } from '@/Components/ui/card';
import { UserRow } from './UserRow';
import { useContext } from 'react';
import { UserContext } from '@/Context/UserContext';

const UsersList = () => {

  const { users } = useContext(UserContext);

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
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map(({ id, username, email }) => (
              <UserRow
                key={id}
                id={id}
                username={username}
                email={email}
              />
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};

export { UsersList };
