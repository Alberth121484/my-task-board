/**
 * TextArea component with label
 * @param {Object} props
 * @param {string} props.label - TextArea label text
 * @param {string} props.value - TextArea value
 * @param {function} props.onChange - Change handler
 * @param {string} props.placeholder - Placeholder text
 * @param {number} props.rows - Number of rows
 * @param {string} props.className - Additional CSS classes
 */
export default function TextArea({ 
  label, 
  value, 
  onChange, 
  placeholder = '', 
  rows = 4,
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
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 border-2 border-task-gray-light rounded-task 
                   focus:border-task-blue transition-colors duration-200
                   text-gray-800 placeholder:text-task-gray resize-none"
        {...props}
      />
    </div>
  );
}
