import  { useState } from 'react';
import { Box,Heading } from '@chakra-ui/react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';


function App() {
  const [tasks, setTasks] = useState([]); // Estado para almacenar las tareas

  // Función para agregar una nueva tarea
  const addTask = (title,description) => {
    const newTask = {
      id: Date.now(), // Generamos un ID único para cada tarea
      title,
      description,
      completed: false, // Inicialmente las tareas no están completadas
      createdAt: new Date(), // Fecha de creación
    };
    setTasks((prevTasks) => [...prevTasks, newTask]); // Agregamos la nueva tarea al estado
  };

  return (
    <Box p={4}>
      <Heading mb={4} textAlign="center">
        Lista de Tareas
      </Heading>
      <TaskForm addTask={addTask} /> {/* Formulario para agregar tarea */}
      <TaskList tasks={tasks}/> {/*Mostramos las tareas en la lista */}
    </Box>
  );
}

export default App;
