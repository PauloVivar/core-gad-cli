import PropTypes from 'prop-types';
import { useTerms } from '@/hooks/useTerms';
import { useAuth } from '@/auth/hooks/useAuth';

//components
import { TableCell, TableRow } from '@/components/ui/table';

//icons
import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/solid';

const TermRow = ({ id, version, content, effectiveDate, created_date, last_modified_date }) => {

  const { handlerDeleteTerm, handlerSelectedTermForm } = useTerms();
  const { login } = useAuth();
  
  return (
    <TableRow >
      <TableCell>{id}</TableCell>
      <TableCell>{version}</TableCell>
      <TableCell>{content}</TableCell>
      <TableCell>{effectiveDate}</TableCell>
      <TableCell>{created_date}</TableCell>
      <TableCell>{last_modified_date}</TableCell>

      {!login.isAdmin ||
        <TableCell className='flex flex-row gap-2'>
          <button onClick={()=> handlerSelectedTermForm({
            id,
            version,
            content,
            effectiveDate,
            created_date,
            last_modified_date,
          })}>
            <ArrowPathIcon className='size-5 text-zinc-500 hover:cursor-pointer' />
          </button>
          <button onClick={()=> handlerDeleteTerm(id)}>
            <TrashIcon className='size-5 text-red-500 hover:cursor-pointer' />
          </button>
        </TableCell>
      }
      
    </TableRow>
  );
};

TermRow.propTypes = {
  id: PropTypes.number.isRequired,
  version: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  effectiveDate: PropTypes.any.isRequired,
  created_date: PropTypes.any.isRequired,
  last_modified_date: PropTypes.any.isRequired,
}

export { TermRow };
