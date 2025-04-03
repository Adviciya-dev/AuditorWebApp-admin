import React from 'react';
import Select from 'react-select';

export function CustomSelect({ 
  label, 
  options, 
  value, 
  onChange, 
  placeholder,
  isMulti = false,
  isSearchable = true,
  isClearable = true,
  isDisabled = false,
  required = false,
  className,
  height,
  error,
}) {

 
  
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: '#E5E7EB',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#E5E7EB'
      },
      borderRadius: '0.375rem',
      // padding: '2px',
      outline: 'none',
      height:height,
      padding: "0",
      minHeight: height || '40px',

    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? '#3B82F6' 
        : state.isFocused 
          ? '#EFF6FF' 
          : 'transparent',
      color: state.isSelected ? 'white' : '#374151',
      '&:active': {
        backgroundColor: '#2563EB'
      }
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '0.375rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#EFF6FF',
      borderRadius: '0.25rem'
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#2563EB'
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#2563EB',
      '&:hover': {
        backgroundColor: '#DBEAFE',
        color: '#1E40AF'
      }
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#9CA3AF',
      '&:hover': {
        color: '#6B7280'
      }
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: '#9CA3AF',
      '&:hover': {
        color: '#6B7280'
      }
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '2px 8px'
    }),
    placeholder: (provided) => ({
      ...provided,
      fontWeight: '500',
      fontSize: '0.875rem',
      lineHeight: '1.6',
      color: '#525866'
    })
  };

  const formattedOptions = options?.map(option => ({
    value: option.value,
    label: option.label
  }));

  const selectedValue = value 
    ? isMulti 
      ? formattedOptions.filter(option => value.includes(option.value))
      : formattedOptions.find(option => option.value === value)
    : null;

  const handleChange = (selected) => {
    if (isMulti) {
      onChange(selected ? selected.map(item => item.value) : []);
    } else {
      onChange(selected ? selected.value : '');
    }
  };

  return (
    <div className={`${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
         
        </label>
      )}
      <Select
        options={formattedOptions}
        value={selectedValue}
        onChange={handleChange}
        placeholder={placeholder}
        isMulti={isMulti}
        isSearchable={isSearchable}
        isClearable={isClearable}
        isDisabled={isDisabled}
        styles={customStyles}
        className="react-select-container"
        classNamePrefix="react-select"
      />
        {error && <p className="mt-1 text-[12px] text-red-500">{error}</p>}
    </div>
  );
}