/* =====================================================
   COMPANY MODE - ОСНОВНАЯ ИНФРАСТРУКТУРА
   ===================================================== */

/**
 * Запускает режим компании (мультиплеер)
 */
function startCompanyMode() {
  currentMode = 'company';
  companyPlayersCount = 2;
  playerNames = [];
  currentPlayers = [];
  companySubmode = '';
  companyCurrentPlayer = 0;
  companyScores = [];
  companyTimes = [];
  
  playSound('select');
  showScreen('companyPlayerSetupScreen');
  updatePlayerCountDisplay();
  renderPlayerNameInputs();
}

/**
 * Обновляет отображение количества игроков
 */
function updatePlayerCountDisplay() {
  const playerCountDisplay = document.getElementById('playerCountDisplay');
  if (playerCountDisplay) {
    playerCountDisplay.textContent = companyPlayersCount;
  }
}

/**
 * Увеличивает количество игроков
 */
function increasePlayerCount() {
  if (companyPlayersCount < 8) {
    companyPlayersCount++;
    updatePlayerCountDisplay();
    renderPlayerNameInputs();
    playSound('select');
  }
}

/**
 * Уменьшает количество игроков
 */
function decreasePlayerCount() {
  if (companyPlayersCount > 2) {
    companyPlayersCount--;
    updatePlayerCountDisplay();
    renderPlayerNameInputs();
    playSound('select');
  }
}

/**
 * Отрисовывает поля для ввода имён игроков
 */
function renderPlayerNameInputs() {
  const inputContainer = document.getElementById('playerNameInputsContainer');
  if (!inputContainer) return;
  
  inputContainer.innerHTML = '';
  playerNames = [];
  
  for (let i = 0; i < companyPlayersCount; i++) {
    const label = document.createElement('label');
    label.style.display = 'block';
    label.style.marginBottom = '8px';
    label.style.color = 'var(--muted)';
    label.style.fontSize = '11px';
    label.textContent = `Игрок ${i + 1}`;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'player-input';
    input.placeholder = `Имя игрока ${i + 1}`;
    input.maxLength = 20;
    input.dataset.playerIndex = i;
    input.onchange = (e) => {
      const normalizedName = normalizePlayerName(e.target.value);
      playerNames[i] = normalizedName || `Игрок ${i + 1}`;
    };
    
    inputContainer.appendChild(label);
    inputContainer.appendChild(input);
  }
}

/**
 * Проверяет введённые имена и переходит к выбору подрежима
 */
function proceedWithCompanySetup() {
  // Собрать все имена из полей ввода
  const inputs = document.querySelectorAll('.player-input');
  playerNames = [];
  
  inputs.forEach((input, idx) => {
    const name = normalizePlayerName(input.value);
    playerNames[idx] = name || `Игрок ${idx + 1}`;
  });
  
  currentPlayers = [...playerNames];
  companyScores = new Array(companyPlayersCount).fill(0);
  companyTimes = new Array(companyPlayersCount).fill(0);
  
  playSound('select');
  showScreen('companySubmodeScreen');
}

/**
 * Маршрутизатор: выбирает подрежим и запускает нужный модуль
 */
function selectCompanySubmode(submodeId) {
  companySubmode = submodeId;
  playSound('select');
  
  if (submodeId === 'host') {
    startHostMode();
  } else if (submodeId === 'sandbox') {
    startSandboxMode();
  } else if (submodeId === 'duel') {
    // PvP Дуэль - пока оставляем в основном файле, просто вызываем
    startDuelMode();
  }
}

/**
 * Возвращает на главный экран из установки компании
 */
function exitCompanySetup() {
  currentMode = '';
  playSound('select');
  goHome();
}

/**
 * Возвращает на главный экран из игры в компании
 */
function exitCompanyGame() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  currentMode = '';
  companySubmode = '';
  playSound('select');
  goHome();
}
