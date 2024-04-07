import React, { useState, useCallback, useRef } from "react";
import CatSprite from "./CatSprite";

export default function PreviewArea({direction, setDirection, position, setPosition, spriteMessage, showMessage }) {
  const[size, setSize] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const [visible, setVisible] = useState(true);

  const containerRef = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const initialPosition = useRef({ x: position.x, y: position.y });

  const onMouseDown = useCallback((event) => {
    setIsDragging(true);
    const containerBox = containerRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: event.clientX - containerBox.left - position.x,
      y: event.clientY - containerBox.top - position.y,
    };
    event.preventDefault();
  }, [position]);

  const onMouseMove = useCallback(
    (event) => {
      if (isDragging) {
        const containerBox = containerRef.current.getBoundingClientRect();
        setPosition({
          x: event.clientX - containerBox.left - dragOffset.current.x,
          y: event.clientY - containerBox.top - dragOffset.current.y,
        });
      }
    },
    [isDragging, setPosition]
  );

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
    const containerBox = containerRef.current.getBoundingClientRect();
    if (position.x < 0 || position.y < 0 ||
        position.x > containerBox.width || position.y > containerBox.height) {
      setPosition({ x: initialPosition.current.x, y: initialPosition.current.y });
    }
  }, [position, setPosition]);

  // to style the looks functionalities
  const messageStyles = {
    hello: {
      position: 'absolute',
      left: `${position.x + 90}px`, 
      top: `${position.y}px`,
      background: 'none',
      border: 'none'
    },
    hmm: {
      position: 'absolute',
      left: `${position.x + 80}px`,
      top: `${position.y}px`,
      background: '#f8f8f8',
      border: '1px solid black',
      padding: '4px 8px',
      borderRadius: '10px'
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div
        ref={containerRef}
        className="flex-grow bg-white rounded-xl mb-2 mx-2 relative"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseUp}
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {/* looks message shown */}
         {showMessage && (
          <div style={spriteMessage === 'Hello' ? messageStyles.hello : messageStyles.hmm}>
            {spriteMessage}
          </div>
        )}
        <div
          style={{
            position: 'absolute',
            left: `${position.x}px`,
            top: `${position.y}px`,
            cursor: isDragging ? 'grabbing' : 'grab',
            opacity: visible ? 1 : 0.5,
            transform: `scale(${size / 100}) rotate(${direction}deg)`
          }}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          <CatSprite x={position.x} y={position.y} size={size} direction={direction} visible={visible} />
        </div>
      </div>
      <div className="h-1/4 rounded-xl mx-2 bg-white">
        <div className="flex flex-wrap">
          <Control label="X" value={position.x} onChange={(newValue) => setPosition(prev => ({ ...prev, x: newValue }))} />
          <Control label="Y" value={position.y} onChange={(newValue) => setPosition(prev => ({ ...prev, y: newValue }))} />
          <Control label="Size" value={size} onChange={setSize} />
          <Control label="Direction" value={direction} onChange={setDirection} />
          <VisibilityControl label="Visible" checked={visible} onChange={setVisible} />
        </div>
      </div>
    </div>
  );
}

function Control({ label, value, onChange }) {
  return (
    <label className="block p-2">
      {label} :
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
        className="m-3 w-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
    </label>
  );
}

function VisibilityControl({ label, checked, onChange }) {
  return (
    <label className="flex items-center p-2">
      {label}:
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="m-3 rounded text-indigo-600 focus:ring-indigo-500"
      />
    </label>
  );
}
