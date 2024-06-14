import PropTypes from 'prop-types';

import { TableCell, TableRow } from '@/components/ui/table';
//import { Button } from '@/components/ui/button';

//icons
import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/solid';

const UserRow = ({ handlerDeleteUser, handlerSelectedUserForm, id, username, email }) => {
  
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
        <button onClick={()=> handlerDeleteUser(id)}>
          <TrashIcon className='size-5 text-red-500 hover:cursor-pointer' />
        </button>
      </TableCell>
      
    </TableRow>
  );
};

UserRow.propTypes = {
  id: PropTypes.node.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  handlerDeleteUser: PropTypes.func.isRequired,
  handlerSelectedUserForm: PropTypes.func.isRequired,
}

export { UserRow };
