import PropTypes from 'prop-types';

const Layout = ({ children }) => {

  //className='flex flex-col items-center h-1/2 py-4 mt-0 lg:mt-16'>
  return (
    <>
      <div className='w-[95%] absolute top-14 lg:w-[75%] lg:left-72 '>
        <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
          
          {children}
        
        </main>
      </div>
      
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Layout };
