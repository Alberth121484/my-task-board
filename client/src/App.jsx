import { useState } from 'react';
import { 
  Layout, 
  BoardHeader,
  TaskCard,
  Button, 
  Input, 
  TextArea, 
  Modal, 
  IconSelector, 
  StatusSelector 
} from './components';

// Sample tasks data
const SAMPLE_TASKS = [
  {
    id: '1',
    name: 'Task in Progress',
    description: '',
    icon: '⏰',
    status: 'in_progress',
  },
  {
    id: '2',
    name: 'Task Completed',
    description: '',
    icon: '🏆',
    status: 'completed',
  },
  {
    id: '3',
    name: "Task Won't Do",
    description: '',
    icon: '☕',
    status: 'wont_do',
  },
  {
    id: '4',
    name: 'Task To Do',
    description: 'Work on a Challenge on devChallenges.io, learn TypeScript.',
    icon: '📚',
    status: 'todo',
  },
];

function App() {
  // Board state
  const [boardName, setBoardName] = useState('My Task Board');
  const [boardDescription, setBoardDescription] = useState('Tasks to keep organised');
  const [tasks, setTasks] = useState(SAMPLE_TASKS);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState({
    name: '',
    description: '',
    icon: '📝',
    status: 'todo',
  });

  const handleBoardNameChange = (newName) => {
    setBoardName(newName);
    console.log('Board name changed to:', newName);
    // TODO: API call to update board
  };

  const handleBoardDescriptionChange = (newDescription) => {
    setBoardDescription(newDescription);
    console.log('Board description changed to:', newDescription);
    // TODO: API call to update board
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setEditingTask({
      name: task.name,
      description: task.description,
      icon: task.icon,
      status: task.status,
    });
    setIsModalOpen(true);
  };

  const handleAddTask = () => {
    setSelectedTask(null);
    setEditingTask({
      name: 'New Task',
      description: '',
      icon: '📝',
      status: 'todo',
    });
    setIsModalOpen(true);
  };

  const handleSaveTask = () => {
    if (selectedTask) {
      // Update existing task
      setTasks(tasks.map(t => 
        t.id === selectedTask.id 
          ? { ...t, ...editingTask }
          : t
      ));
    } else {
      // Add new task
      const newTask = {
        id: String(Date.now()),
        ...editingTask,
      };
      setTasks([...tasks, newTask]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteTask = () => {
    if (selectedTask) {
      setTasks(tasks.filter(t => t.id !== selectedTask.id));
      setIsModalOpen(false);
    }
  };

  return (
    <Layout>
      {/* Board Header */}
      <BoardHeader
        name={boardName}
        description={boardDescription}
        onNameChange={handleBoardNameChange}
        onDescriptionChange={handleBoardDescriptionChange}
      />

      {/* Task Cards */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => handleTaskClick(task)}
            isSelected={selectedTask?.id === task.id && isModalOpen}
          />
        ))}

        {/* Add New Task Button */}
        <div 
          onClick={handleAddTask}
          className="bg-task-yellow-light p-4 rounded-task flex items-center gap-4 cursor-pointer hover:opacity-90 transition-base"
        >
          <div className="w-12 h-12 rounded-icon flex items-center justify-center bg-task-yellow-dark">
            <img src="/icons/Add_round_duotone.svg" alt="Add" className="w-6 h-6" />
          </div>
          <span className="text-task-title">Add new task</span>
        </div>
      </div>

      {/* Task Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Task details"
      >
        <div className="space-y-5">
          <Input
            label="Task name"
            value={editingTask.name}
            onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
            placeholder="Enter task name"
          />
          
          <TextArea
            label="Description"
            value={editingTask.description}
            onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
            placeholder="Enter a short description"
            rows={3}
          />
          
          <IconSelector
            label="Icon"
            value={editingTask.icon}
            onChange={(icon) => setEditingTask({ ...editingTask, icon })}
          />
          
          <StatusSelector
            label="Status"
            value={editingTask.status}
            onChange={(status) => setEditingTask({ ...editingTask, status })}
          />
          
          <div className="flex justify-end gap-3 pt-4">
            {selectedTask && (
              <Button 
                variant="danger"
                onClick={handleDeleteTask}
              >
                Delete
                <img src="/icons/Trash.svg" alt="Delete" className="w-5 h-5" />
              </Button>
            )}
            <Button 
              variant="primary"
              onClick={handleSaveTask}
            >
              Save
              <img src="/icons/Done_round.svg" alt="Save" className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
}

export default App;
