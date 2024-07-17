import PropTypes from 'prop-types';
import { useTerms } from '@/hooks/useTerms';
import { useAuth } from '@/auth/hooks/useAuth';

//components
import { TableCell, TableRow } from '@/components/ui/table';

//icons
import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/solid';

const TermRow = ({ id, version, content, effectiveDate }) => {

  const { handlerDeleteTerm, handlerSelectedTermForm } = useTerms();
  const { login } = useAuth();
  
  return (
    <TableRow >
      <TableCell>{id}</TableCell>
      <TableCell>{version}</TableCell>
      <TableCell>{content}</TableCell>
      <TableCell>{effectiveDate}</TableCell>

      {!login.isAdmin ||
        <TableCell className='flex flex-row gap-2'>
          <button onClick={()=> handlerSelectedTermForm({
            id,
            version,
            content,
            effectiveDate
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
  effectiveDate: PropTypes.any.isRequired
}

export { TermRow };
