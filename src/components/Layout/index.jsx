import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  Layout.propTypes = {
    children: PropTypes.node.isRequired,
  };

  //className='flex flex-col items-center h-1/2 py-4 mt-0 lg:mt-16'>
  return (
    <>
      <div className='w-[95%] absolute top-14 lg:w-[75%] lg:left-72 '>
        <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
        
          <div className='flex items-center'>
            <h1 className='text-lg font-semibold md:text-2xl'>Usuarios</h1>
          </div>

          <div
            className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-4'
          >

            <div className='flex flex-col items-center gap-1'>
              {children}
            </div>
          </div>

        </main>
      </div>
      
    </>
  );
};

export { Layout };
