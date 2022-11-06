import React from 'react';
import debounce from 'lodash.debounce';

import styles from './search.module.scss';

const Search = ({ inputValue, setInputValue }) => {
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef();

  const clearInput = () => {
    setValue('');
    setInputValue('');
    inputRef.current.focus();
  };

  const setSearchValue = React.useCallback(
    debounce((value) => {
      setInputValue(value);
    }, 350),
    [],
  );

  return (
    <div className={styles.root}>
      <svg viewBox='0 0 32 32' className={styles.search}>
        <title />
        <g id='search'>
          <path d='M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z' />
        </g>
      </svg>
      {value && (
        <svg
          onClick={() => clearInput()}
          className={styles.close}
          version='1.1'
          viewBox='0 0 512 512'>
          <path d='M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z' />
        </svg>
      )}

      <input
        ref={inputRef}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setSearchValue(e.target.value);
        }}
        type='text'
        placeholder='Поиск пиццы...'
        className={styles.input}
      />
    </div>
  );
};

export default Search;
