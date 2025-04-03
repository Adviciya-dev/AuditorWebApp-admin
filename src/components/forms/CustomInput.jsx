import React from 'react';

export function CustomInput({
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  name,
  placeholder,
  icon,
  error,
  required = false
}) {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`block w-full h-[40px] placeholder:font-[500] placeholder:text-sm placeholder:leading-[1.6] placeholder:text-[#cbccd1] ${icon ?
            'pl-10' : 'pl-3'} pr-3 py-2 border border-[#E5E7EB] rounded-md 'border-gray-300'
            focus:ring-0 focus:border-1 focus:outline-none !focus:border`}
        />
      </div>
      {error && <p className="mt-1 text-[12px] text-red-500">{error}</p>}
    </div>
  );
}