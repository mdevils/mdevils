import React from 'react';

const processText = (() => {
  const processTextCache: {[text: string]: string} = {};
  const propositions = [
    'i',
    'a',
    'an',
    'as',
    'the',
    'in',
    'of',
    'for',
    'by',
    'to',
    'with'
  ];
  const regexp = new RegExp(`\\b(${propositions.join('|')}) \\b`, 'ig');
  return (text: string) => {
    let result = processTextCache[text];
    if (!result) {
      result = text
        .replace(regexp, '$1\u00A0');
      processTextCache[text] = result;
    }
    return result;
  };
})();

export function Text({text}: {text: string}) {
  return (
    <>
      {processText(text)}
    </>
  );
}
