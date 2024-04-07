import React from "react";

function MidArea({ list, onItemDropped, executeAction, startActions, stopActions, onItemDeleted, setPosition, setDirection }) {
  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    const item = JSON.parse(data);
    onItemDropped(item);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDelete = (indexToDelete) => {
    onItemDeleted(indexToDelete);
  };
  // to reset the catsprit to its starting position
  const onResetPosition = () => {
    setPosition({ x: 0, y: 0 });
    setDirection(0);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="flex-1 h-full overflow-auto relative"
    >
      {list.map((item, index) => (
        <div key={index} className="flex justify-between items-center my-2">
          <div className={`${item.color} text-black px-2 py-1 text-sm cursor-pointer flex-grow`}>
            {item.action}
          </div>
          <button
            onClick={() => handleDelete(index)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
          >
            Delete
          </button>
        </div>
      ))}
      {list.length > 0 && (
        <div className="absolute bottom-0 right-0 m-4 flex space-x-2">
          <button onClick={startActions} className="px-4 py-2 bg-blue-500 text-white rounded">
            Start
          </button>
          <button onClick={stopActions} className="px-4 py-2 bg-red-500 text-white rounded">
            Stop
          </button>
          <div >
            <button onClick={onResetPosition} className="px-4 py-2 bg-green-500 text-white rounded">
              Reset 
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MidArea;
