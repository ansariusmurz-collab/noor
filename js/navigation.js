/* =====================================================
   SCREEN NAVIGATION
   ===================================================== */

/**
 * Показывает экран по ID, скрывая остальные
 */
function showScreen(screenId) {
  // Скрыть все экраны
  const allScreens = document.querySelectorAll('.screen');
  allScreens.forEach(screen => {
    screen.classList.remove('active');
  });
  
  // Показать нужный экран
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add('active');
    currentScreen = screenId;
    
    // Воспроизвести звук навигации
    playSound('select');
  }
}

/**
 * Возвращает на главный экран
 */
function goHome() {
  // Остановить все таймеры
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  
  // Остановить все дуэльные таймеры
  if (duelTimers && duelTimers.length > 0) {
    duelTimers.forEach(timer => clearInterval(timer));
    duelTimers = [];
  }
  
  // Закрыть все модали
  closeAllModals();
  
  // Показать главный экран
  showScreen('homeScreen');
  
  // Обновить дисплей рекорда
  updateRecordDisplay();
  
  // Сбросить состояние
  currentMode = '';
  answerLocked = false;
  currentQuestions = [];
  currentQuestionIndex = 0;
}

/**
 * Закрывает все модальные окна
 */
function closeAllModals() {
  const allModals = document.querySelectorAll('.modal');
  allModals.forEach(modal => {
    modal.classList.remove('active');
  });
}

/**
 * Закрывает конкретное модальное окно
 */
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    playSound('select');
  }
}

/**
 * Открывает модальное окно
 */
function openModal(modalId) {
  closeAllModals();
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    playSound('select');
  }
}

/**
 * Обновляет отображение рекорда на главном экране
 */
function updateRecordDisplay() {
  const recordValue = document.getElementById('recordValue');
  if (recordValue) {
    recordValue.textContent = bestRecord;
  }
}

/**
 * Обновляет общий UI после загрузки
 */
function updateUIAfterInit() {
  updateRecordDisplay();
  updateSoundIcon();
}
