import React, { useState, useRef, useEffect } from 'react';

const Select = ({ children, onValueChange, value, defaultValue, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || defaultValue || '');
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue);
    setIsOpen(false);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <div ref={selectRef} className="relative" {...props}>
      {React.Children.map(children, child => {
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, {
            onClick: () => setIsOpen(!isOpen),
            isOpen
          });
        }
        if (child.type === SelectContent) {
          return React.cloneElement(child, {
            isOpen,
            onValueChange: handleValueChange,
            selectedValue
          });
        }
        return child;
      })}
    </div>
  );
};

const SelectTrigger = ({ children, className = '', onClick, isOpen, ...props }) => (
  <button
    type="button"
    role="combobox"
    aria-expanded={isOpen}
    className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
    <svg
      className={`h-4 w-4 opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </button>
);

const SelectValue = ({ placeholder, children }) => (
  <span className="text-sm">
    {children || placeholder}
  </span>
);

const SelectContent = ({ children, isOpen, onValueChange, selectedValue, className = '' }) => {
  if (!isOpen) return null;

  return (
    <div className={`absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-white shadow-lg ${className}`}>
      {React.Children.map(children, child => {
        if (child.type === SelectItem) {
          return React.cloneElement(child, {
            onSelect: onValueChange,
            isSelected: child.props.value === selectedValue
          });
        }
        return child;
      })}
    </div>
  );
};

const SelectItem = ({ children, value, onSelect, isSelected, className = '' }) => (
  <div
    className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${isSelected ? 'bg-accent' : ''} ${className}`}
    onClick={() => onSelect(value)}
  >
    {isSelected && (
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </span>
    )}
    {children}
  </div>
);

Select.displayName = 'Select';
SelectTrigger.displayName = 'SelectTrigger';
SelectValue.displayName = 'SelectValue';
SelectContent.displayName = 'SelectContent';
SelectItem.displayName = 'SelectItem';

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };