import React from 'react';
import Select, { components } from 'react-select';

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
    </components.DropdownIndicator>
  );
};

export const MultipleSelectField = ({
  options,
  field,
  form,
  className,
}) => (
  <Select
    id={field.id}
    name={field.name}
    className={className}
    options={options}
    values={field.value}
    onChange={selectedOptions => form.setFieldValue(field.name, selectedOptions)}
    onBlur={field.onBlur}
    closeMenuOnSelect={false}
    components={{ DropdownIndicator }}
    isMulti
  />
);