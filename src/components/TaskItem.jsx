import PropTypes from 'prop-types';
import { Box, Button, Text, HStack } from '@chakra-ui/react';
/* eslint-disable react/prop-types */

function TaskItem({ task, deleteTask, toggleTaskCompletion }) {
  return (
    <HStack
      bg={task.completed ? 'green.100' : 'red.100'}
      p={4}
      borderRadius="md"
      justify="space-between"
    >
      <Box>
        <Text fontWeight="bold">{task.title}</Text>
        <Text fontWeight="bold">{task.description}</Text>
        <Text fontSize="sm" color="gray.600">
          Creada: {new Date(task.createdAt).toLocaleDateString()}
        </Text>
      </Box>
      <HStack>
        <Button
          colorScheme={task.completed ? 'yellow' : 'green'}
          onClick={() => toggleTaskCompletion(task.id)}
        >
          {task.completed ? 'Marcar como pendiente' : 'Completar'}
        </Button>
        <Button colorScheme="red" onClick={() => deleteTask(task.id)}>
          Eliminar
        </Button>
      </HStack>
    </HStack>
  );
}

// Validación de props
TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTaskCompletion: PropTypes.func.isRequired,
};

export default TaskItem;
