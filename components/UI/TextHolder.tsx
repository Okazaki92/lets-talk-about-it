'use client';

import React, { useEffect, useState } from 'react';

import { RichText } from '@graphcms/rich-text-react-renderer';
import { RichTextContent } from '@graphcms/rich-text-types';

interface TextHolderProps {
  content: RichTextContent;
  theme?: 'light' | 'dark';
  readMore?: boolean;
  handleReadMore?: () => void;
  small?: boolean;
}

export const TextHolder = ({
  content,
  theme = 'dark',
  readMore,
  small,
}: TextHolderProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const changeThemeTextColor = () => {
    if (theme === 'light') {
      return 'text-main-black ';
    }
    return 'text-main-white ';
  };

  return (
    <div
      className={`bg-main-${theme === 'light' ? 'white' : 'black'} 
      } p-8 rounded-2xl border-4 border-[#E2FF00]`}
    >
      <div
        className={`content flex prose ${
          small ? 'max-w-56' : ''
        } dark:text-main-white dark:prose-strong:text-main-white overflow-hidden transition-max-height duration-300 ease-in-out `}
        style={{ maxHeight: isExpanded ? '100%' : '298px' }}
      >
        <div
          className={`w-full ${
            theme === 'dark'
              ? 'text-main-white bg-main-black'
              : 'text-main-black bg-main-white'
          }`}
        >
          <RichText
            content={content}
            renderers={{
              p: ({ children }) => <p className="m-0">{children}</p>,
            }}
          />
        </div>
      </div>
      {readMore && (
        <button
          className={`${changeThemeTextColor()} w-full text-end `}
          onClick={toggleExpand}
        >
          {isExpanded ? '...czytaj mniej' : '...czytaj więcej'}
        </button>
      )}
    </div>
  );
};
