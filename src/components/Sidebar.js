import React from "react";
import Icon from "./Icon";


export default function Sidebar({
  position, setPosition, 
  direction, setDirection, 
  setSpriteMessage, setShowMessage, 
  onDragStart
}) {

  // Moves the cat 10 steps 
  const handleMove = () => {
    setPosition({ ...position, x: position.x + 10 });
  };

  // Moves the cat to a fixed position.
  const handlePosition = () => {
    setPosition({ x: 10, y: 20 });
  };

  // to rotate the cat
  const handleTurnRight = () => {
    setDirection(direction + 15);
  };

  const handleTurnLeft = () => {
    setDirection(direction - 15);
  };

  // to say hello .
  const handleSayHello = () => {
    setSpriteMessage('Hello');
    setShowMessage(true);
  };

  const handleSayHelloForSeconds = () => {
    setSpriteMessage('Hello');
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  // to think Hmmm.
  const handleThinkHmm = () => {
    setSpriteMessage('Hmmmm...');
    setShowMessage(true);
  };

  const handleThinkHmmForSeconds = () => {
    setSpriteMessage('Hmmmm...');
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      {/* Event controls */}
      <div className="font-bold text-orange-600">Events</div>
      <div draggable onDragStart={(e) => onDragStart(e, { action: "whenStartClicked", color: "bg-yellow-500" })}
        className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        When clicked
      </div>

      {/* Control controls */}
      <div className="font-bold text-red-700">Control</div>
      <div draggable onDragStart={(e) => onDragStart(e, { action: "wait1sec", color: "bg-red-300" })}
        className="flex flex-row flex-wrap bg-red-300 text-black px-2 py-1 my-2 text-sm cursor-pointer">
        Wait 1 sec
      </div>

      {/* Motion controls */}
      <div className="font-bold text-blue-600">Motion</div>
      <div draggable onDragStart={(e) => onDragStart(e, { action: "move10Steps", color: "bg-blue-400" })} 
      onClick={handleMove}
        className="flex flex-row flex-wrap bg-blue-400 text-black px-2 py-1 my-2 text-sm cursor-pointer">
        Move 10 steps
      </div>
      <div draggable onDragStart={(e) => onDragStart(e, { action: "goToPosition", color: "bg-blue-400" })} 
       onClick={handlePosition}
        className="flex flex-row flex-wrap bg-blue-400 text-black px-2 py-1 my-2 text-sm cursor-pointer">
        Go to x:10 y:20
      </div>
      <div draggable onDragStart={(e) => onDragStart(e, { action: "move(15)degree", color: "bg-blue-400" })} 
       onClick={handleTurnRight}
        className="flex flex-row flex-wrap bg-blue-400 text-black px-2 py-1 my-2 text-sm cursor-pointer">
        <Icon name="undo" size={15} className="text-white mx-2" />
        Turn 15 degrees
      </div>
      <div draggable onDragStart={(e) => onDragStart(e, { action: "move(-15)degree", color: "bg-blue-400" })}
       onClick={handleTurnLeft}
        className="flex flex-row flex-wrap bg-blue-400 text-black px-2 py-1 my-2 text-sm cursor-pointer">
        <Icon name="redo" size={15} className="text-white mx-2" />
        Turn -15 degrees
      </div>

      {/* Looks controls */}
      <div className="font-bold text-green-600">Looks</div>
      <div draggable onDragStart={(e) => onDragStart(e, { action: "sayHello", color: "bg-green-300" })}
       onClick={handleSayHello}
        className="flex flex-row flex-wrap bg-green-300 text-black px-2 py-1 my-2 text-sm cursor-pointer">
        Say Hello
      </div>
      <div draggable onDragStart={(e) => onDragStart(e, { action: "sayHelloForSeconds", color: "bg-green-300" })}
       onClick={handleSayHelloForSeconds}
        className="flex flex-row flex-wrap bg-green-300 text-black px-2 py-1 my-2 text-sm cursor-pointer">
        Say Hello for 2 seconds
      </div>
      <div draggable onDragStart={(e) => onDragStart(e, { action: "thinkHmm", color: "bg-green-300" })}
       onClick={handleThinkHmm}
        className="flex flex-row flex-wrap bg-green-300 text-black px-2 py-1 my-2 text-sm cursor-pointer">
        think hmmm
      </div>
      <div draggable onDragStart={(e) => onDragStart(e, { action: "thinkHmmForSeconds", color: "bg-green-300" })}
       onClick={handleThinkHmmForSeconds}
        className="flex flex-row flex-wrap bg-green-300 text-black px-2 py-1 my-2 text-sm cursor-pointer">
        think hmmm for 2 seconds
      </div>
    </div>
  );
}
