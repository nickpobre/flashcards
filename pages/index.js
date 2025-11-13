"use client";
import { useEffect, useState } from "react";

export default function Flashcards() {
  const initialData = [
    { front: "Erro", back: "<strong>Definição:</strong> Ação humana..." },
    { front: "Defeito (Bug)", back: "<strong>Definição:</strong> A materialização do erro..." },
    { front: "Falha", back: "<strong>Definição:</strong> A execução do defeito..." },
    { front: "Verificação", back: "<strong>Pergunta:</strong> Estamos construindo o produto certo?" },
    { front: "Validação", back: "<strong>Pergunta:</strong> Estamos construindo o produto da forma certa?" },
    { front: "Teste de Caixa Preta", back: "<strong>O quê testa?</strong> O 'O QUÊ'..." },
    { front: "Teste de Caixa Branca", back: "<strong>O quê testa?</strong> O 'COMO'..." },
    { front: "Controle de Versão (Git)", back: "<strong>Analogia:</strong> Uma 'máquina do tempo'..." },
    { front: "Branches (Ramos)", back: "<strong>Definição:</strong> Cópias de trabalho..." },
    { front: "Merge (Fusão)", back: "<strong>Definição:</strong> O ato de reintegrar..." },
    { front: "Conflito de Merge", back: "<strong>Quando ocorre?</strong> Quando a mesma linha..." },
    { front: "Análise de Impacto (GCS)", back: "<strong>O quê avalia?</strong> 'O que quebra? Quanto custa?'" },
    { front: "Priorização de Risco", back: "<strong>Como fazer?</strong> Usando a Matriz de Risco..." },
    { front: "Plano de Mitigação", back: "<strong>Tipo:</strong> Proativo..." },
    { front: "Plano de Contingência", back: "<strong>Tipo:</strong> Reativo ('Plano B')" },
  ];

  const [cards, setCards] = useState(initialData);
  const [deck, setDeck] = useState([]);
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [visibleControls, setVisibleControls] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);

  const shuffle = (arr) => {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const buildDeck = (cards) => {
    const newDeck = [];
    cards.forEach((c, i) => {
      const w = c.weight || 2;
      for (let j = 0; j < w; j++) newDeck.push(i);
    });
    return shuffle(newDeck);
  };

  useEffect(() => {
    const newDeck = buildDeck(initialData);
    setDeck(newDeck);
    setCurrentCard(initialData[newDeck[0]]);
  }, []);

  const next = () => {
    setFlipped(false);
    setVisibleControls(false);
    const nextPos = pos + 1;

    if (nextPos >= deck.length) {
      const rebuilt = buildDeck(cards);
      setDeck(rebuilt);
      setPos(0);
      setCurrentCard(cards[rebuilt[0]]);
    } else {
      setPos(nextPos);
      setCurrentCard(cards[deck[nextPos]]);
    }
  };

  const handleCorrect = () => {
    const idx = deck[pos];
    const updated = [...cards];
    updated[idx].weight = Math.max(1, (updated[idx].weight || 2) - 1);
    setCards(updated);
    next();
  };

  const handleWrong = () => {
    const idx = deck[pos];
    const updated = [...cards];
    updated[idx].weight = Math.min(5, (updated[idx].weight || 2) + 2);
    setCards(updated);
    next();
  };

  if (!currentCard) return <p>Carregando...</p>;

  return (
    <main className="w-full flex flex-col items-center">
      <h1>Flashcards: Qualidade de Software</h1>
      <div
        className={`relative w-full h-[400px] transition-transform duration-500 [transform-style:preserve-3d] cursor-pointer ${flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        onClick={() => {
          setFlipped(!flipped);
          setVisibleControls(!flipped);
        }}
      >
        <div className="w-full absolute inset-0 flex flex-col items-center justify-center bg-[#2d2d2d] border-2 border-sky-400 rounded-xl p-8 text-center [backface-visibility:hidden]">
          <h2 className="font-[Poppins] text-2xl text-sky-400">{currentCard.front}</h2>
          <p className="mt-3 text-gray-300 opacity-70">(Clique para virar)</p>
        </div>

        <div
          className="w-full absolute inset-0 flex flex-col items-center justify-center bg-emerald-400 text-[#111] rounded-xl p-8 text-lg text-center [transform:rotateY(180deg)] [backface-visibility:hidden]"
          dangerouslySetInnerHTML={{ __html: currentCard.back }}
        ></div>
      </div>

      <p className="mt-5 text-lg font-semibold">
        Revisão {pos + 1} de {deck.length}
      </p>

      <div
        className={`mt-6 flex gap-4 transition-opacity duration-300 ${visibleControls ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <button
          onClick={handleWrong}
          className="flex items-center gap-2 bg-red-400 hover:bg-red-500 text-white font-[Poppins] font-semibold px-5 py-3 rounded-lg transition-transform hover:-translate-y-1"
        >
          <i className="fa-solid fa-times"></i> Errei
        </button>
        <button
          onClick={handleCorrect}
          className="flex items-center gap-2 bg-emerald-400 hover:bg-emerald-500 text-[#111] font-[Poppins] font-semibold px-5 py-3 rounded-lg transition-transform hover:-translate-y-1"
        >
          <i className="fa-solid fa-check"></i> Acertei!
        </button>
      </div>
    </main>
  );
}
