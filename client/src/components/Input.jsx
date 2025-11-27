/**
 * Input component with label
 * @param {Object} props
 * @param {string} props.label - Input label text
 * @param {string} props.value - Input value
 * @param {function} props.onChange - Change handler
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.className - Additional CSS classes
 */
export default function Input({ 
  label, 
  value, 
  onChange, 
  placeholder = '', 
  className = '',
  ...props 
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="text-label text-task-gray mb-2 block">
          {label}
        </label>
      )}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 border-2 border-task-gray-light rounded-task 
                   focus:border-task-blue transition-colors duration-200
                   text-gray-800 placeholder:text-task-gray"
        {...props}
      />
    </div>
  );
}
