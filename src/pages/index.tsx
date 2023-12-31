import { useCallback, useMemo, useState } from 'react';
import { generateShaderOutput } from '@/libs';
import { CodeHighlight, Dropzone, Footer, Header } from '@/components';
import { Toaster } from 'sonner';

// Avatar_Boy_Bow_Aquaria_Mat_Body
const generateDownloadName = (fileName: string) => {
  let name = 'material';

  if (fileName) {
    try {
      const nameArr = fileName.split('_');
      const materialName = nameArr[nameArr.length - 1];
      const charName = nameArr[3];
      if (charName && materialName) {
        name = name + '_' + charName + '_' + materialName;
        name = name.toLocaleLowerCase();
      }
    } catch (e) {
      console.error(e);
    }
  }

  return name + '.fx';
};

const IndexPage = () => {
  const [fileData, setFileData] = useState<any>(null);
  const fileName = fileData?.['m_Name'];

  const output = useMemo(() => {
    return generateShaderOutput(fileData);
  }, [fileData]);

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
    <div className='flex flex-col min-h-screen'>
      <Header />

      <main className='container max-w-screen-lg py-8 space-y-8 text-neutral-600 flex-1'>
        <Dropzone onDropSuccess={(data) => setFileData(data)} />

        {output && (
          <>
            <div className='flex justify-center'>
              <button
                onClick={handleDownloadFile}
                className='inline-flex justify-center outline-none focus-visible:ring-2 items-center px-8 w-full max-w-sm py-4 active:scale-95 hover:bg-blue-400 transition-all bg-blue-500 text-blue-50 rounded-xl font-bold cursor-pointer'
              >
                Download File
              </button>
            </div>

            <CodeHighlight key={output} content={output} />
          </>
        )}
      </main>

      <Footer />

      <Toaster richColors closeButton />
    </div>
  );
};

export default IndexPage;
