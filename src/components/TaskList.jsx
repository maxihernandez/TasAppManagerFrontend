import { useState, useEffect } from 'react';
import { Box, Stack, Text, Button } from '@chakra-ui/react';

import axios from 'axios';

/* eslint-disable react/prop-types */

function TaskList() {
  // Estado para almacenar las tareas
  const [tasks, setTasks] = useState([]);

  // Fetch las tareas desde la API cuando el componente se monta
  useEffect(() => {
    // URL de tu API donde se obtienen las tareas (ajusta esto con tu URL)
    axios.get('http://localhost:3000/api/task') // Ajusta la URL de tu API
      .then((response) => {
        setTasks(response.data); // Guardamos las tareas en el estado
      })
      .catch((error) => {
        console.error('Error al obtener tareas:', error);
      });
  }, []); // El array vacío asegura que la llamada se haga solo una vez cuando el componente se monte

  // Función para eliminar tarea
  const deleteTask = (taskId) => {
    axios.delete(`http://localhost:3000/api/task/${taskId}`)
      .then(() => {
        
        setTasks(tasks.filter(task => task.id !== taskId)); // Filtramos la tarea eliminada
      })
      .catch((error) => {
        console.error('Error al eliminar tarea:', error);
      });
  };

  // Función para marcar tarea como completada
  const toggleTaskCompletion = (taskId) => {
    const updatedData = {};
    updatedData._id = taskId;
    updatedData.completed = true
    // const task = tasks.find(task => task.id === taskId);
    axios.put(`http://localhost:3000/api/task/${taskId}`,updatedData)
    .then(() => {
      setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
    })
    .catch((error) => {
      console.error('Error al actualizar tarea:', error);
    });
  };

  // Función para editar tarea (si decides implementarlo más tarde)
  const editTask = (taskId, newdescription) => {
  
    const updatedData = {};
    updatedData.description = newdescription;
    
    axios.put(`http://localhost:3000/api/task/${taskId}`, updatedData)
      .then(() => {
        setTasks(tasks.map(task => task._id === taskId ? { ...task, updatedData } : task));
      })
      .catch((error) => {
        console.error('Error al editar tarea:', error);
      });
  };

  return (
    <Box mt={4}>
      {tasks.length === 0 ? (
        <Text>No hay tareas para mostrar</Text>
      ) : (
        <Stack spacing={3}>
          {tasks.map((task) => (
            <Box key={task._id} p={4} borderWidth={1} borderRadius="md" boxShadow="sm">
              <Text fontSize="lg" fontWeight="bold">{task.title}</Text>
              <Text fontSize="lg">{task.description}</Text>
              <Text fontSize="sm" color="gray.500">
                Creada el: {new Date(task.createdAt).toLocaleDateString()}
              </Text>
              <Text fontSize="md" color={task.completed ? 'green' : 'red'}>
                {task.completed ? 'Completada' : 'Pendiente'}
              </Text>
              <Stack direction="row" spacing={4} mt={2}>
              {!task.completed && (
                  <Button 
                    colorScheme="blue" 
                    bg="white"  
                    onClick={() => toggleTaskCompletion(task._id)}>
                    Marcar Completada
                  </Button>
                )}
                <Button 
                  colorScheme="yellow" 
                  bg="white" 
                  onClick={() => editTask(task._id, prompt('Nueva descripción', task.description))}>
                  Editar
                </Button>
                <Button 
                  colorScheme="red" 
                  bg="white" 
                  onClick={() => deleteTask(task._id)}>
                  Eliminar
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default TaskList;
