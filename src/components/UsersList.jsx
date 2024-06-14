import PropTypes from 'prop-types';

import {
  Table,
  TableBody,
  TableCaption,
  //TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Card } from '@/components/ui/card';
import { UserRow } from './UserRow';

const UsersList = ({ users, handlerDeleteUser, handlerSelectedUserForm }) => {
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
                handlerDeleteUser={handlerDeleteUser}
                handlerSelectedUserForm={handlerSelectedUserForm}
              />
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  handlerDeleteUser: PropTypes.func.isRequired,
  handlerSelectedUserForm: PropTypes.func.isRequired,
};

export { UsersList };
