/* =====================================================
   AUDIO MANAGEMENT
   ===================================================== */

// Объекты звуков (инициализируются при запуске)
let audioSelect = null;
let audioCorrect = null;
let audioError = null;

// Названия звуковых файлов
const SOUND_FILES = {
  select: 'select.mp3',
  correct: 'correct.mp3',
  error: 'error.mp3'
};

/**
 * Инициализирует аудиообъекты
 */
function initializeAudio() {
  try {
    audioSelect = new Audio(SOUND_FILES.select);
    audioCorrect = new Audio(SOUND_FILES.correct);
    audioError = new Audio(SOUND_FILES.error);
    
    // Установка громкости
    audioSelect.volume = 0.5;
    audioCorrect.volume = 0.6;
    audioError.volume = 0.6;
  } catch (e) {
    console.error('Failed to initialize audio:', e);
  }
}

/**
 * Проигрывает звук
 * @param {string} type - Тип звука ('select', 'correct', 'error')
 */
function playSound(type) {
  if (!soundEnabled) return;
  
  try {
    let audio = null;
    switch (type) {
      case 'select':
        audio = audioSelect;
        break;
      case 'correct':
        audio = audioCorrect;
        break;
      case 'error':
        audio = audioError;
        break;
      default:
        return;
    }
    
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(e => console.error('Audio play error:', e));
    }
  } catch (e) {
    console.error('Failed to play sound:', e);
  }
}

/**
 * Переключает звук
 */
function toggleSound() {
  soundEnabled = !soundEnabled;
  saveSoundSetting(soundEnabled);
  
  // Обновить визуальное состояние
  updateSoundIcon();
  
  // Проиграть звук подтверждения при включении
  if (soundEnabled) {
    playSound('select');
  }
}

/**
 * Обновляет иконку звука в UI
 */
function updateSoundIcon() {
  const soundBtn = document.getElementById('soundToggleBtn');
  if (soundBtn) {
    if (soundEnabled) {
      soundBtn.textContent = '🔊';
    } else {
      soundBtn.textContent = '🔇';
    }
  }
}
