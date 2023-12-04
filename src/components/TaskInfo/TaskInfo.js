import "./TaskInfo.css";

const TaskInfo = (props) => {
  const completedTasksAmount = props.tasks.filter((task) => task.done).length;
  const tasksAmount = props.tasks.length;
  const getMessageText = () => {
    const percentage = completedTasksAmount / tasksAmount;
    if (percentage === 0) {
      return "DO AT LEAST ONE!";
    } else if (percentage === 1) {
      return "GREAT JOB!";
    } else if (percentage === 0.5) {
      return "YOU ARE HALFWAY HERE!";
    }
    return "KEEP GOING!";
  };

  return (
    <div className="task-info">
      <h2 className="task-info-completed">
        {completedTasksAmount}/{tasksAmount} Complete
      </h2>
      <h3 className="task-info-message">{getMessageText()}</h3>
    </div>
  );
};

export default TaskInfo;
