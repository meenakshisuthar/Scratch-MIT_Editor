import React, { useState, useRef } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState(0);
  const [spriteMessage, setSpriteMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [list, setList] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const timeoutIds = useRef([]);

  // drag and drop function of midarea
  const handleDropItem = (item) => {
    setList((prevItems) => [...prevItems, item]);
  };

  const onDragStart = (event, item) => {
    const data = JSON.stringify(item);
    event.dataTransfer.setData("text/plain", data);
    event.dataTransfer.effectAllowed = 'move';
  };
  
  // execution code when the start button is clicked 
  const executeAction = (action) => {
    if (!isRunning) return; 
    switch(action) {
        case "move10Steps":
            setPosition(prev => ({ ...prev, x: prev.x + 10 }));
            break;
        case "goToPosition":
            setPosition({ x: 10, y: 20 });
            break;
        case "move(15)degree":
            setDirection(prev => prev + 15);
            break;
        case "move(-15)degree":
            setDirection(prev => prev - 15);
            break;
        case "sayHello":
        case "sayHelloForSeconds":
            setSpriteMessage('Hello');
            setShowMessage(true);
            if (action === "sayHelloForSeconds") {
                const timeout = setTimeout(() => setShowMessage(false), 2000);
                timeoutIds.current.push(timeout);
            }
            break;
        case "thinkHmm":
        case "thinkHmmForSeconds":
            setSpriteMessage('Hmmm...');
            setShowMessage(true);
            if (action === "thinkHmmForSeconds") {
                const timeout = setTimeout(() => setShowMessage(false), 2000);
                timeoutIds.current.push(timeout);
            }
            break;
        case "whenStartClicked":
            setIsRunning(true); // set the lopp to start
            startActions();
            break;
        default:
            console.log(`Unhandled action type: ${action}`);
    }
};
const startActions = () => {
  setIsRunning(true);
  list.forEach((item, index) => {
     // given delay in each action
      const delay = index * 1000;  
      const timeout = setTimeout(() => executeAction(item.action), delay);
      timeoutIds.current.push(timeout);
  });
};

const stopActions = () => {
  setIsRunning(false);
  timeoutIds.current.forEach(clearTimeout);
  timeoutIds.current = [];
};

  const onItemDeleted = (indexToDelete) => {
    // filter the item to delete
    setList((currentList) => currentList.filter((item, index) => index !== indexToDelete));
  };

  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row">
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <Sidebar 
            direction={direction} 
            setDirection={setDirection} 
            position={position} 
            setPosition={setPosition} 
            setSpriteMessage={setSpriteMessage} 
            setShowMessage={setShowMessage} 
            onDragStart={onDragStart} 
          /> 
          <MidArea 
            list={list} 
            setPosition={setPosition}
            setDirection={setDirection} 
            onItemDropped={handleDropItem} 
            executeAction={executeAction} 
            startActions={startActions}
            stopActions={stopActions}
            onItemDeleted={onItemDeleted}
          />
        </div>
        <div className="w-1/3 h-full overflow-hidden">
          <PreviewArea 
            direction={direction} 
            setDirection={setDirection} 
            position={position} 
            setPosition={setPosition} 
            spriteMessage={spriteMessage}
            showMessage={showMessage} 
          />     
        </div>
      </div>
    </div>
  );
}
