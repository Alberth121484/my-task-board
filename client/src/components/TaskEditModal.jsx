import { useState, useEffect } from 'react';
import { useBoardStore, useToastStore } from '../store';
import Modal from './Modal';
import Input from './Input';
import TextArea from './TextArea';
import Button from './Button';
import IconSelector from './IconSelector';
import StatusSelector from './StatusSelector';

/**
 * Default task state for new tasks
 */
const DEFAULT_TASK = {
  name: 'New Task',
  description: '',
  icon: '📝',
  status: 'todo',
};

/**
 * TaskEditModal component - Modal for creating and editing tasks
 * Uses Zustand store for state management
 */
export default function TaskEditModal() {
  const {
    selectedTask,
    isModalOpen,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    closeModal,
  } = useBoardStore();
  
  const toast = useToastStore();

  // Local form state
  const [formData, setFormData] = useState(DEFAULT_TASK);
  const [isSaving, setIsSaving] = useState(false);

  // Update form when selectedTask changes
  useEffect(() => {
    if (selectedTask) {
      setFormData({
        name: selectedTask.name || '',
        description: selectedTask.description || '',
        icon: selectedTask.icon || '📝',
        status: selectedTask.status || 'todo',
      });
    } else {
      setFormData(DEFAULT_TASK);
    }
  }, [selectedTask, isModalOpen]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error('Task name is required');
      return;
    }

    setIsSaving(true);
    try {
      if (selectedTask) {
        await updateTask(selectedTask.id, formData);
        toast.success('Task updated successfully');
      } else {
        await addTask(formData);
        toast.success('Task created successfully');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to save task');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedTask) return;

    setIsSaving(true);
    try {
      await deleteTask(selectedTask.id);
      toast.success('Task deleted');
    } catch (error) {
      toast.error(error.message || 'Failed to delete task');
    } finally {
      setIsSaving(false);
    }
  };

  const isEditing = !!selectedTask;

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      title="Task details"
    >
      <div className="space-y-5">
        {/* Task Name */}
        <Input
          label="Task name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Enter task name"
          disabled={isSaving}
        />

        {/* Description */}
        <TextArea
          label="Description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Enter a short description"
          rows={3}
          disabled={isSaving}
        />

        {/* Icon Selector */}
        <IconSelector
          label="Icon"
          value={formData.icon}
          onChange={(icon) => handleChange('icon', icon)}
        />

        {/* Status Selector */}
        <StatusSelector
          label="Status"
          value={formData.status}
          onChange={(status) => handleChange('status', status)}
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          {isEditing && (
            <Button
              variant="danger"
              onClick={handleDelete}
              disabled={isSaving}
            >
              Delete
              <img src="/icons/Trash.svg" alt="Delete" className="w-5 h-5" />
            </Button>
          )}
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={isSaving || !formData.name.trim()}
          >
            {isSaving ? 'Saving...' : 'Save'}
            {!isSaving && (
              <img src="/icons/Done_round.svg" alt="Save" className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
