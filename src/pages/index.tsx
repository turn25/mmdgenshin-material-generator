import clsx from 'clsx';
import { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { generateShaderOutput } from '../libs/shader-output';

const removeExt = (fileName: string) =>
  fileName.split('.').slice(0, -1).join('.');

// Avatar_Boy_Bow_Aquaria_Mat_Body
const generateDownloadName = (fileName: string) => {
  let name = 'material';

  if (fileName) {
    try {
      const nameArr = removeExt(fileName).split('_');
      const materialName = nameArr[nameArr.length - 1];
      const charName = nameArr[3];
      if (charName && materialName) {
        name = charName + '_' + materialName;
        name = name.toLocaleLowerCase();
      }
    } catch (e) {
      console.error(e);
    }
  }

  return name + '.fx';
};

export type File = {
  name: string;
  data: any;
};

const IndexPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const fileName = file?.name;

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: { 'application/json': ['.json'] },
      maxFiles: 1,
      onDropAccepted: async (files) => {
        const firstFile = files?.[0];
        if (!firstFile) return;

        const fileReader = new FileReader();
        fileReader.onload = () => {
          const fileData = JSON.parse(fileReader.result as string);

          setFile({ name: firstFile.name, data: fileData });
        };
        fileReader.readAsText(firstFile);
      },
    });

  const output = useMemo(() => {
    return generateShaderOutput(file?.data);
  }, [file?.data]);

  const handleDownloadFile = useCallback(() => {
    if (!output) return;

    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const name = generateDownloadName(fileName!);

    link.download = name;
    link.href = url;
    link.click();
  }, [output, fileName]);

  return (
    <div className='container max-w-screen-lg py-4 space-y-4'>
      <div
        {...getRootProps()}
        className={clsx(
          'w-full flex justify-center z-10 items-center bg-neutral-100 rounded-2xl px-6 py-16 cursor-pointer relative transition-all',
          isDragReject && 'border-red-400 ring-4',
          isDragAccept && 'border-green-400 ring-4',
          isFocused && 'border-blue-300 ring-4'
        )}
      >
        <input
          {...getInputProps()}
          className='opacity-0 select-none absolute inset-0'
        />

        <p className='font-medium pointer-events-none'>
          {file
            ? 'Current Material: ' + fileName
            : 'Drop Material File here (*.json)'}
        </p>
      </div>

      {output && (
        <>
          <button
            onClick={handleDownloadFile}
            className='inline-flex justify-center items-center px-6 py-4 bg-blue-500 text-blue-50 rounded-xl font-bold cursor-pointer'
          >
            Download
          </button>

          <pre
            contentEditable
            className='focus:ring-4 ring-blue-300 outline-none rounded-2xl p-4 bg-neutral-50 transition-all overflow-hidden'
          >
            {output}
          </pre>
        </>
      )}

      {/* {data && (
        <pre className='bg-neutral-100 rounded-2xl'>
          {JSON.stringify(data, null, 2)}
        </pre>
      )} */}
    </div>
  );
};

export default IndexPage;
