import { useState } from 'react';
import { Box, Button, Input, Textarea, Stack, Text, Alert } from '@chakra-ui/react';
/* eslint-disable react/prop-types */

function TaskForm({ addTask }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (taskTitle.trim() && taskDescription.trim()) {
      setLoading(true);
      setError(null); // Reiniciar el estado de error

      try {
        const response = await fetch('http://localhost:3000/api/task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: taskTitle,
            description: taskDescription,
          }),
        });

        if (response.ok) {
          const newTask = await response.json();
          addTask(newTask); // Añadir la nueva tarea al listado
          setTaskTitle(''); // Limpiar el campo de título
          setTaskDescription(''); // Limpiar el campo de descripción
        } else {
          const data = await response.json();
          setError(data.message || 'Ocurrió un error al crear la tarea');
        }
      } catch (err) {
        setError('Error de conexión');
      } finally {
        setLoading(false); // Finalizar estado de carga
      }
    } else {
      setError('El título y la descripción son obligatorios');
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md" boxShadow="sm">
      <Text fontSize="xl" fontWeight="bold" mb={4}>Crear Nueva Tarea</Text>

      {error && (
        <Alert status="error" mb={4}>
        
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <fieldset style={{ border: 'none' }}>
          <Stack spacing={4}>
            {/* Título de la tarea */}
            <div>
              <label htmlFor="taskTitle" style={{ display: 'block' }}>Título de la Tarea</label>
              <Input
                id="taskTitle"
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Ingresa el título de la tarea"
                required
              />
            </div>

            {/* Descripción de la tarea */}
            <div>
              <label htmlFor="taskDescription" style={{ display: 'block' }}>Descripción de la Tarea</label>
              <Textarea
                id="taskDescription"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Ingresa una descripción detallada de la tarea"
                required
              />
            </div>

            <Button 
              type="submit" 
              colorScheme="teal" 
              bg="white" 
              isFullWidth 
              isLoading={loading} 
              loadingText="Creando..." 
            >
              Crear Tarea
            </Button>
          </Stack>
        </fieldset>
      </form>
    </Box>
  );
}

export default TaskForm;
