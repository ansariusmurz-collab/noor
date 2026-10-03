/* =====================================================
   COMPANY SANDBOX MODE - РЕЖИМ ПЕСОЧНИЦА (БЕЗ ВЕДУЩЕГО)
   ===================================================== */

/**
 * Инициализирует режим «Песочница»
 */
function startSandboxMode() {
  companyCategoryIndex = 0;
  companyCurrentPlayer = 0;
  companyScores = new Array(companyPlayersCount).fill(0);
  currentQuestions = getRandomQuestions(null, 10 * companyPlayersCount);
  currentQuestionIndex = 0;
  sandboxRotation = 0;
  answerLocked = false;
  gameStartTime = Date.now();
  
  showScreen('companySandboxGameScreen');
  showSandboxQuestion();
}

/**
 * Отображает вопрос для текущего игрока в песочнице
 */
function showSandboxQuestion() {
  if (currentQuestionIndex >= currentQuestions.length) {
    finishSandboxGame();
    return;
  }
  
  const question = currentQuestions[currentQuestionIndex];
  answerLocked = false;
  
  // Обновить прогресс
  const progressBar = document.getElementById('sandboxProgressBar');
  if (progressBar) {
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    progressBar.style.width = progress + '%';
  }
  
  // Обновить прогресс текст
  const progressText = document.getElementById('sandboxProgressText');
  if (progressText) {
    progressText.textContent = `${currentQuestionIndex + 1} / ${currentQuestions.length}`;
  }
  
  // Отобразить текущего игрока
  const currentPlayerDisplay = document.getElementById('sandboxCurrentPlayer');
  if (currentPlayerDisplay) {
    currentPlayerDisplay.textContent = `Ход: ${currentPlayers[companyCurrentPlayer]}`;
  }
  
  // Обновить поворот интерфейса в зависимости от игрока
  const rotateShell = document.getElementById('sandboxRotateShell');
  if (rotateShell) {
    // Поворот на 90 градусов для каждого игрока (если их двое, один смотрит вверх ногами)
    const anglePerPlayer = 90;
    const rotationAngle = companyCurrentPlayer * anglePerPlayer;
    rotateShell.style.transform = `rotate(${rotationAngle}deg)`;
  }
  
  // Отобразить таблицу текущих очков
  const scoresDisplay = document.getElementById('sandboxScoresDisplay');
  if (scoresDisplay) {
    scoresDisplay.innerHTML = '';
    currentPlayers.forEach((name, idx) => {
      const scoreItem = document.createElement('div');
      scoreItem.style.marginBottom = '5px';
      scoreItem.style.color = idx === companyCurrentPlayer ? 'var(--gold-light)' : 'var(--muted)';
      scoreItem.textContent = `${escapeHtml(name)}: ${companyScores[idx]}`;
      scoresDisplay.appendChild(scoreItem);
    });
  }
  
  // Отобразить вопрос
  const questionText = document.getElementById('sandboxQuestionText');
  if (questionText) {
    questionText.textContent = question.question;
  }
  
  // Отобразить варианты ответов
  const answersContainer = document.getElementById('sandboxAnswers');
  if (answersContainer) {
    answersContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
      const btn = document.createElement('button');
      btn.className = 'answer';
      btn.textContent = option;
      btn.onclick = () => selectSandboxAnswer(index);
      answersContainer.appendChild(btn);
    });
  }
  
  startSandboxTimer();
}

/**
 * Обрабатывает выбор ответа в песочнице
 */
function selectSandboxAnswer(answerIndex) {
  if (answerLocked) return;
  answerLocked = true;
  
  const question = currentQuestions[currentQuestionIndex];
  const isCorrect = answerIndex === question.correct;
  const answersContainer = document.getElementById('sandboxAnswers');
  const buttons = answersContainer.querySelectorAll('.answer');
  
  // Показать правильный и неправильный ответы
  buttons.forEach((btn, idx) => {
    if (idx === question.correct) {
      btn.classList.add('correct');
      playSound('correct');
    } else if (idx === answerIndex && !isCorrect) {
      btn.classList.add('wrong');
      playSound('error');
    }
    btn.disabled = true;
  });
  
  // Начислить очки за правильный ответ
  if (isCorrect) {
    companyScores[companyCurrentPlayer] += 10;
  }
  
  // Остановить таймер
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  
  // Перейти к следующему вопросу
  setTimeout(() => {
    currentQuestionIndex++;
    nextSandboxPlayerTurn();
    showSandboxQuestion();
  }, 1500);
}

/**
 * Переходит к следующему игроку
 */
function nextSandboxPlayerTurn() {
  companyCurrentPlayer = (companyCurrentPlayer + 1) % companyPlayersCount;
}

/**
 * Запускает таймер для вопроса в песочнице (20 секунд)
 */
function startSandboxTimer() {
  const SANDBOX_TIME_LIMIT = 20000; // 20 секунд
  let timeElapsed = 0;
  
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  
  timerInterval = setInterval(() => {
    timeElapsed += 100;
    
    // Обновить визуальный прогресс времени
    const timeDisplay = document.getElementById('sandboxTimeDisplay');
    if (timeDisplay) {
      const remainingTime = Math.max(0, Math.floor((SANDBOX_TIME_LIMIT - timeElapsed) / 1000));
      timeDisplay.textContent = remainingTime + 's';
    }
    
    // Если время вышло, выбрать ложный ответ
    if (timeElapsed >= SANDBOX_TIME_LIMIT) {
      if (!answerLocked) {
        selectSandboxAnswer(-1); // -1 означает истечение времени
      }
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }, 100);
}

/**
 * Завершает игру в режиме песочница и показывает результаты
 */
function finishSandboxGame() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  
  showSandboxResults();
}

/**
 * Показывает результаты игры в режиме песочница
 */
function showSandboxResults() {
  showScreen('companyResultsScreen');
  
  // Отсортировать игроков по очкам
  const rankedPlayers = currentPlayers.map((name, idx) => ({
    name,
    score: companyScores[idx],
    index: idx
  })).sort((a, b) => b.score - a.score);
  
  // Отобразить таблицу результатов
  const resultsList = document.getElementById('companyResultsList');
  if (resultsList) {
    resultsList.innerHTML = '';
    
    rankedPlayers.forEach((player, place) => {
      const row = document.createElement('div');
      row.className = 'result-row';
      row.innerHTML = `
        <div class="result-place">${place + 1}</div>
        <div class="result-name">${escapeHtml(player.name)}</div>
        <div class="result-score">${player.score}</div>
      `;
      resultsList.appendChild(row);
    });
  }
  
  // Показать победителя
  const finishTitle = document.getElementById('companyFinishTitle');
  if (finishTitle && rankedPlayers.length > 0) {
    finishTitle.textContent = `${escapeHtml(rankedPlayers[0].name)} побеждает!`;
  }
}
