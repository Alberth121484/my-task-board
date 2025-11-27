import { useState, useRef, useEffect } from 'react';

/**
 * BoardHeader component - Displays board logo, editable title and description
 * @param {Object} props
 * @param {string} props.name - Board name
 * @param {string} props.description - Board description
 * @param {function} props.onNameChange - Handler for name changes
 * @param {function} props.onDescriptionChange - Handler for description changes
 */
export default function BoardHeader({ 
  name = 'My Task Board', 
  description = 'Tasks to keep organised',
  onNameChange,
  onDescriptionChange 
}) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [localName, setLocalName] = useState(name);
  const [localDescription, setLocalDescription] = useState(description);
  
  const nameInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  // Update local state when props change
  useEffect(() => {
    setLocalName(name);
  }, [name]);

  useEffect(() => {
    setLocalDescription(description);
  }, [description]);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [isEditingName]);

  useEffect(() => {
    if (isEditingDescription && descriptionInputRef.current) {
      descriptionInputRef.current.focus();
      descriptionInputRef.current.select();
    }
  }, [isEditingDescription]);

  const handleNameSubmit = () => {
    setIsEditingName(false);
    if (localName.trim() && localName !== name) {
      onNameChange?.(localName.trim());
    } else {
      setLocalName(name);
    }
  };

  const handleDescriptionSubmit = () => {
    setIsEditingDescription(false);
    if (localDescription !== description) {
      onDescriptionChange?.(localDescription);
    }
  };

  const handleNameKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleNameSubmit();
    } else if (e.key === 'Escape') {
      setLocalName(name);
      setIsEditingName(false);
    }
  };

  const handleDescriptionKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleDescriptionSubmit();
    } else if (e.key === 'Escape') {
      setLocalDescription(description);
      setIsEditingDescription(false);
    }
  };

  return (
    <div className="mb-4 sm:mb-6">
      {/* Title Row */}
      <div className="flex items-center gap-2 sm:gap-3 mb-2">
        <img 
          src="/icons/Logo.svg" 
          alt="Task Board Logo" 
          className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" 
        />
        
        {isEditingName ? (
          <input
            ref={nameInputRef}
            type="text"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            onBlur={handleNameSubmit}
            onKeyDown={handleNameKeyDown}
            className="text-xl sm:text-2xl md:text-title font-outfit bg-transparent border-b-2 border-task-blue 
                       outline-none py-1 min-w-0 flex-1"
            placeholder="Board name"
          />
        ) : (
          <h1 
            className="text-xl sm:text-2xl md:text-title font-outfit cursor-pointer hover:opacity-80 transition-opacity truncate"
            onClick={() => setIsEditingName(true)}
          >
            {localName}
          </h1>
        )}
        
        <button
          onClick={() => setIsEditingName(true)}
          className="flex-shrink-0 p-1 hover:bg-task-gray-light rounded transition-colors"
          title="Edit board name"
        >
          <img 
            src="/icons/Edit_duotone.svg" 
            alt="Edit" 
            className="w-5 h-5 sm:w-6 sm:h-6" 
          />
        </button>
      </div>
      
      {/* Description Row */}
      {isEditingDescription ? (
        <input
          ref={descriptionInputRef}
          type="text"
          value={localDescription}
          onChange={(e) => setLocalDescription(e.target.value)}
          onBlur={handleDescriptionSubmit}
          onKeyDown={handleDescriptionKeyDown}
          className="text-sm sm:text-description text-task-gray bg-transparent border-b-2 border-task-blue 
                     outline-none py-1 w-full ml-10 sm:ml-[52px]"
          placeholder="Add a description"
        />
      ) : (
        <p 
          className="text-sm sm:text-description text-task-gray ml-10 sm:ml-[52px] cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setIsEditingDescription(true)}
        >
          {localDescription || 'Click to add description'}
        </p>
      )}
    </div>
  );
}
