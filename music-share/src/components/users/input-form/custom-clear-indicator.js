import React from 'react';
import EmojiIcon from '@atlaskit/icon/glyph/emoji';
import Select, { components } from 'react-select';

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
    </components.DropdownIndicator>
  );
};

export default (props) => (
  <Select
    closeMenuOnSelect={false}
    components={{ DropdownIndicator }}
    isMulti
    options={props.options}
  />
);