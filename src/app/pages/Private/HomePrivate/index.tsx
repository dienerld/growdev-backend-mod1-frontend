import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Box } from '@mui/material';

import { useAppSelector } from '@redux/hooks';
import { selectorTasks } from '@redux/modules/tasks';

import { NoTask } from '../components/NoTask';
import { NewTask } from '../components/NewTask';
import { Task } from '../components/Task';

export function HomePrivate() {
  const [loading, setLoading] = useState(true);
  const tasks = useAppSelector(selectorTasks.selectAll);

  useEffect(() => {
    setLoading(false);
  }, [tasks]);

  return (
    <Box className="mt-10">
      {loading && <div>Loading</div>}
      {!loading && tasks.length === 0 && (<NoTask />)}
      {!loading && tasks.length > 0 && (
        <Box className="flex flex-col gap-4 mx-2 sm:mx-8">
          {tasks.map((task) => <Task key={task.id} task={task} />)}
        </Box>
      )}
      <Link to="/auth/profile">New Task</Link>
      {/* float button  */}
      <NewTask />
    </Box>
  );
}
