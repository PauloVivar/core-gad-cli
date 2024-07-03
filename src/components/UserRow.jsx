import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useUsers } from '@/hooks/useUsers';
import { useAuth } from '@/auth/hooks/useAuth';

//components
import { TableCell, TableRow } from '@/components/ui/table';

//icons
import { ArrowPathIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid';

const UserRow = ({ id, username, email, admin }) => {

  const { handlerDeleteUser, handlerSelectedUserForm } = useUsers();
  const { login } = useAuth();
  
  return (
    <TableRow >
      <TableCell>{id}</TableCell>
      <TableCell>{username}</TableCell>
      <TableCell>{email}</TableCell>

      {!login.isAdmin ||
        <TableCell className='flex flex-row gap-2'>
          <button onClick={()=> handlerSelectedUserForm({
            id,
            username,
            email,
            admin,
          })}>
            <ArrowPathIcon className='size-5 text-zinc-500 hover:cursor-pointer' />
          </button>
          <NavLink to={'/users/edit/' + id}>
            <PencilSquareIcon className='size-5 text-zinc-500 hover:cursor-pointer' />
          </NavLink>
          <button onClick={()=> handlerDeleteUser(id)}>
            <TrashIcon className='size-5 text-red-500 hover:cursor-pointer' />
          </button>
        </TableCell>
      }
      
    </TableRow>
  );
};

UserRow.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  admin: PropTypes.bool.isRequired,
}

export { UserRow };
