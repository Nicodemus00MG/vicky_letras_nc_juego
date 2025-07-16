import React, { useState } from 'react';
import { Star, Heart, Sparkles, RotateCcw, Trophy, Smile } from 'lucide-react';

const App = () => {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('¡Muy bien! ⭐');

  // Datos constantes
  const palabrasN = [
    { palabra: 'NUBE', imagen: '☁️', color: '#87CEEB' },
    { palabra: 'NIDO', imagen: '🪺', color: '#8B4513' },
    { palabra: 'NARIZ', imagen: '👃', color: '#FFB6C1' },
    { palabra: 'NIEVE', imagen: '❄️', color: '#F0F8FF' }
  ];

  const palabrasC = [
    { palabra: 'CASA', imagen: '🏠', color: '#FF6B6B' },
    { palabra: 'CORAZÓN', imagen: '❤️', color: '#FF1493' },
    { palabra: 'CABALLO', imagen: '🐎', color: '#DEB887' },
    { palabra: 'CORONA', imagen: '👑', color: '#FFD700' }
  ];

  const celebrate = (message = '¡Muy bien! ⭐') => {
    setScore(score + 1);
    setCelebrationMessage(message);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 1500);
  };

  // ========== ACTIVIDAD 1: Clasificación ==========
  const [availableLetters, setAvailableLetters] = useState([
    { letter: 'N', id: 1 }, { letter: 'C', id: 2 }, { letter: 'n', id: 3 }, 
    { letter: 'c', id: 4 }, { letter: 'N', id: 5 }, { letter: 'C', id: 6 }
  ]);
  const [nBox, setNBox] = useState([]);
  const [cBox, setCBox] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);

  const resetActivity1 = () => {
    setAvailableLetters([
      { letter: 'N', id: 1 }, { letter: 'C', id: 2 }, { letter: 'n', id: 3 }, 
      { letter: 'c', id: 4 }, { letter: 'N', id: 5 }, { letter: 'C', id: 6 }
    ]);
    setNBox([]);
    setCBox([]);
  };

  const handleDrop = (box) => {
    if (!draggedItem) return;
    
    if (box === 'N' && (draggedItem.letter === 'N' || draggedItem.letter === 'n')) {
      setNBox([...nBox, draggedItem]);
      setAvailableLetters(availableLetters.filter(item => item.id !== draggedItem.id));
      celebrate('¡Excelente! Letra N correcta 🎉');
    } else if (box === 'C' && (draggedItem.letter === 'C' || draggedItem.letter === 'c')) {
      setCBox([...cBox, draggedItem]);
      setAvailableLetters(availableLetters.filter(item => item.id !== draggedItem.id));
      celebrate('¡Fantástico! Letra C correcta 🎉');
    }
    setDraggedItem(null);
  };

  // ========== ACTIVIDAD 2: Memoria Simplificada ==========
  const [memoryCards] = useState(() => {
    const cards = [...palabrasN.slice(0, 3), ...palabrasC.slice(0, 3)];
    return [...cards, ...cards].sort(() => Math.random() - 0.5).map((card, index) => ({ ...card, id: index }));
  });
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const handleCardClick = (cardId) => {
    if (flippedCards.length === 2 || flippedCards.includes(cardId) || matchedCards.includes(cardId)) {
      return;
    }

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const card1 = memoryCards[newFlipped[0]];
      const card2 = memoryCards[newFlipped[1]];
      
      if (card1.palabra === card2.palabra) {
        setMatchedCards([...matchedCards, ...newFlipped]);
        celebrate('¡Pareja encontrada! 🎊');
      }
      
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  // ========== ACTIVIDAD 3: Construcción de palabras ==========
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState([]);
  
  // CORREGIDO: Agregadas todas las letras necesarias incluyendo V, L, Ó
  const [wordAvailableLetters, setWordAvailableLetters] = useState([
    { letter: 'N', id: 1 }, { letter: 'U', id: 2 }, { letter: 'B', id: 3 }, 
    { letter: 'E', id: 4 }, { letter: 'C', id: 5 }, { letter: 'A', id: 6 }, 
    { letter: 'S', id: 7 }, { letter: 'O', id: 8 }, { letter: 'R', id: 9 }, 
    { letter: 'Z', id: 10 }, { letter: 'D', id: 11 }, { letter: 'I', id: 12 },
    { letter: 'V', id: 13 }, { letter: 'L', id: 14 }, { letter: 'L', id: 15 }, 
    { letter: 'Ó', id: 16 }, { letter: 'E', id: 17 }, { letter: 'A', id: 18 }
  ]);

  const allWords = [...palabrasN, ...palabrasC];
  const currentWord = allWords[currentWordIndex];

  const resetLetterPool = () => {
    setWordAvailableLetters([
      { letter: 'N', id: Math.random() }, { letter: 'U', id: Math.random() }, 
      { letter: 'B', id: Math.random() }, { letter: 'E', id: Math.random() }, 
      { letter: 'C', id: Math.random() }, { letter: 'A', id: Math.random() }, 
      { letter: 'S', id: Math.random() }, { letter: 'O', id: Math.random() },
      { letter: 'R', id: Math.random() }, { letter: 'Z', id: Math.random() },
      { letter: 'D', id: Math.random() }, { letter: 'I', id: Math.random() },
      { letter: 'V', id: Math.random() }, { letter: 'L', id: Math.random() },
      { letter: 'L', id: Math.random() }, { letter: 'Ó', id: Math.random() },
      { letter: 'E', id: Math.random() }, { letter: 'A', id: Math.random() }
    ]);
  };

  const handleLetterSelect = (letterObj) => {
    const newSelected = [...selectedLetters, letterObj];
    setSelectedLetters(newSelected);
    setWordAvailableLetters(wordAvailableLetters.filter(item => item.id !== letterObj.id));
    
    if (newSelected.length === currentWord.palabra.length) {
      const formed = newSelected.map(item => item.letter).join('');
      if (formed === currentWord.palabra) {
        celebrate('¡Palabra completada! 🌟');
        setTimeout(() => {
          setSelectedLetters([]);
          setCurrentWordIndex((currentWordIndex + 1) % allWords.length);
          resetLetterPool();
        }, 1500);
      }
    }
  };

  const removeLastLetter = () => {
    if (selectedLetters.length > 0) {
      const removedLetter = selectedLetters[selectedLetters.length - 1];
      setSelectedLetters(selectedLetters.slice(0, -1));
      setWordAvailableLetters([...wordAvailableLetters, removedLetter]);
    }
  };

  const resetActivity3 = () => {
    setSelectedLetters([]);
    setCurrentWordIndex(0);
    resetLetterPool();
  };

  // ========== ACTIVIDAD 4: Encuentra la letra ==========
  const [targetLetter, setTargetLetter] = useState('N');
  const [foundLetters, setFoundLetters] = useState([]);
  const textWithLetters = "La NUBE está en el cielo azul y la CASA tiene un CORAZÓN en la puerta";

  const handleLetterClick = (char, index) => {
    if (char.toUpperCase() === targetLetter && !foundLetters.includes(index)) {
      setFoundLetters([...foundLetters, index]);
      celebrate(`¡Encontraste la ${targetLetter}! 🎯`);
      if (foundLetters.length + 1 === 3) {
        setTimeout(() => {
          setTargetLetter(targetLetter === 'N' ? 'C' : 'N');
          setFoundLetters([]);
        }, 1500);
      }
    }
  };

  const resetActivity4 = () => {
    setTargetLetter('N');
    setFoundLetters([]);
  };

  const activities = [
    // Actividad 1
    <div className="bg-gradient-to-br from-pink-200 to-purple-200 p-6 rounded-3xl" key="1">
      <h2 className="text-2xl font-bold text-center mb-4 text-purple-800">
        <Sparkles className="inline mr-2" />
        ¡Clasifica las letras!
      </h2>
      <div className="flex justify-center gap-8 mb-6">
        <div 
          className="w-32 h-32 bg-blue-300 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg relative"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop('N')}
        >
          N
          <div className="absolute mt-20 text-sm text-gray-600">
            {nBox.map((item, index) => (
              <span key={index} className="inline-block mx-1 text-blue-800">{item.letter}</span>
            ))}
          </div>
        </div>
        <div 
          className="w-32 h-32 bg-red-300 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg relative"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop('C')}
        >
          C
          <div className="absolute mt-20 text-sm text-gray-600">
            {cBox.map((item, index) => (
              <span key={index} className="inline-block mx-1 text-red-800">{item.letter}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {availableLetters.map((letterObj) => (
          <div
            key={letterObj.id}
            draggable
            onDragStart={() => setDraggedItem(letterObj)}
            className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center text-2xl font-bold cursor-move hover:bg-yellow-400 shadow-md"
          >
            {letterObj.letter}
          </div>
        ))}
      </div>
      <div className="text-center">
        <button onClick={resetActivity1} className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600">
          Reiniciar
        </button>
      </div>
    </div>,

    // Actividad 2
    <div className="bg-gradient-to-br from-green-200 to-blue-200 p-6 rounded-3xl" key="2">
      <h2 className="text-2xl font-bold text-center mb-4 text-green-800">
        <Heart className="inline mr-2" />
        ¡Encuentra las parejas!
      </h2>
      <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
        {memoryCards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            className={`w-16 h-16 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center text-2xl font-bold shadow-lg ${
              flippedCards.includes(index) || matchedCards.includes(index)
                ? 'bg-white'
                : 'bg-gradient-to-br from-purple-400 to-pink-400'
            }`}
          >
            {(flippedCards.includes(index) || matchedCards.includes(index)) ? card.imagen : '?'}
          </div>
        ))}
      </div>
    </div>,

    // Actividad 3
    <div className="bg-gradient-to-br from-orange-200 to-yellow-200 p-6 rounded-3xl" key="3">
      <h2 className="text-2xl font-bold text-center mb-4 text-orange-800">
        <Trophy className="inline mr-2" />
        ¡Forma la palabra!
      </h2>
      <div className="text-center mb-6">
        <div className="text-6xl mb-2">{currentWord.imagen}</div>
        <div className="text-2xl font-bold" style={{ color: currentWord.color }}>
          {currentWord.palabra}
        </div>
      </div>
      <div className="flex justify-center gap-2 mb-6">
        {Array.from({ length: currentWord.palabra.length }).map((_, index) => (
          <div key={index} className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-xl font-bold border-2 border-gray-300">
            {selectedLetters[index] ? selectedLetters[index].letter : ''}
          </div>
        ))}
      </div>
      <div className="flex justify-center mb-4">
        <button
          onClick={removeLastLetter}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow-lg"
        >
          Borrar Última Letra
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
        {wordAvailableLetters.map((letterObj) => (
          <button
            key={letterObj.id}
            onClick={() => handleLetterSelect(letterObj)}
            className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-400 text-white rounded-lg font-bold hover:from-teal-500 hover:to-blue-500 shadow-md"
          >
            {letterObj.letter}
          </button>
        ))}
      </div>
      <div className="text-center mt-4">
        <button
          onClick={resetActivity3}
          className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 shadow-lg"
        >
          Reiniciar Actividad
        </button>
      </div>
    </div>,

    // Actividad 4
    <div className="bg-gradient-to-br from-red-200 to-pink-200 p-6 rounded-3xl" key="4">
      <h2 className="text-2xl font-bold text-center mb-4 text-red-800">
        <Smile className="inline mr-2" />
        ¡Encuentra la letra {targetLetter}!
      </h2>
      <div className="text-center mb-4">
        <div className="inline-block bg-white rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold shadow-lg">
          {targetLetter}
        </div>
      </div>
      <div className="text-lg leading-relaxed max-w-2xl mx-auto mb-4">
        {textWithLetters.split('').map((char, index) => (
          <span
            key={index}
            onClick={() => handleLetterClick(char, index)}
            className={`cursor-pointer transition-all ${
              foundLetters.includes(index) ? 'bg-green-300 text-white rounded px-1' : 
              char.toUpperCase() === targetLetter ? 'hover:bg-yellow-200' : ''
            }`}
          >
            {char}
          </span>
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={resetActivity4}
          className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 shadow-lg"
        >
          Reiniciar Actividad
        </button>
      </div>
    </div>
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4">
      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-3xl font-bold px-8 py-4 rounded-3xl shadow-2xl">
            {celebrationMessage}
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-purple-800 mb-2">
          Letras N y C - ¡Vamos a jugar!
        </h1>
        <div className="flex justify-center items-center gap-4 mb-4">
          <div className="bg-white rounded-full px-4 py-2 shadow-lg">
            <Star className="inline text-yellow-500 mr-2" />
            Puntos: {score}
          </div>
          <button
            onClick={() => setScore(0)}
            className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 shadow-lg"
          >
            <RotateCcw className="inline mr-2" />
            Reiniciar
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-2 mb-6">
        {activities.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentActivity(index)}
            className={`w-12 h-12 rounded-full font-bold shadow-lg transition-all ${
              currentActivity === index
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="max-w-4xl mx-auto">
        {activities[currentActivity]}
      </div>

      <div className="text-center mt-6 text-gray-600">
        <p className="text-sm">
          {currentActivity === 0 && "Arrastra las letras N y n al círculo azul, y las C y c al círculo rojo"}
          {currentActivity === 1 && "Haz clic en las cartas para encontrar las parejas iguales"}
          {currentActivity === 2 && "Haz clic en las letras para formar la palabra de la imagen"}
          {currentActivity === 3 && "Busca y haz clic en todas las letras que se muestran arriba"}
        </p>
      </div>
    </div>
  );
};

export default App;