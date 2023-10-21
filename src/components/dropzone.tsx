import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';

export interface DropzoneProps {
  onDropSuccess: (data: any) => void;
}

const Dropzone = (props: DropzoneProps) => {
  const { onDropSuccess } = props;

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: { 'application/json': ['.json'] },
    maxFiles: 1,
    onDropAccepted: async (files) => {
      const firstFile = files?.[0];
      if (!firstFile) return;

      const fileReader = new FileReader();
      fileReader.onload = () => {
        const fileData = JSON.parse(fileReader.result as string);

        onDropSuccess?.(fileData);
      };
      fileReader.readAsText(firstFile);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        'w-full flex justify-center z-10 items-center hover:bg-neutral-200 border bg-neutral-100 rounded-2xl px-6 h-[240px] cursor-pointer transition-all outline-none',
        isFocused && 'ring-blue-300 ring-4',
        isDragAccept && 'ring-green-300 ring-4',
        isDragReject && 'ring-red-300 ring-4'
      )}
    >
      <input {...getInputProps()} />

      {acceptedFiles?.length > 0 ? (
        <p className='text-xl font-bold'>
          Current Material:{' '}
          <span className='text-blue-500'>{acceptedFiles[0].name}</span>
        </p>
      ) : (
        <div className='flex flex-col items-center space-y-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2}
            stroke='currentColor'
            className='w-16 h-16 text-blue-500'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z'
            />
          </svg>
          <p className='text-xl font-bold'>
            Drop material file here, or{' '}
            <span className='text-blue-500'>browse</span>
          </p>
          <p className='text-neutral-400'>Only .json allowed</p>
        </div>
      )}
    </div>
  );
};

export { Dropzone };
