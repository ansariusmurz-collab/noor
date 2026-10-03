/* =====================================================
   APPLICATION STATE
   ===================================================== */

// Основное состояние приложения
let currentScreen = 'homeScreen';
let currentMode = '';

// Состояние одиночной игры
let singleCategory = '';
let singleDifficulty = '';
let singleScore = 0;
let singleQuestionIndex = 0;
let singleTime = 0;

// Состояние компании
let companyPlayersCount = 2;
let playerNames = [];
let currentPlayers = [];
let companySubmode = ''; // 'host', 'sandbox', 'duel'
let companyCategoryIndex = 0;
let companyCurrentPlayer = 0;
let companyScores = [];
let companyTimes = [];

// Состояние песочницы
let sandboxRotation = 0;
let sandboxDirection = 1;

// Состояние дуэли
let duelPlayer1Name = '';
let duelPlayer2Name = '';
let duelScore1 = 0;
let duelScore2 = 0;
let duelTime1 = 300000; // 5 минут в миллисекундах
let duelTime2 = 300000;
let duelTimers = [];
let duelCurrentPlayer = 0; // 0 или 1

// Состояние микс-сюжета
let storyDifficulty = 'easy'; // 'easy', 'medium', 'hard'
let storyLevel = 1; // Уровень внутри сложности
let storyScore = 0;
let storyLives = 3;
let storyLastRestoreTime = 0;
let storyCompleted = false;

// Общее игровое состояние
let currentQuestions = [];
let currentQuestionIndex = 0;
let currentScore = 0;
let answerLocked = false;
let gameStartTime = 0;
let timerInterval = null;

// UI состояние
let soundEnabled = true;
let fullscreenMode = false;

// Premium состояние
let isPremium = false;
let premiumActive = false;

// Рекорд
let bestRecord = 0;
