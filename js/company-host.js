/* =====================================================
   COMPANY HOST MODE - РЕЖИМ С ВЕДУЩИМ
   ===================================================== */

/**
 * Инициализирует режим «С ведущим»
 */
function startHostMode() {
  companyCategoryIndex = 0;
  companyCurrentPlayer = 0;
  companyScores = new Array(companyPlayersCount).fill(0);
  currentQuestions = getRandomQuestions(null, 10 * companyPlayersCount);
  currentQuestionIndex = 0;
  answerLocked = false;
  gameStartTime = Date.now();
  
  showScreen('companyHostGameScreen');
  showHostQuestion();
}

/**
 * Отображает вопрос в режиме ведущего
 */
function showHostQuestion() {
  if (currentQuestionIndex >= currentQuestions.length) {
    finishHostGame();
    return;
  }
  
  const question = currentQuestions[currentQuestionIndex];
  answerLocked = false;
  
  // Обновить прогресс
  const progressBar = document.getElementById('hostProgressBar');
  if (progressBar) {
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    progressBar.style.width = progress + '%';
  }
  
  // Обновить прогресс текст
  const progressText = document.getElementById('hostProgressText');
  if (progressText) {
    progressText.textContent = `${currentQuestionIndex + 1} / ${currentQuestions.length}`;
  }
  
  // Отобразить текущего игрока
  const currentPlayerDisplay = document.getElementById('hostCurrentPlayer');
  if (currentPlayerDisplay) {
    currentPlayerDisplay.textContent = `Ход: ${currentPlayers[companyCurrentPlayer]}`;
  }
  
  // Отобразить вопрос
  const questionText = document.getElementById('hostQuestionText');
  if (questionText) {
    questionText.textContent = question.question;
  }
  
  // Отобразить варианты ответов
  const answersContainer = document.getElementById('hostAnswers');
  if (answersContainer) {
    answersContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
      const btn = document.createElement('button');
      btn.className = 'answer';
      btn.textContent = option;
      
      // Подсветить правильный ответ для ведущего
      if (index === question.correct) {
        btn.style.borderColor = 'var(--gold)';
        btn.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.3)';
      }
      
      btn.disabled = true;
      answersContainer.appendChild(btn);
    });
  }
}

/**
 * Начисляет очки текущему игроку (правильный ответ)
 */
function hostMarkCorrect() {
  if (answerLocked) return;
  answerLocked = true;
  
  companyScores[companyCurrentPlayer] += 10;
  playSound('correct');
  
  setTimeout(() => {
    currentQuestionIndex++;
    companyCurrentPlayer = (companyCurrentPlayer + 1) % companyPlayersCount;
    showHostQuestion();
  }, 1000);
}

/**
 * Не начисляет очки (неправильный ответ)
 */
function hostMarkWrong() {
  if (answerLocked) return;
  answerLocked = true;
  
  playSound('error');
  
  setTimeout(() => {
    currentQuestionIndex++;
    companyCurrentPlayer = (companyCurrentPlayer + 1) % companyPlayersCount;
    showHostQuestion();
  }, 1000);
}

/**
 * Завершает игру в режиме ведущего и показывает результаты
 */
function finishHostGame() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  
  showHostResults();
}

/**
 * Показывает результаты игры в режиме ведущего
 */
function showHostResults() {
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
    finishTitle.textContent = `${escapeHtml(rankedPlayers[0].name)} победил!`;
  }
}
