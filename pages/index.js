"use client";
import { useEffect, useState } from "react";

export default function Flashcards() {
  const initialData = [
    // Aula 9: Teste de Software
    {
      front: "Erro",
      back: "<strong>Definição:</strong> Ação incorreta realizada por um desenvolvedor, analista ou usuário. É um engano humano. <strong>Exemplo:</strong> Esquecer de validar o campo de e-mail."
    },
    {
      front: "Defeito (Bug)",
      back: "<strong>Definição:</strong> Imperfeição no código, documento ou design causada por um erro. É a materialização do erro no código. <strong>Exemplo:</strong> Sistema aceita e-mails sem o '@' porque a validação não foi programada."
    },
    {
      front: "Falha",
      back: "<strong>Definição:</strong> Quando o software não se comporta conforme esperado durante sua execução. Ocorre em tempo de execução quando o sistema não cumpre sua função. <strong>Exemplo:</strong> O sistema envia e-mails para endereços inválidos."
    },
    {
      front: "Por que testar software?",
      back: "<strong>Motivos:</strong> Garantir a Qualidade e a Confiabilidade, Reduzir Custos (quanto mais tarde o bug, mais caro), Proteger a Reputação da Empresa e Entregar Valor ao Cliente."
    },
    {
      front: "Causa do Bug - Ariane 5",
      back: "<strong>Causa:</strong> Reutilização de um código do Ariane 4, um foguete mais lento. A velocidade horizontal do Ariane 5 gerou um número que não cabia na variável de 16 bits, causando um 'integer overflow'."
    },
    {
      front: "Verificação",
      back: "<strong>Pergunta:</strong> 'Estamos construindo o produto certo?' <strong>Foco:</strong> O software está de acordo com a especificação técnica? Atende à especificação?"
    },
    {
      front: "Validação",
      back: "<strong>Pergunta:</strong> 'Estamos construindo o produto da forma certa?' <strong>Foco:</strong> O software resolve o problema real do cliente? Atende à necessidade do cliente?"
    },
    {
      front: "Teste de Caixa Preta (Black-Box)",
      back: "<strong>O quê testa:</strong> O 'O QUÊ' o software faz. Avalia funcionalidades com base em entradas e saídas, ignorando a estrutura interna do código. <strong>Analogia:</strong> Olhar se o carro anda."
    },
    {
      front: "Teste de Caixa Branca (White-Box)",
      back: "<strong>O quê testa:</strong> O 'COMO' o software faz. Avalia a lógica interna do software, exigindo conhecimento do código-fonte. <strong>Analogia:</strong> Examinar o motor e seus componentes."
    },
    {
      front: "Técnica: Particionamento de Equivalência",
      back: "<strong>Definição:</strong> Dividir todos os dados de entrada possíveis em grupos (partições) que devem se comportar de maneira idêntica. <strong>Regra:</strong> Testar UM valor de cada partição."
    },
    {
      front: "Técnica: Análise de Valor Limite (AVL)",
      back: "<strong>Definição:</strong> Uma extensão do Particionamento de Equivalência. Foca nos 'limites' das partições, onde a maioria dos erros ocorre. <strong>Exemplo (18-60):</strong> Testar 17, 18, 60 e 61."
    },

    // Aula 10: Gerência de Configuração de Software (GCS)
    {
      front: "O Caos Inicial (Sem GCS)",
      back: "<strong>Sintomas:</strong> 'Funciona na minha máquina!', 'Qual é a versão final? versao_final_v2_entregar.zip?', 'Eu juro que corrigi isso! Onde está meu código?', 'Subimos a versão errada para produção.'"
    },
    {
      front: "Gerência de Configuração de Software (GCS)",
      back: "<strong>Definição:</strong> A disciplina de identificar, organizar e controlar modificações no software. <strong>Objetivos:</strong> 1. Impedir o Caos, 2. Garantir a Integridade, 3. Permitir o Paralelismo."
    },
    {
      front: "Controle de Versão (VCS)",
      back: "<strong>Definição:</strong> Um sistema que registra mudanças em arquivos ao longo do tempo, para que você possa recuperar versões específicas. <strong>Analogia:</strong> É uma 'máquina do tempo' para o seu código."
    },
    {
      front: "Repositório (Git)",
      back: "<strong>Conceito-Chave:</strong> A 'pasta' central que guarda tudo."
    },
    {
      front: "Commit (Git)",
      back: "<strong>Conceito-Chave:</strong> Um 'snapshot' do projeto. Uma foto salva do estado exato do projeto."
    },
    {
      front: "Main (ou Master) (Git)",
      back: "<strong>Conceito-Chave:</strong> A linha do tempo principal. A versão 'oficial'. O que está valendo."
    },
    {
      front: "Branches (Ramos)",
      back: "<strong>Definição:</strong> Uma 'cópia de trabalho' da linha do tempo. <strong>Resolve:</strong> O problema do paralelismo (duas pessoas mexendo no mesmo arquivo ao mesmo tempo)."
    },
    {
      front: "Merge (Fusão)",
      back: "<strong>Definição:</strong> O ato de 'fundir' o trabalho de uma branch de volta na Main."
    },
    {
      front: "Conflito de Merge",
      back: "<strong>Quando ocorre:</strong> Quando a Mesma Linha foi alterada de Duas Formas Diferentes. <strong>O que o Git faz:</strong> Ele para e diz: 'Resolvam vocês qual versão fica'."
    },
    {
      front: "Administração de Mudanças",
      back: "<strong>Definição:</strong> Controlar o processo de decisão. Só porque podemos mudar (Controle de Versão), não significa que devemos."
    },
    {
      front: "Fluxo de Mudança (Etapas)",
      back: "<strong>Processo:</strong> 1. Solicitação -> 2. Análise de Impacto -> 3. Aprovação -> 4. Implementação -> 5. Validação/Teste -> 6. Integração (Merge)."
    },
    {
      front: "Análise de Impacto (GCS)",
      back: "<strong>O quê avalia:</strong> 'O que quebra se mexermos aqui? Quanto custa?'"
    },
    {
      front: "Auditoria e Rastreabilidade (GCS)",
      back: "<strong>Garante respostas para:</strong> 'Quem mudou?' (Autor), 'Por que mudou?' (Mensagem/CR), 'Quando mudou?' (Data), e 'O que mudou?' (O 'diff' do código)."
    },

    // Aula 11: Gestão de Riscos
    {
      front: "Risco (Definição)",
      back: "<strong>Definição:</strong> Um evento ou condição incerta que, se ocorrer, terá um efeito (positivo ou negativo) nos objetivos do projeto."
    },
    {
      front: "Fórmula do Risco",
      back: "<strong>Fórmula:</strong> Risco = Causa + Evento + Consequência. <strong>Exemplo:</strong> Devido a uma API legada (Causa), o pagamento pode falhar (Evento), resultando em perda de vendas (Consequência)."
    },
    {
      front: "Dimensões da Qualidade (ISO 25010)",
      back: "<strong>Onde procurar riscos:</strong> Usabilidade (fácil de usar?), Desempenho (é rápido?), Segurança (dados protegidos?), Confiabilidade (funciona sem falhas?), Manutenibilidade (fácil de corrigir?)."
    },
    {
      front: "Priorização de Risco",
      back: "<strong>Como fazer:</strong> Usando a Análise Qualitativa (Probabilidade x Impacto). <strong>Probabilidade (P):</strong> Qual a chance de acontecer? <strong>Impacto (I):</strong> Se acontecer, qual o tamanho do estrago?"
    },
    {
      front: "Matriz de Risco (Prioridades)",
      back: "<strong>Riscos Verdes (Baixos):</strong> Baixa probabilidade e baixo impacto. Podem ser 'Aceitos'. <strong>Riscos Vermelhos (Monstros):</strong> Alta probabilidade E alto impacto. São a prioridade absoluta."
    },
    {
      front: "Estratégia de Resposta: Mitigar",
      back: "<strong>Definição:</strong> Ação proativa para diminuir a Probabilidade ou o Impacto. <strong>Exemplo:</strong> Fazer mais testes de performance."
    },
    {
      front: "Estratégia de Resposta: Transferir",
      back: "<strong>Definição:</strong> Passar o risco para um terceiro. <strong>Exemplo:</strong> Contratar um seguro; usar um gateway de pagamento famoso."
    },
    {
      front: "Estratégia de Resposta: Evitar",
      back: "<strong>Definição:</strong> Mudar o plano para eliminar o risco. <strong>Exemplo:</strong> Remover a feature de pagamento do app e deixar só no site."
    },
    {
      front: "Estratégia de Resposta: Aceitar",
      back: "<strong>Definição:</strong> Para riscos baixos (verdes). Não fazer nada agora, apenas observar."
    },
    {
      front: "Plano de Mitigação",
      back: "<strong>Tipo:</strong> Proativo (Antes do Risco). <strong>O que é:</strong> O que faremos agora para reduzir a chance ou o impacto. <strong>Exemplo:</strong> 'Realizar 3 rodadas de testes de carga'."
    },
    {
      front: "Plano de Contingência",
      back: "<strong>Tipo:</strong> Reativo (Depois do Risco). <strong>O que é:</strong> O 'Plano B'. O que faremos se o risco acontecer. <strong>Exemplo:</strong> 'Se o app ficar lento, alocar 2 servidores extras'."
    }
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
