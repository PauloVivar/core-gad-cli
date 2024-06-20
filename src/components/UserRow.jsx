import PropTypes from 'prop-types';

import { useContext } from 'react';
import { UserContext } from '@/Context/UserContext';
import { NavLink } from 'react-router-dom';

import { TableCell, TableRow } from '@/components/ui/table';

//icons
import { ArrowPathIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid';

const UserRow = ({ id, username, email }) => {

  const {handlerDeleteUser, handlerSelectedUserForm} = useContext(UserContext);
  
  return (
    <TableRow >
      <TableCell>{id}</TableCell>
      <TableCell>{username}</TableCell>
      <TableCell>{email}</TableCell>

      <TableCell className='flex flex-row gap-2'>
        <button onClick={()=> handlerSelectedUserForm({
          id,
          username,
          email,
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
      
    </TableRow>
  );
};

UserRow.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
}

export { UserRow };
