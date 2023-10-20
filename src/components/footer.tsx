const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='border-t py-4'>
      <div className='container max-w-screen-lg text-center space-y-2'>
        <div>
          Credit: Manashiku for the
          <a
            href='https://github.com/Manashiku/MMDGenshin'
            className='underline underline-offset-2 text-blue-500 mx-1'
          >
            MMDGenshin
          </a>
          Shader
        </div>

        <div>
          ©{currentYear} by{' '}
          <a
            href='https://github.com/turn25'
            target='_blank'
            rel='noopener noreferrer'
            className='underline underline-offset-2'
          >
            turn25
          </a>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
