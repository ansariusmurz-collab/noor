/* =====================================================
   LOCAL STORAGE MANAGEMENT
   ===================================================== */

// Названия ключей хранилища (не менять!)
const STORAGE_KEYS = {
  RECORD: 'noorRecord',
  PREMIUM: 'noorPremium',
  STORY_PROGRESS: 'noorStoryProgress',
  STORY_LIVES: 'noorStoryLives',
  STORY_LAST_RESTORE: 'noorStoryLastRestore',
  SOUND_ENABLED: 'noorSoundEnabled',
  LEADERBOARD_CACHE: 'noorLeaderboardCache'
};

/**
 * Сохраняет рекорд (лучший результат одиночной игры)
 */
function saveRecord(score) {
  try {
    const current = loadRecord();
    const newRecord = Math.max(current, score);
    localStorage.setItem(STORAGE_KEYS.RECORD, String(newRecord));
    bestRecord = newRecord;
    return newRecord;
  } catch (e) {
    console.error('Failed to save record:', e);
    return score;
  }
}

/**
 * Загружает рекорд
 */
function loadRecord() {
  try {
    const value = localStorage.getItem(STORAGE_KEYS.RECORD);
    return value ? parseInt(value, 10) : 0;
  } catch (e) {
    console.error('Failed to load record:', e);
    return 0;
  }
}

/**
 * Проверяет, активирован ли Premium
 */
function checkPremiumStatus() {
  try {
    const value = localStorage.getItem(STORAGE_KEYS.PREMIUM);
    isPremium = value === 'true' || value === '1';
    return isPremium;
  } catch (e) {
    console.error('Failed to check premium:', e);
    return false;
  }
}

/**
 * Активирует Premium
 */
function activatePremium() {
  try {
    localStorage.setItem(STORAGE_KEYS.PREMIUM, 'true');
    isPremium = true;
    premiumActive = true;
    return true;
  } catch (e) {
    console.error('Failed to activate premium:', e);
    return false;
  }
}

/**
 * Сохраняет состояние звука
 */
function saveSoundSetting(enabled) {
  try {
    localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, enabled ? 'true' : 'false');
    soundEnabled = enabled;
  } catch (e) {
    console.error('Failed to save sound setting:', e);
  }
}

/**
 * Загружает состояние звука
 */
function loadSoundSetting() {
  try {
    const value = localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED);
    soundEnabled = value !== 'false';
    return soundEnabled;
  } catch (e) {
    console.error('Failed to load sound setting:', e);
    soundEnabled = true;
    return true;
  }
}

/**
 * Сохраняет прогресс сюжета
 */
function saveStoryProgress(difficulty, level, score) {
  try {
    const progress = {
      difficulty,
      level,
      score,
      timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEYS.STORY_PROGRESS, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save story progress:', e);
  }
}

/**
 * Загружает прогресс сюжета
 */
function loadStoryProgress() {
  try {
    const value = localStorage.getItem(STORAGE_KEYS.STORY_PROGRESS);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  } catch (e) {
    console.error('Failed to load story progress:', e);
    return null;
  }
}

/**
 * Сохраняет количество жизней сюжета
 */
function saveStoryLives(lives) {
  try {
    localStorage.setItem(STORAGE_KEYS.STORY_LIVES, String(lives));
    storyLives = lives;
  } catch (e) {
    console.error('Failed to save story lives:', e);
  }
}

/**
 * Загружает количество жизней сюжета
 */
function loadStoryLives() {
  try {
    const value = localStorage.getItem(STORAGE_KEYS.STORY_LIVES);
    return value ? parseInt(value, 10) : 3;
  } catch (e) {
    console.error('Failed to load story lives:', e);
    return 3;
  }
}

/**
 * Сохраняет время последнего восстановления жизни
 */
function saveStoryRestoreTime(timestamp) {
  try {
    localStorage.setItem(STORAGE_KEYS.STORY_LAST_RESTORE, String(timestamp));
    storyLastRestoreTime = timestamp;
  } catch (e) {
    console.error('Failed to save restore time:', e);
  }
}

/**
 * Загружает время последнего восстановления жизни
 */
function loadStoryRestoreTime() {
  try {
    const value = localStorage.getItem(STORAGE_KEYS.STORY_LAST_RESTORE);
    return value ? parseInt(value, 10) : 0;
  } catch (e) {
    console.error('Failed to load restore time:', e);
    return 0;
  }
}

/**
 * Инициализирует все хранилище при запуске
 */
function initializeStorage() {
  bestRecord = loadRecord();
  checkPremiumStatus();
  loadSoundSetting();
  const storyProgress = loadStoryProgress();
  if (storyProgress) {
    storyDifficulty = storyProgress.difficulty;
    storyLevel = storyProgress.level;
    storyScore = storyProgress.score;
  }
  storyLives = loadStoryLives();
  storyLastRestoreTime = loadStoryRestoreTime();
}
