import { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'sonner';
import Prism from 'prismjs';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-hlsl';
import '@/styles/prism.css';

export interface CodeHighlightProps {
  content: string;
}

const CodeHighlight = (props: CodeHighlightProps) => {
  const { content } = props;
  const codeElementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!codeElementRef.current) return;

    Prism.highlightElement(codeElementRef.current);
  }, []);

  return (
    <div className='relative'>
      <pre
        contentEditable
        suppressContentEditableWarning
        className='scrollbar-thin scrollbar-thumb-neutral-500 focus:ring-4 ring-blue-300 outline-none rounded-2xl p-4 bg-neutral-50 transition-all overflow-hidden border min-h-[240px] max-h-[90vh]'
      >
        <code ref={codeElementRef} className='language-hlsl'>
          {content}
        </code>
      </pre>
      <CopyToClipboard
        text={content}
        onCopy={() => {
          toast.success('Copy to clipboard', {
            position: 'top-center',
          });
        }}
      >
        <button className='absolute right-4 top-4 p-2 bg-blue-500 outline-none hover:bg-blue-400 transition-all active:scale-95 text-blue-50 rounded-xl cursor-pointer select-none'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z'
            />
          </svg>
        </button>
      </CopyToClipboard>
    </div>
  );
};

export { CodeHighlight };
