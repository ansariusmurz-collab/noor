/* =====================================================
   UTILITY FUNCTIONS
   ===================================================== */

/**
 * Форматирует время (в миллисекундах) в строку MM:SS
 */
function formatTime(ms) {
  if (ms < 0) ms = 0;
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Экранирует HTML-спецсимволы для безопасного вывода
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Перемешивает массив (Fisher-Yates)
 */
function shuffle(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Получает случайное число в диапазоне [min, max]
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Получает вопросы по категории и сложности
 */
function getQuestionsByCategory(category, difficulty) {
  if (!questions) return [];
  return questions.filter(q => q.category === category && q.difficulty === difficulty);
}

/**
 * Получает случайные вопросы
 */
function getRandomQuestions(category, count = 10, difficulty = null) {
  let filtered = questions;
  
  if (category) {
    filtered = filtered.filter(q => q.category === category);
  }
  
  if (difficulty) {
    filtered = filtered.filter(q => q.difficulty === difficulty);
  }
  
  return shuffle(filtered).slice(0, count);
}

/**
 * Получает название категории на русском
 */
function getCategoryName(categoryKey) {
  const categoryNames = {
    'prophets': 'Пророки',
    'basics': 'Основы Ислама',
    'quran': 'Коран'
  };
  return categoryNames[categoryKey] || categoryKey;
}

/**
 * Получает имя сложности на русском
 */
function getDifficultyName(difficulty) {
  const names = {
    'easy': 'Легко',
    'medium': 'Средне',
    'hard': 'Сложно'
  };
  return names[difficulty] || difficulty;
}

/**
 * Проверяет, содержит ли строка кириллицу
 */
function isCyrillic(text) {
  return /[\u0400-\u04FF]/.test(text);
}

/**
 * Нормализует имя игрока
 */
function normalizePlayerName(name) {
  return (name || '').trim().substring(0, 20);
}
