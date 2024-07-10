import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Layout } from '../../components/Layout';
import { UserForm } from '../../components/UserForm';
import { useUsers } from '@/hooks/useUsers';


function SelectRegisterPage() {

  //useUsers hook(Redux) se reemplaza por useContext
  const { users=[], initialUserForm } = useUsers();

  const [userSelected, setUserSelected] = useState(initialUserForm);

  const { id } = useParams();

  useEffect(() => {
    //console.log(id);
    if (id){
      const user = users.find((u) => u.id == id) || initialUserForm;
      setUserSelected(user);
    }
  }, [id]);

  return (
    <Layout>
      <div className='flex items-center'>
        <h1 className='text-lg font-semibold md:text-2xl'>
          {userSelected.id > 0 ? 'Editar' : 'Registar'} Usuario
        </h1>
      </div>
      <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-4'>
        <div className='flex flex-col items-center gap-1'>
          <div className='w-[95%] h-full m-4 flex flex-row justify-center gap-4'>
            <UserForm userSelected={userSelected} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export { SelectRegisterPage };
