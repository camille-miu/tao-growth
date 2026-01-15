import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  BookOpen, 
  Users, 
  FileText, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Leaf,
  ChevronRight,
  User,
  Star,
  Coffee,
  Sun,
  Calendar,
  X,
  AlertCircle,
  Edit3,
  Gift,
  Tag,
  Cake,
  MessageCircle,
  History,
  Search,
  Save,
  StickyNote,
  Moon,
  Sunrise,
  Heart,
  BarChart2,
  List,
  CheckSquare,
  Flame,
  Trophy,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  ChevronDown,
  ChevronUp,
  XCircle,
  Award,
  Settings,
  Download,
  Upload,
  Globe,
  Palette,
  ArrowUp,
  ArrowDown,
  GripVertical,
  Minimize2,
  Maximize2,
  ArrowUpDown,
  Bell,
  RefreshCw,
  RotateCcw,
  Smartphone,
  Share,
  MoreVertical,
  PlusSquare
} from 'lucide-react';

// --- Theme Definitions (Warm Only) ---
const themeColors = {
  primary: '#8D6E63',
  primaryHover: '#795548',
  secondary: '#EFEBE9',
  textMain: '#5D4037',
  textSub: '#8D6E63',
  textLight: '#A1887F',
  bg: '#F5F5F5',
  cardBg: '#FFFFFF',
  border: '#EBE0D6',
  accent: '#F57F17',
  accentBg: '#FFF8E1'
};

// --- Translation Dictionary ---
const translations = {
  'zh-TW': {
    appTitle: '修辦小助理',
    tabs: { dashboard: '總覽', habit: '習慣', reflection: '手札', crm: '成全', report: '月報' },
    dashboard: {
      greeting: { night: '夜深了', morning: '早安', noon: '午安', afternoon: '下午好', evening: '晚安' },
      intro: '今天也要記得觀照自己的心。',
      wisdom: '智慧小語',
      wisdomPlaceholder: '點擊此處新增您的第一則智慧小語...',
      birthdayTitle: '今日壽星',
      birthdayWish: '別忘了送上祝福喔！',
      lastDayReminder: '📅 今天是本月最後一天，別忘了生成月報喔！',
      stats: { reflection: '本月內省', interaction: '當月互動人數', unit: '篇', unitPerson: '人' },
      goal: '當月目標',
      memo: '隨手記 / 待辦',
      memoPlaceholder: '這裡可以記錄臨時的想法或待辦事項...',
    },
    habit: {
      title: '好習慣追蹤',
      subtitle: '今天也要堅持下去喔！',
      empty: '新增一個想培養的好習慣吧！',
      addTitle: '新增好習慣',
      editTitle: '修改習慣',
      addPlaceholder: '例如：讀經、運動、感恩...',
      streak: '連續',
      monthAchieve: '本月達成',
      days: '天',
      yearView: '年度',
      yearTotal: '總完成天數',
      yearRate: '年度達成率',
      sortMode: '排序模式',
      mobileSortHint: '手機請使用箭頭排序'
    },
    reflection: {
      title: '內修手札',
      empty: '泡杯茶，寫下今天的心得吧。',
      addTitle: '新增手札',
      editTitle: '編輯紀錄',
      date: '日期',
      category: '分類',
      titleLabel: '標題',
      content: '內容',
      titlePlaceholder: '例如：參與法會心得 / 本月修辦目標',
      contentPlaceholder: '今天有什麼體悟呢？',
      options: ['內修省思', '當月目標紀錄', '經典研讀', '活動參與', '日常感悟']
    },
    crm: {
      title: '成全名單',
      statsTitle: '成全概況',
      total: '總計',
      searchPlaceholder: '搜尋姓名、關係或個人資料...',
      empty: '新增一位您正在關懷的朋友。',
      notFound: '找不到符合的資料',
      addTitle: '新增好友',
      editTitle: '更新資料',
      name: '姓名',
      relationship: '關係 (可複選)',
      status: '目前階段 (可複選)',
      birthday: '生日 (選填)',
      personalData: '其他個人資料 (家庭/工作/喜好)',
      interactionLog: '新增互動紀錄',
      history: '歷史紀錄',
      noHistory: '尚無歷史紀錄',
      updateBtn: '更新資料/互動',
      placeholderNotes: '例如：飲食喜好、工作狀況...',
      placeholderInteraction: '輸入新的互動內容...',
      statusOptions: ['新朋友', '邀約中', '已參與活動', '求道', '開法會', '研究班'],
      relationshipOptions: ['家人', '朋友', '同事', '同學', '引師', '保師']
    },
    report: {
      title: '月度總結助手',
      subtitle: '一鍵彙整本月的努力，輕鬆分享至群組。',
      generateBtn: '生成本月總結',
      preview: '預覽',
      copy: '複製',
      copied: '已複製',
      sections: {
        intro: '月 修辦總結',
        recorder: '紀錄者',
        goal: '★ 本月目標',
        reflection: '一、內修省思',
        habit: '二、好習慣追蹤',
        crm: '三、成全進度',
        next: '四、下月展望',
        noRecord: '本月尚無紀錄。',
        noHabit: '本月尚無習慣打卡紀錄。',
        noInteraction: '本月尚無重點互動。'
      }
    },
    settings: {
      title: '系統設定',
      userProfile: '個人檔案',
      userName: '使用者名稱',
      language: '語言設定',
      appInfo: '應用程式資訊',
      installGuide: '如何安裝到手機桌面？',
      dataManagement: '資料管理',
      backup: '備份資料 (匯出)',
      restore: '導入資料 (匯入)',
      restoreHint: '請選擇先前備份的 .json 檔案',
      backupSuccess: '備份檔案已下載',
      restoreSuccess: '資料導入成功！',
      restoreError: '檔案格式錯誤，請確認檔案是否正確。',
      designer: 'Designed by Camille Liu',
      newYearReset: '新年度全部重置',
      newYearResetDesc: '清除紀錄，重新開始',
      resetConfirmTitle: '確定要進行新年度重置嗎？',
      resetConfirmText: '這將會清除所有「打卡紀錄」、「內修手札」與「當月目標」，讓您乾淨地開始新的一年。（您的成全名單與習慣項目將會保留）',
      resetSuccess: '已完成重置，祝您新年道務宏展！'
    },
    common: {
      save: '儲存',
      cancel: '取消',
      add: '新增',
      edit: '編輯',
      delete: '刪除',
      confirm: '確認執行',
      confirmDelete: '確定要刪除嗎？',
      confirmDeleteHabit: '確定要刪除這個習慣追蹤嗎？',
      confirmDeleteWisdom: '確定要刪除這則小語嗎？',
      back: '返回'
    },
    encouragement: [
      "萬事起頭難，加油！🌱", 
      "3天囉！給努力的自己一個大擁抱🤗",
      "哇～快滿一週了！覺得自己閃閃發光✨",
      "習慣成自然，你做得很好！💪",
      "快半個月了，太強了！🌟",
      "至少半個月達標了耶！🤩",
      "這份堅持令人佩服！🌈",
      "21天效應達成，新的自己！🦋",
      "持之以恆，成果看得見！🚀",
      "這個月即將完美收官！🏆",
      "圓滿達成，你是毅力大師！👑"
    ],
    install: {
      title: '安裝教學',
      iosTitle: 'iOS (iPhone / iPad)',
      iosStep1: '1. 在 Safari 瀏覽器打開此網頁',
      iosStep2: '2. 點擊底部的「分享」按鈕',
      iosStep3: '3. 往下滑，選擇「加入主畫面」',
      androidTitle: 'Android (Chrome)',
      androidStep1: '1. 在 Chrome 瀏覽器打開此網頁',
      androidStep2: '2. 點擊右上角的「更多」選單',
      androidStep3: '3. 選擇「加到主畫面」或「安裝應用程式」'
    }
  },
  'en': {
    appTitle: 'Tao Assistant',
    tabs: { dashboard: 'Home', habit: 'Habits', reflection: 'Journal', crm: 'CRM', report: 'Report' },
    dashboard: {
      greeting: { night: 'Good night', morning: 'Good morning', noon: 'Good afternoon', afternoon: 'Good afternoon', evening: 'Good evening' },
      intro: 'Remember to take care of your heart today.',
      wisdom: 'Wisdom Quote',
      wisdomPlaceholder: 'Click here to add your first wisdom quote...',
      birthdayTitle: 'Birthdays Today',
      birthdayWish: "Don't forget to send your wishes!",
      lastDayReminder: "📅 Today is the last day of the month. Don't forget your monthly report!",
      stats: { reflection: 'Reflections', interaction: 'People Reached', unit: '', unitPerson: '' },
      goal: 'Monthly Goal',
      memo: 'Memo / Todo',
      memoPlaceholder: 'Jot down temporary thoughts or tasks here...',
    },
    habit: {
      title: 'Habit Tracker',
      subtitle: 'Keep it up today!',
      empty: 'Add a new habit you want to cultivate!',
      addTitle: 'New Habit',
      editTitle: 'Edit Habit',
      addPlaceholder: 'Ex: Reading, Exercise, Gratitude...',
      streak: 'Streak',
      monthAchieve: 'This Month',
      days: 'days',
      yearView: 'Year',
      yearTotal: 'Total Days',
      yearRate: 'Yearly Rate',
      sortMode: 'Sort Mode',
      mobileSortHint: 'Use arrows to sort on mobile'
    },
    reflection: {
      title: 'Reflections',
      empty: 'Brew some tea and write down your thoughts.',
      addTitle: 'New Entry',
      editTitle: 'Edit Entry',
      date: 'Date',
      category: 'Category',
      titleLabel: 'Title',
      content: 'Content',
      titlePlaceholder: 'Ex: Monthly Goal / Event Thoughts',
      contentPlaceholder: 'What did you realize today?',
      options: ['Self-Reflection', 'Monthly Goal', 'Study', 'Activity', 'Daily Life']
    },
    crm: {
      title: 'Contact List',
      statsTitle: 'Overview',
      total: 'Total',
      searchPlaceholder: 'Search name, relation, or details...',
      empty: 'Add a friend you are caring for.',
      notFound: 'No matching records found',
      addTitle: 'Add Contact',
      editTitle: 'Edit Contact',
      name: 'Name',
      relationship: 'Relationship (Multi-select)',
      status: 'Status (Multi-select)',
      birthday: 'Birthday (Optional)',
      personalData: 'Personal Info (Family/Job/Likes)',
      interactionLog: 'New Interaction',
      history: 'History',
      noHistory: 'No history yet',
      updateBtn: 'Update Info/Log',
      placeholderNotes: 'Ex: Dietary preference, job status...',
      placeholderInteraction: 'Enter new interaction details...',
      statusOptions: ['New Friend', 'Inviting', 'Joined Event', 'Initiated', 'Seminar', 'Study Group'],
      relationshipOptions: ['Family', 'Friend', 'Colleague', 'Classmate', 'Introducer', 'Guarantor']
    },
    report: {
      title: 'Monthly Report',
      subtitle: 'Summarize your efforts and share easily.',
      generateBtn: 'Generate Report',
      preview: 'Preview',
      copy: 'Copy',
      copied: 'Copied',
      sections: {
        intro: ' Monthly Summary',
        recorder: 'Recorder',
        goal: '★ Monthly Goal',
        reflection: '1. Reflections',
        habit: '2. Habit Tracker',
        crm: '3. Caring Progress',
        next: '4. Next Month Outlook',
        noRecord: 'No records this month.',
        noHabit: 'No habit records this month.',
        noInteraction: 'No key interactions this month.'
      }
    },
    settings: {
      title: 'Settings',
      userProfile: 'User Profile',
      userName: 'Username',
      language: 'Language',
      appInfo: 'App Info',
      installGuide: 'How to install to Home Screen?',
      dataManagement: 'Data Management',
      backup: 'Backup Data (Export)',
      restore: 'Restore Data (Import)',
      restoreHint: 'Select a previously backed up .json file',
      backupSuccess: 'Backup file downloaded',
      restoreSuccess: 'Data restored successfully!',
      restoreError: 'Invalid file format.',
      designer: 'Designed by Camille Liu',
      newYearReset: 'New Year Reset',
      newYearResetDesc: 'Clear logs, Keep lists',
      resetConfirmTitle: 'Are you sure?',
      resetConfirmText: 'This will clear all check-in logs, journal entries, and monthly goals. Your contact list and habit items will remain.',
      resetSuccess: 'Reset successful. Happy New Year!'
    },
    common: {
      save: 'Save',
      cancel: 'Cancel',
      add: 'Add',
      edit: 'Edit',
      delete: 'Delete',
      confirm: 'Confirm',
      confirmDelete: 'Are you sure you want to delete this?',
      confirmDeleteHabit: 'Are you sure you want to delete this habit?',
      confirmDeleteWisdom: 'Are you sure you want to delete this quote?',
      back: 'Back'
    },
    encouragement: [
      "Great start! 🌱", 
      "3 days! Keep going! 🤗",
      "Almost a week! Shining! ✨",
      "Habit forming! Good job! 💪",
      "Almost half a month! Wow! 🌟",
      "Half month reached! 🤩",
      "Admirable persistence! 🌈",
      "21 days! A new you! 🦋",
      "Consistency pays off! 🚀",
      "Perfect month incoming! 🏆",
      "Master of perseverance! 👑"
    ],
    install: {
      title: 'Installation Guide',
      iosTitle: 'iOS (iPhone / iPad)',
      iosStep1: '1. Open this page in Safari',
      iosStep2: '2. Tap the "Share" button at the bottom',
      iosStep3: '3. Scroll down and tap "Add to Home Screen"',
      androidTitle: 'Android (Chrome)',
      androidStep1: '1. Open this page in Chrome',
      androidStep2: '2. Tap the menu icon (three dots) at top right',
      androidStep3: '3. Tap "Add to Home screen" or "Install App"'
    }
  }
};

// --- Helper Functions ---

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const isLastDayOfMonth = (date) => {
  const tomorrow = new Date(date);
  tomorrow.setDate(date.getDate() + 1);
  return tomorrow.getMonth() !== date.getMonth();
};

// --- Components (Theme Aware) ---

const Card = ({ children, className = "", style, ...props }) => (
  <div 
    className={`rounded-2xl shadow-sm border overflow-hidden ${className}`}
    style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)', ...style }}
    {...props}
  >
    {children}
  </div>
);

const Button = ({ children, onClick, variant = "primary", className = "", icon: Icon, style, ...props }) => {
  let btnStyle = {};
  
  if (variant === 'primary') {
    btnStyle = { backgroundColor: 'var(--primary)', color: 'white' };
  } else if (variant === 'secondary') {
    btnStyle = { backgroundColor: 'var(--secondary)', color: 'var(--text-main)' };
  } else if (variant === 'outline') {
    btnStyle = { border: '1px solid var(--border)', color: 'var(--text-sub)' };
  } else if (variant === 'danger') {
    btnStyle = { backgroundColor: '#FFEBEE', color: '#D32F2F' };
  } else if (variant === 'ghost') {
    btnStyle = { backgroundColor: 'transparent', color: 'var(--text-sub)' };
  }

  return (
    <button 
      type="button" 
      onClick={onClick} 
      className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 shadow-sm cursor-pointer ${className}`}
      style={{ ...btnStyle, ...style }}
      {...props}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

const Badge = ({ children }) => {
  return (
    <span 
      className="px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap"
      style={{ backgroundColor: 'var(--secondary)', color: 'var(--primary)' }}
    >
      {children}
    </span>
  );
};

// --- Calendar Helper ---
const getCalendarData = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
  return days;
};

const MiniCalendar = ({ year, month, completedDates, onToggleDate, small = false }) => {
  const days = getCalendarData(year, month);
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const todayStr = formatDate(new Date());

  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-300">
      <div className={`grid grid-cols-7 mb-1 text-center ${small ? 'text-[8px]' : 'text-[10px]'}`} style={{ color: 'var(--text-light)' }}>
        {weekDays.map(d => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, idx) => {
          if (!date) return <div key={`empty-${idx}`} />;
          
          const dateStr = formatDate(date);
          const isCompleted = completedDates.includes(dateStr);
          const isToday = dateStr === todayStr;
          
          return (
            <div 
              key={dateStr}
              onClick={() => onToggleDate && onToggleDate(dateStr)}
              className={`
                aspect-square flex items-center justify-center rounded-full text-[10px] font-medium transition-all cursor-pointer
                ${small ? 'h-4 w-4 text-[8px]' : 'h-7 w-7'}
              `}
              style={{
                backgroundColor: isCompleted ? 'var(--primary)' : 'transparent',
                color: isCompleted ? 'white' : 'var(--text-light)',
                border: isToday && !isCompleted ? '2px solid var(--primary)' : 'none',
                fontWeight: isToday ? 'bold' : 'normal'
              }}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- Main Application ---

export default function TaoGrowthApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Settings State
  const [language, setLanguage] = useState(() => localStorage.getItem('tao_language') || 'zh-TW');
  const [userName, setUserName] = useState(() => localStorage.getItem('tao_username') || '玟彤');

  const t = translations[language] || translations['zh-TW'];

  // Apply Theme Variables
  useEffect(() => {
    const root = document.documentElement;
    const c = themeColors;
    root.style.setProperty('--primary', c.primary);
    root.style.setProperty('--primary-hover', c.primaryHover);
    root.style.setProperty('--secondary', c.secondary);
    root.style.setProperty('--text-main', c.textMain);
    root.style.setProperty('--text-sub', c.textSub);
    root.style.setProperty('--text-light', c.textLight);
    root.style.setProperty('--bg', c.bg);
    root.style.setProperty('--card-bg', c.cardBg);
    root.style.setProperty('--border', c.border);
    root.style.setProperty('--accent', c.accent);
    root.style.setProperty('--accent-bg', c.accentBg);
  }, []);

  // Data State
  const [reflections, setReflections] = useState(() => {
    const saved = localStorage.getItem('tao_reflections');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('tao_contacts');
    return saved ? JSON.parse(saved) : [];
  });

  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('tao_habits');
    const parsed = saved ? JSON.parse(saved) : [];
    if (parsed.length === 0) {
        return [
            { id: 1, name: '每日讀經', completedDates: [], isCollapsed: false },
            { id: 2, name: '睡前感恩', completedDates: [], isCollapsed: false }
        ];
    }
    return parsed.map(h => ({ ...h, isCollapsed: h.isCollapsed || false }));
  });

  const [monthlyGoal, setMonthlyGoal] = useState(() => {
    return localStorage.getItem('tao_monthly_goal') || '';
  });

  const [wisdomQuotes, setWisdomQuotes] = useState(() => {
    const saved = localStorage.getItem('tao_wisdom_quotes');
    if (saved) return JSON.parse(saved);
    const oldLegacy = localStorage.getItem('tao_daily_reminder');
    return [{
      id: Date.now(),
      date: formatDate(new Date()),
      content: oldLegacy || "「成全自己」提升內修，\n「成全眾生」廣結善緣。\n不疾不徐，步步踏實。"
    }];
  });

  const [dashboardMemo, setDashboardMemo] = useState(() => {
    return localStorage.getItem('tao_dashboard_memo') || '';
  });

  // UI State
  const [isReflectionModalOpen, setReflectionModalOpen] = useState(false);
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [isWisdomModalOpen, setWisdomModalOpen] = useState(false);
  const [isHabitModalOpen, setHabitModalOpen] = useState(false);
  const [isHabitYearViewOpen, setHabitYearViewOpen] = useState(null); 
  const [deleteConfirm, setDeleteConfirm] = useState(null); 
  const [editingItem, setEditingItem] = useState(null);
  const [showCrmStats, setShowCrmStats] = useState(true); 
  const [isEditingReminder, setIsEditingReminder] = useState(false);
  const [isHabitSorting, setIsHabitSorting] = useState(false); 
  const [allHabitsCollapsed, setAllHabitsCollapsed] = useState(false); 
  const [editingHabit, setEditingHabit] = useState(null);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false); 
  
  // Search State
  const [searchTerm, setSearchTerm] = useState('');

  // Form Data State
  const [reflectionForm, setReflectionForm] = useState({ date: formatDate(new Date()), category: '內修省思', title: '', content: '', tags: '' });
  const [contactForm, setContactForm] = useState({ name: '', relationship: [], status: [], birthday: '', personalData: '', interactions: [], newInteractionDate: formatDate(new Date()), newInteractionContent: '' });
  const [wisdomForm, setWisdomForm] = useState({ date: formatDate(new Date()), content: '' });
  const [editingWisdomId, setEditingWisdomId] = useState(null);
  const [newHabitName, setNewHabitName] = useState('');
  const [editingInteractionId, setEditingInteractionId] = useState(null);
  const [tempInteraction, setTempInteraction] = useState({ date: '', content: '' });
  const [generatedReport, setGeneratedReport] = useState('');
  const [reportCopied, setReportCopied] = useState(false);

  // Persistence
  useEffect(() => { localStorage.setItem('tao_language', language); }, [language]);
  useEffect(() => { localStorage.setItem('tao_username', userName); }, [userName]);
  useEffect(() => { localStorage.setItem('tao_reflections', JSON.stringify(reflections)); }, [reflections]);
  useEffect(() => { localStorage.setItem('tao_contacts', JSON.stringify(contacts)); }, [contacts]);
  useEffect(() => { localStorage.setItem('tao_habits', JSON.stringify(habits)); }, [habits]);
  useEffect(() => { localStorage.setItem('tao_monthly_goal', monthlyGoal); }, [monthlyGoal]);
  useEffect(() => { localStorage.setItem('tao_wisdom_quotes', JSON.stringify(wisdomQuotes)); }, [wisdomQuotes]);
  useEffect(() => { localStorage.setItem('tao_dashboard_memo', dashboardMemo); }, [dashboardMemo]);

  // --- Logic Helpers ---
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 5) return t.dashboard.greeting.night;
    if (hour < 11) return t.dashboard.greeting.morning;
    if (hour < 14) return t.dashboard.greeting.noon;
    if (hour < 18) return t.dashboard.greeting.afternoon;
    return t.dashboard.greeting.evening;
  };

  const getGreetingIcon = () => {
    const hour = new Date().getHours();
    if (hour < 5 || hour >= 18) return <Moon size={18} style={{color: 'var(--primary)'}} />;
    if (hour < 11) return <Sunrise size={18} style={{color: 'var(--accent)'}} />;
    return <Sun size={18} style={{color: 'var(--accent)'}} />;
  };

  const calculateMonthCount = (completedDates) => {
    if (!completedDates) return 0;
    const today = new Date();
    const m = today.getMonth() + 1;
    const y = today.getFullYear();
    return completedDates.filter(dateStr => {
      const [y_d, m_d] = dateStr.split('-').map(Number);
      return m_d === m && y_d === y;
    }).length;
  };

  const getEncouragement = (count) => {
    const idx = Math.min(Math.floor(count / 3), t.encouragement.length - 1);
    return t.encouragement[idx];
  };

  // Stats Derived State
  const stats = useMemo(() => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const thisMonthReflections = reflections.filter(r => new Date(r.date).getMonth() === currentMonth).length;
    const thisMonthInteractions = contacts.filter(c => {
      const hasInteraction = c.interactions && c.interactions.some(i => {
        const d = new Date(i.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      });
      const legacyCheck = new Date(c.lastContact).getMonth() === currentMonth && new Date(c.lastContact).getFullYear() === currentYear;
      return hasInteraction || legacyCheck;
    }).length;
    return { thisMonth: thisMonthReflections, monthlyInteractions: thisMonthInteractions };
  }, [reflections, contacts]);

  const birthdayReminders = useMemo(() => {
    const today = new Date();
    const m = today.getMonth() + 1;
    const d = today.getDate();
    return contacts.filter(c => {
      if (!c.birthday) return false;
      const [_, mm, dd] = c.birthday.split('-');
      return parseInt(mm) === m && parseInt(dd) === d;
    });
  }, [contacts]);

  // Last Day Reminder Logic
  const isMonthEnd = useMemo(() => isLastDayOfMonth(new Date()), []);

  const crmOverview = useMemo(() => {
    const statusCounts = {};
    t.crm.statusOptions.forEach(op => statusCounts[op] = 0);
    contacts.forEach(c => {
      const statuses = Array.isArray(c.status) ? c.status : [c.status];
      statuses.forEach(s => { if (statusCounts[s] !== undefined) statusCounts[s]++; });
    });
    return { total: contacts.length, statusCounts };
  }, [contacts, language]);

  const filteredContacts = useMemo(() => {
    if (!searchTerm) return contacts;
    const term = searchTerm.toLowerCase();
    return contacts.filter(c => c.name.toLowerCase().includes(term) || (c.notes && c.notes.toLowerCase().includes(term)) || (c.personalData && c.personalData.toLowerCase().includes(term)));
  }, [contacts, searchTerm]);

  // --- Handlers ---
  const handleExportBackup = () => {
    const data = { version: 1, timestamp: new Date().toISOString(), userName, language, reflections, contacts, habits, monthlyGoal, wisdomQuotes, dashboardMemo };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tao_backup_${formatDate(new Date())}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleImportBackup = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.version && data.timestamp) {
	// eslint-disable-next-line no-restricted-globals
          if (confirm('Import backup? Existing data will be overwritten.')) {
            if (data.userName) setUserName(data.userName);
            if (data.language) setLanguage(data.language);
            if (data.reflections) setReflections(data.reflections);
            if (data.contacts) setContacts(data.contacts);
            if (data.habits) setHabits(data.habits);
            if (data.monthlyGoal) setMonthlyGoal(data.monthlyGoal);
            if (data.wisdomQuotes) setWisdomQuotes(data.wisdomQuotes);
            if (data.dashboardMemo) setDashboardMemo(data.dashboardMemo);
            alert(t.settings.restoreSuccess);
          }
        } else { alert(t.settings.restoreError); }
      } catch (err) { alert(t.settings.restoreError); }
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  const handleNewYearReset = () => {
    setReflections([]); 
    setMonthlyGoal(''); 
    setHabits(prev => prev.map(h => ({ ...h, completedDates: [] })));
    setDeleteConfirm(null);
    alert(t.settings.resetSuccess);
  };

  const toggleHabitDate = (id, dateStr) => setHabits(prev => prev.map(h => h.id === id ? { ...h, completedDates: h.completedDates.includes(dateStr) ? h.completedDates.filter(d => d !== dateStr) : [...h.completedDates, dateStr] } : h));
  
  // Drag and Drop Handlers (Fix: Attach drag to Handle ONLY)
  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = (e) => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const copyListItems = [...habits];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setHabits(copyListItems);
  };

  const moveHabit = (index, direction) => {
    const newHabits = [...habits];
    if (direction === 'up' && index > 0) {
      [newHabits[index], newHabits[index - 1]] = [newHabits[index - 1], newHabits[index]];
    } else if (direction === 'down' && index < newHabits.length - 1) {
      [newHabits[index], newHabits[index + 1]] = [newHabits[index + 1], newHabits[index]];
    }
    setHabits(newHabits);
  };
  
  const toggleAllHabits = () => {
    const newState = !allHabitsCollapsed;
    setAllHabitsCollapsed(newState);
    setHabits(prev => prev.map(h => ({ ...h, isCollapsed: newState })));
  };

  const toggleHabitCollapse = (id) => setHabits(prev => prev.map(h => h.id === id ? { ...h, isCollapsed: !h.isCollapsed } : h));

  const handleSaveHabit = () => {
    if (newHabitName.trim()) {
      if (editingHabit) {
        setHabits(prev => prev.map(h => h.id === editingHabit.id ? { ...h, name: newHabitName } : h));
      } else {
        setHabits(prev => [...prev, { id: Date.now(), name: newHabitName, completedDates: [], isCollapsed: false }]);
      }
      setNewHabitName('');
      setEditingHabit(null);
      setHabitModalOpen(false);
    }
  };

  const openEditHabit = (habit) => {
    setEditingHabit(habit);
    setNewHabitName(habit.name);
    setHabitModalOpen(true);
  };

  const handleDeleteHabit = (id) => { 
    setDeleteConfirm({ id, type: 'habit' });
  };
  
  const handleSaveWisdom = () => { if(wisdomForm.content.trim()) { if(editingWisdomId) { setWisdomQuotes(prev => prev.map(q => q.id === editingWisdomId ? {...q, ...wisdomForm} : q)); setEditingWisdomId(null); } else { setWisdomQuotes(prev => [{id: Date.now(), ...wisdomForm}, ...prev]); } setWisdomForm({date: formatDate(new Date()), content: ''}); }};
  const handleEditWisdom = (q) => { setEditingWisdomId(q.id); setWisdomForm({date: q.date, content: q.content}); };
  const handleDeleteWisdom = (id) => { 
      setDeleteConfirm({ id, type: 'wisdom' });
  };
  
  const handleSaveReflection = () => { if(reflectionForm.content) { const data = {...reflectionForm, title: reflectionForm.title.trim() || 'Untitled'}; if(editingItem) setReflections(prev => prev.map(i => i.id === editingItem.id ? {...data, id: editingItem.id} : i)); else setReflections(prev => [{...data, id: Date.now()}, ...prev]); setReflectionModalOpen(false); setEditingItem(null); setReflectionForm({date: formatDate(new Date()), category: t.reflection.options[0], title: '', content: '', tags: ''}); }};
  const handleSaveContact = () => { if(contactForm.name) { let interactions = [...(contactForm.interactions||[])]; if(contactForm.newInteractionContent.trim()) { interactions.push({id: Date.now(), date: contactForm.newInteractionDate, content: contactForm.newInteractionContent}); } interactions.sort((a,b)=>new Date(b.date)-new Date(a.date)); const newLastContact = interactions.length > 0 ? interactions[0].date : contactForm.newInteractionDate; const data = { id: editingItem ? editingItem.id : Date.now(), name: contactForm.name, relationship: contactForm.relationship || [], status: contactForm.status || [], birthday: contactForm.birthday, personalData: contactForm.personalData, interactions, lastContact: newLastContact }; if(editingItem) setContacts(prev => prev.map(i => i.id === editingItem.id ? data : i)); else setContacts(prev => [data, ...prev]); setContactModalOpen(false); setEditingItem(null); setContactForm({name: '', relationship: [], status: [], birthday: '', personalData: '', interactions: [], newInteractionDate: formatDate(new Date()), newInteractionContent: ''}); }};
  const startEditingInteraction = (i) => { setEditingInteractionId(i.id); setTempInteraction({date: i.date, content: i.content}); };
  const saveInteractionEdit = (id) => { const updated = contactForm.interactions.map(i => i.id === id ? {...i, date: tempInteraction.date, content: tempInteraction.content} : i).sort((a,b)=>new Date(b.date)-new Date(a.date)); setContactForm(prev => ({...prev, interactions: updated})); setEditingInteractionId(null); };
  const deleteInteraction = (id) => { 
      setDeleteConfirm({ id, type: 'interaction' });
  };
  
  const requestDelete = (id, type) => setDeleteConfirm({id, type});
  
  const confirmDelete = () => { 
    if(deleteConfirm) { 
      if (deleteConfirm.type === 'reset_new_year') {
        handleNewYearReset();
      } else if (deleteConfirm.type === 'reflection') {
        setReflections(prev => prev.filter(i => i.id !== deleteConfirm.id)); 
      } else if (deleteConfirm.type === 'contact') {
        setContacts(prev => prev.filter(i => i.id !== deleteConfirm.id));
      } else if (deleteConfirm.type === 'wisdom') { 
        setWisdomQuotes(prev => prev.filter(q => q.id !== deleteConfirm.id));
        if (editingWisdomId === deleteConfirm.id) {
           setEditingWisdomId(null);
           setWisdomForm({ date: formatDate(new Date()), content: '' });
        }
      } else if (deleteConfirm.type === 'habit') { 
        setHabits(prev => prev.filter(h => h.id !== deleteConfirm.id));
        if (isHabitYearViewOpen === deleteConfirm.id) setHabitYearViewOpen(null);
      } else if (deleteConfirm.type === 'interaction') { 
          setContactForm(prev => ({
              ...prev,
              interactions: prev.interactions.filter(i => i.id !== deleteConfirm.id)
          }));
          if (editingInteractionId === deleteConfirm.id) {
              setEditingInteractionId(null);
              setTempInteraction({ date: '', content: '' });
          }
      }
      setDeleteConfirm(null); 
    }
  };

  const openEditReflection = (item) => { setEditingItem(item); setReflectionForm({...item, title: item.title || ''}); setReflectionModalOpen(true); };
  const openEditContact = (item) => { setEditingItem(item); setContactForm({ name: item.name, relationship: Array.isArray(item.relationship) ? item.relationship : (item.relationship ? [item.relationship] : []), status: Array.isArray(item.status) ? item.status : [item.status], birthday: item.birthday || '', personalData: item.personalData || item.notes || '', interactions: item.interactions || [], newInteractionDate: formatDate(new Date()), newInteractionContent: '' }); setContactModalOpen(true); };
  
  const handleAddContact = () => {
    setEditingItem(null);
    setContactForm({ 
        name: '', relationship: [], status: [], birthday: '', personalData: '', interactions: [], 
        newInteractionDate: formatDate(new Date()), newInteractionContent: '' 
    });
    setContactModalOpen(true);
  };

  const handleAddReflection = () => {
    setEditingItem(null);
    setReflectionForm({ date: formatDate(new Date()), category: t.reflection.options[0], title: '', content: '', tags: '' });
    setReflectionModalOpen(true);
  }

  const toggleContactStatus = (e, option) => {
    if (e) e.preventDefault();
    setContactForm(prev => {
      const currentStatuses = Array.isArray(prev.status) ? prev.status : [];
      const newStatuses = currentStatuses.includes(option) 
        ? currentStatuses.filter(s => s !== option) 
        : [...currentStatuses, option];
      return { ...prev, status: newStatuses };
    });
  };

  const toggleContactRelationship = (e, option) => {
    if (e) e.preventDefault();
    setContactForm(prev => {
      const current = Array.isArray(prev.relationship) ? prev.relationship : [];
      const newRels = current.includes(option) 
        ? current.filter(r => r !== option) 
        : [...current, option];
      return { ...prev, relationship: newRels };
    });
  };

  const generateMonthlyReport = () => {
    const now = new Date(); const m = now.getMonth(); const y = now.getFullYear();
    const monthlyReflections = reflections.filter(r => { const d = new Date(r.date); return d.getMonth() === m && d.getFullYear() === y; });
    const monthlyContacts = contacts.filter(c => { const has = c.interactions && c.interactions.some(i => { const d = new Date(i.date); return d.getMonth() === m && d.getFullYear() === y; }); const leg = new Date(c.lastContact).getMonth() === m && new Date(c.lastContact).getFullYear() === y; return has || leg; });
    const activeHabits = habits.filter(h => h.completedDates.some(d => { const [yy, mm] = d.split('-').map(Number); return mm === m + 1 && yy === y; }));
    
    let txt = `【${y}年${m+1}${t.report.sections.intro}】\n${t.report.sections.recorder}：${userName}\n\n`;
    if(monthlyGoal) txt += `${t.report.sections.goal}：${monthlyGoal}\n\n`;
    txt += `${t.report.sections.reflection} (${monthlyReflections.length})\n`;
    if(monthlyReflections.length) monthlyReflections.forEach((r,i) => txt += `${i+1}. [${r.category}] ${r.title}\n`); else txt += t.report.sections.noRecord + "\n";
    txt += `\n${t.report.sections.habit}\n`;
    if(activeHabits.length) activeHabits.forEach(h => txt += `• ${h.name}：${t.habit.monthAchieve} ${calculateMonthCount(h.completedDates)} ${t.habit.days}\n`); else txt += t.report.sections.noHabit + "\n";
    txt += `\n${t.report.sections.crm} (${monthlyContacts.length})\n`;
    if(monthlyContacts.length) monthlyContacts.forEach((c,i) => { const st = Array.isArray(c.status)?c.status.join('、'):c.status; const rel = Array.isArray(c.relationship)?`[${c.relationship.join('/')}]`:(c.relationship?`[${c.relationship}]`:''); const last = c.interactions.length > 0 ? c.interactions[0].content : (c.notes || '...'); txt += `${i+1}. ${c.name} ${rel} (${st})：${last}\n`; }); else txt += t.report.sections.noInteraction + "\n";
    txt += `\n${t.report.sections.next}\n...`;
    setGeneratedReport(txt); setReportCopied(false);
  };
  const copyToClipboard = () => { 
    const textArea = document.createElement("textarea");
    textArea.value = generatedReport;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setReportCopied(true);
        setTimeout(() => setReportCopied(false), 2000);
      }
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
  };

  // --- Main Render ---
  return (
    <div className="min-h-screen font-sans flex justify-center" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-main)', transition: 'background-color 0.3s ease' }}>
      <div className="w-full max-w-md min-h-screen shadow-2xl relative flex flex-col" style={{ backgroundColor: 'var(--bg)' }}>
        
        {/* Header */}
        <header className="backdrop-blur-md border-b p-4 flex justify-between items-center sticky top-0 z-20" style={{ backgroundColor: 'var(--bg-opacity)', borderColor: 'var(--border)' }}>
          <h1 className="text-lg font-serif font-bold flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
            <div className="w-6 h-6 rounded flex items-center justify-center text-white text-xs" style={{ backgroundColor: 'var(--primary)' }}>道</div>
            {t.appTitle}
          </h1>
          <button onClick={() => setActiveTab('settings')} className="flex items-center gap-1 text-sm font-bold px-3 py-1 rounded-full transition-colors" style={{ backgroundColor: 'var(--secondary)', color: 'var(--primary)' }}>
            <User size={14} /> {userName}
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 p-5 overflow-y-auto scrollbar-hide">
          {activeTab === 'dashboard' && (
            <div className="space-y-5 pb-24 animate-in fade-in duration-500">
              {/* Last Day Reminder */}
              {isMonthEnd && (
                <div 
                  className="bg-orange-100 border border-orange-200 text-orange-800 p-3 rounded-xl flex items-center gap-3 shadow-sm cursor-pointer hover:bg-orange-200 transition-colors"
                  onClick={() => setActiveTab('report')}
                >
                  <Bell className="animate-bounce" size={20} />
                  <div className="text-sm font-bold">{t.dashboard.lastDayReminder}</div>
                </div>
              )}

              <div className="mb-2">
                 <div className="flex items-center gap-1 text-xs mb-1" style={{ color: 'var(--text-sub)' }}>{getGreetingIcon()} {getGreeting()}，</div>
                 <h2 className="text-2xl font-serif font-bold" style={{ color: 'var(--text-main)' }}>{userName}</h2>
                 <p className="text-xs mt-1" style={{ color: 'var(--text-light)' }}>{t.dashboard.intro}</p>
              </div>

              {/* Wisdom */}
              <div 
                className="rounded-2xl p-6 shadow-lg relative overflow-hidden group cursor-pointer" 
                style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }} 
                onClick={() => setWisdomModalOpen(true)}
              >
                <Leaf className="absolute -bottom-4 -right-4 opacity-20" size={120} />
                <div className="flex justify-between items-start mb-2 relative z-10">
                  <h3 className="font-serif text-lg font-bold flex items-center gap-2"><Sun size={18} style={{ color: 'var(--accent)' }} /> {t.dashboard.wisdom}</h3>
                  <List size={18} className="opacity-70" />
                </div>
                <div className="relative z-10 text-sm opacity-90 whitespace-pre-wrap">{wisdomQuotes.length ? wisdomQuotes[0].content : t.dashboard.wisdomPlaceholder}</div>
              </div>

              {/* Birthday */}
              {birthdayReminders.length > 0 && (
                <div className="rounded-2xl p-4 border shadow-sm animate-pulse" style={{ backgroundColor: 'var(--accent-bg)', borderColor: 'var(--border)' }}>
                  <h3 className="font-bold text-sm flex items-center gap-2 mb-2" style={{ color: 'var(--accent)' }}><Cake size={16} /> {t.dashboard.birthdayTitle}</h3>
                  <div className="flex flex-wrap gap-2 text-base">{birthdayReminders.map(c => <span key={c.id} className="bg-white px-3 py-1 rounded-full text-lg font-bold shadow-sm" style={{ color: 'var(--accent)' }}>{c.name}</span>)}</div>
                  <div className="text-[10px] mt-2 text-right" style={{ color: 'var(--text-light)' }}>{t.dashboard.birthdayWish}</div>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-4 border-none" style={{ backgroundColor: 'var(--accent-bg)' }}>
                  <div className="flex items-center gap-2 mb-2" style={{ color: 'var(--accent)' }}><BookOpen size={16} /><span className="text-xs font-bold">{t.dashboard.stats.reflection}</span></div>
                  <div className="text-3xl font-serif" style={{ color: 'var(--primary)' }}>{stats.thisMonth} <span className="text-xs font-sans opacity-60">{t.dashboard.stats.unit}</span></div>
                </Card>
                <Card className="p-4 border-none" style={{ backgroundColor: 'var(--secondary)' }}>
                  <div className="flex items-center gap-2 mb-2" style={{ color: 'var(--primary)' }}><Users size={16} /><span className="text-xs font-bold">{t.dashboard.stats.interaction}</span></div>
                  <div className="text-3xl font-serif" style={{ color: 'var(--text-main)' }}>{stats.monthlyInteractions} <span className="text-xs font-sans opacity-60">{t.dashboard.stats.unitPerson}</span></div>
                </Card>
              </div>

              {/* Goal */}
              {monthlyGoal && (
                <div className="p-4 rounded-2xl border shadow-sm flex items-start gap-3" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                   <div className="p-2 rounded-lg shrink-0" style={{ backgroundColor: 'var(--accent-bg)', color: 'var(--accent)' }}><Star size={20} fill="currentColor" /></div>
                   <div><div className="text-xs font-bold mb-1" style={{ color: 'var(--text-sub)' }}>{t.dashboard.goal}</div><div className="text-sm" style={{ color: 'var(--text-main)' }}>{monthlyGoal}</div></div>
                </div>
              )}

              {/* Memo */}
              <div className="rounded-2xl p-4 shadow-sm border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-2 mb-2 font-bold text-sm" style={{ color: 'var(--text-sub)' }}><StickyNote size={16} /> {t.dashboard.memo}</div>
                <textarea value={dashboardMemo} onChange={(e) => setDashboardMemo(e.target.value)} placeholder={t.dashboard.memoPlaceholder} className="w-full h-32 p-3 rounded-xl border outline-none text-sm transition-colors resize-none" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text-main)' }} />
              </div>
            </div>
          )}

          {activeTab === 'habit' && (
            <div className="space-y-4 pb-24 animate-in slide-in-from-right duration-300">
              <div className="flex justify-between items-center mb-2">
                <div><h2 className="text-xl font-serif font-bold" style={{ color: 'var(--text-main)' }}>{t.habit.title}</h2><p className="text-xs" style={{ color: 'var(--text-light)' }}>{isHabitSorting ? t.habit.mobileSortHint : t.habit.subtitle}</p></div>
                <div className="flex gap-2">
                  <Button onClick={toggleAllHabits} className="w-10 h-10 p-0 rounded-full" icon={allHabitsCollapsed ? Maximize2 : Minimize2} variant="secondary" />
                  <Button onClick={() => setIsHabitSorting(!isHabitSorting)} className="w-10 h-10 p-0 rounded-full" icon={ArrowUpDown} variant={isHabitSorting ? "primary" : "secondary"} />
                  <Button onClick={() => { setEditingHabit(null); setNewHabitName(''); setHabitModalOpen(true); }} className="w-10 h-10 p-0 rounded-full" icon={Plus} />
                </div>
              </div>
              {habits.length === 0 ? <div className="text-center py-12" style={{ color: 'var(--text-light)' }}><div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: 'var(--secondary)' }}><CheckSquare size={24} /></div><p className="text-sm">{t.habit.empty}</p></div> : (
                <div className="space-y-4">
                  {habits.map((habit, index) => {
                    const todayStr = formatDate(new Date()); const isCompleted = habit.completedDates.includes(todayStr); const monthCount = calculateMonthCount(habit.completedDates); const encouragement = getEncouragement(monthCount);
                    return (
                      <Card 
                        key={habit.id} 
                        className={`p-4 transition-all duration-300 ${isHabitSorting ? 'border-2 border-dashed' : ''}`}
                        style={isHabitSorting ? { borderColor: 'var(--primary)' } : {}}
                        // Card receives DROP event
                        onDragOver={(e) => { e.preventDefault(); if(isHabitSorting) dragEnter(e, index); }}
                        onDrop={drop}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-3 w-full">
                            {isHabitSorting ? (
                              <div 
                                // HANDLE is the drag SOURCE
                                draggable 
                                onDragStart={(e) => dragStart(e, index)} 
                                style={{ color: 'var(--text-light)' }} 
                                className="cursor-grab active:cursor-grabbing p-2"
                              >
                                <GripVertical size={20} />
                              </div>
                            ) : (
                              <button onClick={() => toggleHabitDate(habit.id, todayStr)} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 shadow-sm ${isCompleted ? 'scale-105' : ''}`} style={{ backgroundColor: isCompleted ? 'var(--primary)' : 'var(--card-bg)', borderColor: isCompleted ? 'var(--primary)' : 'var(--border)', color: isCompleted ? 'white' : 'transparent' }}><Check size={20} strokeWidth={3} /></button>
                            )}
                            
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                                  {habit.name}
                                  {!isHabitSorting && (
                                    <button onClick={() => openEditHabit(habit)} className="text-[#BCAAA4] hover:text-[#8D6E63]">
                                      <Edit3 size={14} />
                                    </button>
                                  )}
                                </h3>
                                <button onClick={() => setHabitYearViewOpen(habit.id)} className="text-xs flex items-center gap-1 hover:underline px-2 py-0.5 rounded-full whitespace-nowrap" style={{ color: 'var(--text-sub)', backgroundColor: 'var(--secondary)' }}><BarChart2 size={10} /> {t.habit.yearView}</button>
                              </div>
                              {monthCount > 0 && <span className="text-[10px] flex items-center gap-1 font-medium mt-0.5" style={{ color: 'var(--accent)' }}><Award size={10} fill="currentColor" /> {t.habit.monthAchieve} {monthCount} {t.habit.days}，{encouragement}</span>}
                            </div>
                          </div>
                          
                          {!isHabitSorting && (
                            <div className="flex items-center gap-1">
                              <button onClick={() => toggleHabitCollapse(habit.id)} className="p-1.5 hover:bg-black/5 rounded-full" style={{ color: 'var(--text-sub)' }}>{habit.isCollapsed ? <ChevronDown size={16}/> : <ChevronUp size={16}/>}</button>
                              <button onClick={() => handleDeleteHabit(habit.id)} className="ml-1 p-1.5 hover:text-red-400" style={{ color: 'var(--text-light)' }}><Trash2 size={16} /></button>
                            </div>
                          )}
                          
                          {isHabitSorting && (
                             <div className="flex flex-col ml-1">
                               <button onClick={() => moveHabit(index, 'up')} disabled={index === 0} className={`p-0.5 ${index===0?'opacity-20':'hover:text-[var(--primary)]'}`} style={{ color: 'var(--text-light)' }}><ArrowUp size={16} /></button>
                               <button onClick={() => moveHabit(index, 'down')} disabled={index === habits.length-1} className={`p-0.5 ${index===habits.length-1?'opacity-20':'hover:text-[var(--primary)]'}`} style={{ color: 'var(--text-light)' }}><ArrowDown size={16} /></button>
                             </div>
                          )}
                        </div>
                        
                        {!habit.isCollapsed && !allHabitsCollapsed && !isHabitSorting && (
                          <div className="rounded-xl p-3 border animate-in slide-in-from-top-2 duration-200" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}>
                            <div className="flex justify-between items-center mb-2"><span className="text-xs font-bold" style={{ color: 'var(--text-light)' }}>{new Date().getFullYear()} / {new Date().getMonth() + 1}</span></div>
                            <MiniCalendar year={new Date().getFullYear()} month={new Date().getMonth()} completedDates={habit.completedDates} onToggleDate={(d) => toggleHabitDate(habit.id, d)} />
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'reflection' && (
            <div className="space-y-4 pb-24 animate-in slide-in-from-right duration-300">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-serif font-bold" style={{ color: 'var(--text-main)' }}>{t.reflection.title}</h2>
                {/* Fixed: Add Button */}
                <Button onClick={handleAddReflection} className="w-10 h-10 p-0 rounded-full" icon={Plus} />
              </div>
              <Card className="p-4 border" style={{ backgroundColor: 'var(--accent-bg)', borderColor: 'var(--accent)' }}>
                <label className="flex items-center gap-2 text-xs font-bold mb-2" style={{ color: 'var(--accent)' }}><Star size={14} /> {t.dashboard.goal}</label>
                <textarea rows={1} value={monthlyGoal} onChange={(e) => setMonthlyGoal(e.target.value)} placeholder={t.reflection.titlePlaceholder} className="w-full bg-transparent border-b outline-none text-sm py-1 resize-none" style={{ borderColor: 'var(--accent)', color: 'var(--text-main)' }} />
              </Card>
              <div className="space-y-3">
                {reflections.length === 0 ? <div className="text-center py-12" style={{ color: 'var(--text-light)' }}><div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: 'var(--secondary)' }}><Coffee size={24} /></div><p className="text-sm">{t.reflection.empty}</p></div> : 
                  reflections.sort((a, b) => new Date(b.date) - new Date(a.date)).map(item => (
                  <Card key={item.id} className="p-4 active:scale-[0.99] transition-transform">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex gap-2 items-center"><span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--secondary)', color: 'var(--text-sub)' }}>{item.date}</span><Badge>{item.category}</Badge></div>
                      <div className="flex gap-2">
                        <button onClick={() => openEditReflection(item)} className="p-2 hover:opacity-70" style={{ color: 'var(--text-light)' }}><FileText size={16}/></button>
                        <button onClick={() => requestDelete(item.id, 'reflection')} className="p-2 hover:text-red-400" style={{ color: '#E57373' }}><Trash2 size={16}/></button>
                      </div>
                    </div>
                    <h4 className="font-bold mb-1" style={{ color: 'var(--text-main)' }}>{item.title || "Untitled"}</h4>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed opacity-80" style={{ color: 'var(--text-main)' }}>{item.content}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'crm' && (
            <div className="space-y-4 pb-24 animate-in slide-in-from-right duration-300">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-serif font-bold" style={{ color: 'var(--text-main)' }}>{t.crm.title}</h2>
                  <div className="flex gap-2">
                    <Button onClick={() => setShowCrmStats(!showCrmStats)} variant="ghost" className="w-10 h-10 p-0 rounded-full border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}><BarChart2 size={18} /></Button>
                    {/* Fixed: Add Button */}
                    <Button onClick={handleAddContact} className="w-10 h-10 p-0 rounded-full" icon={Plus} />
                  </div>
                </div>
                {showCrmStats && (
                  <div className="p-4 rounded-xl shadow-md overflow-x-auto" style={{ backgroundColor: 'var(--primary)', color: 'var(--secondary)' }}>
                    <div className="text-xs font-bold mb-2 flex items-center gap-1 uppercase tracking-wider opacity-80">{t.crm.statsTitle} ({t.crm.total} {crmOverview.total})</div>
                    <div className="flex gap-3">{Object.entries(crmOverview.statusCounts).map(([status, count]) => (
                        <div key={status} className="px-3 py-2 rounded-lg flex-shrink-0 min-w-[80px] text-center border" style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }}>
                          <div className="text-xl font-bold text-white leading-none mb-1">{count}</div><div className="text-[10px] opacity-80">{status}</div>
                        </div>
                      ))}</div>
                  </div>
                )}
                <div className="relative">
                  <Search className="absolute left-3 top-3" size={18} style={{ color: 'var(--text-light)' }} />
                  <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={t.crm.searchPlaceholder} className="w-full pl-10 pr-4 py-2.5 rounded-xl outline-none text-sm border focus:ring-1" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)', color: 'var(--text-main)' }} />
                </div>
              </div>
              <div className="space-y-3">
                {contacts.length === 0 ? <div className="text-center py-12" style={{ color: 'var(--text-light)' }}><div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: 'var(--secondary)' }}><Users size={24} /></div><p className="text-sm">{t.crm.empty}</p></div> : 
                  filteredContacts.length === 0 ? <div className="text-center py-12 text-sm" style={{ color: 'var(--text-light)' }}>{t.crm.notFound}</div> : 
                  filteredContacts.sort((a, b) => new Date(b.lastContact) - new Date(a.lastContact)).map(item => {
                    const displayStatus = (Array.isArray(item.status) ? item.status : [item.status]).filter(s => s && typeof s === 'string');
                    const displayRel = (Array.isArray(item.relationship) ? item.relationship : (item.relationship ? [item.relationship] : [])).filter(r => r && typeof r === 'string');
                    const latestInteraction = item.interactions && item.interactions.length > 0 ? item.interactions[0] : null;
                    
                    return (
                      <Card key={item.id} className="p-4 active:scale-[0.99] transition-transform">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-lg font-bold flex flex-wrap items-center gap-2 mb-1" style={{ color: 'var(--text-main)' }}>
                              {item.name} 
                              {item.birthday && <span className="text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1" style={{ backgroundColor: 'var(--accent-bg)', color: 'var(--accent)' }}><Gift size={10}/> {item.birthday.slice(5)}</span>}
                            </h3>
                            <div className="flex gap-1 flex-wrap">
                              {displayRel.map(r => (
                                <span key={r} className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-sub)' }}>{r}</span>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col gap-1 items-end">
                            {displayStatus.map(s => <Badge key={s}>{s}</Badge>)}
                          </div>
                        </div>
                        <div className="text-sm mb-2" style={{ color: 'var(--text-sub)' }}>
                          <div className="font-bold text-xs mb-0.5 flex items-center gap-1" style={{ color: 'var(--text-light)' }}><User size={10} /> {t.crm.personalData.split(' ')[0]}</div>
                          <div className="pl-4 border-l-2 line-clamp-2" style={{ borderColor: 'var(--secondary)' }}>{item.personalData || item.notes || "..."}</div>
                        </div>
                        <div className="p-3 rounded-xl text-sm mb-3 border" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text-main)' }}>
                          <div className="font-bold text-xs mb-1 flex items-center gap-1" style={{ color: 'var(--text-light)' }}><MessageCircle size={10} /> {t.crm.interactionLog} ({latestInteraction ? latestInteraction.date : '...'})</div>
                          <div className="line-clamp-2">{latestInteraction ? latestInteraction.content : "..."}</div>
                        </div>
                        <div className="flex justify-end gap-2 pt-2 border-t" style={{ borderColor: 'var(--bg)' }}>
                          <button onClick={() => openEditContact(item)} className="text-xs font-bold flex items-center gap-1 px-2 py-1 rounded transition-colors hover:bg-opacity-10" style={{ color: 'var(--text-sub)' }}>{t.crm.updateBtn} <ChevronRight size={12} /></button>
                          <button onClick={() => deleteInteraction(item.id)} className="ml-2 px-2" style={{ color: '#E57373' }}><Trash2 size={14} /></button>
                        </div>
                      </Card>
                    );
                  })}
              </div>
            </div>
          )}

          {activeTab === 'report' && (
            <div className="animate-in slide-in-from-right duration-300 pb-24">
              <div className="text-center mb-6 pt-4">
                <h2 className="text-xl font-serif font-bold" style={{ color: 'var(--text-main)' }}>{t.report.title}</h2>
                <p className="text-sm px-8" style={{ color: 'var(--text-light)' }}>{t.report.subtitle}</p>
              </div>
              <div className="flex justify-center mb-6 px-4"><Button onClick={generateMonthlyReport} className="w-full shadow-lg">{t.report.generateBtn}</Button></div>
              {generatedReport && (
                <div className="mx-4 rounded-2xl shadow-lg border overflow-hidden animate-in fade-in slide-in-from-bottom-4" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                  <div className="border-b p-3 flex justify-between items-center" style={{ backgroundColor: 'var(--secondary)', borderColor: 'var(--border)' }}>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-main)' }}>{t.report.preview}</span>
                    <button onClick={copyToClipboard} className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full transition-colors shadow-sm" style={{ backgroundColor: reportCopied ? 'var(--primary)' : 'var(--card-bg)', color: reportCopied ? 'white' : 'var(--text-main)' }}>{reportCopied ? <><Check size={12}/> {t.report.copied}</> : <><Copy size={12}/> {t.report.copy}</>}</button>
                  </div>
                  <textarea className="w-full h-80 p-4 font-mono text-sm leading-relaxed focus:outline-none resize-none" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-main)' }} value={generatedReport} onChange={(e) => setGeneratedReport(e.target.value)} />
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6 pb-24 animate-in slide-in-from-right duration-300 p-2">
              <div className="mb-4 flex items-center gap-2">
                <button onClick={() => setActiveTab('dashboard')} style={{ color: 'var(--text-sub)' }}><ChevronLeft size={24} /></button>
                <h2 className="text-2xl font-serif font-bold" style={{ color: 'var(--text-main)' }}>{t.settings.title}</h2>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wide ml-1" style={{ color: 'var(--text-light)' }}>{t.settings.userProfile}</h3>
                <Card className="p-4">
                  <div className="mb-4">
                    <label className="block text-xs font-bold mb-1" style={{ color: 'var(--text-sub)' }}>{t.settings.userName}</label>
                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full p-3 rounded-xl outline-none border" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text-main)' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1" style={{ color: 'var(--text-sub)' }}>{t.settings.language}</label>
                    <div className="flex gap-2">
                      {['zh-TW', 'en'].map(lang => (
                        <button key={lang} onClick={() => setLanguage(lang)} className={`flex-1 p-2 rounded-lg border flex items-center justify-center gap-2 transition-colors`} style={{ backgroundColor: language === lang ? 'var(--primary)' : 'var(--bg)', color: language === lang ? 'white' : 'var(--text-main)', borderColor: 'var(--border)' }}>{lang === 'zh-TW' ? '繁體中文' : 'English'}</button>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Install Guide */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wide ml-1" style={{ color: 'var(--text-light)' }}>{t.settings.appInfo}</h3>
                <Card className="p-4">
                  <button 
                    onClick={() => setIsInstallModalOpen(true)}
                    className="w-full flex items-center justify-between p-3 rounded-xl transition-colors hover:bg-opacity-50" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-main)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center border" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--primary)', borderColor: 'var(--border)' }}>
                        <ArrowDown size={20} />
                      </div>
                      <div className="text-left font-bold">{t.settings.installGuide}</div>
                    </div>
                    <ChevronRight size={18} style={{ color: 'var(--text-light)' }} />
                  </button>
                </Card>
              </div>

              {/* Data Management */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wide ml-1" style={{ color: 'var(--text-light)' }}>{t.settings.dataManagement}</h3>
                <Card className="p-4 space-y-4">
                  <button onClick={handleExportBackup} className="w-full flex items-center justify-between p-3 rounded-xl transition-colors hover:bg-opacity-50" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-main)' }}>
                    <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full flex items-center justify-center border" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--primary)', borderColor: 'var(--border)' }}><Download size={20} /></div><div className="text-left"><div className="font-bold">{t.settings.backup}</div><div className="text-xs" style={{ color: 'var(--text-light)' }}>.json</div></div></div>
                    <ChevronRight size={18} style={{ color: 'var(--text-light)' }} />
                  </button>
                  <div className="relative w-full">
                    <input type="file" accept=".json" onChange={handleImportBackup} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <div className="w-full flex items-center justify-between p-3 rounded-xl transition-colors hover:bg-opacity-50" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-main)' }}>
                      <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full flex items-center justify-center border" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--primary)', borderColor: 'var(--border)' }}><Upload size={20} /></div><div className="text-left"><div className="font-bold">{t.settings.restore}</div><div className="text-xs" style={{ color: 'var(--text-light)' }}>{t.settings.restoreHint}</div></div></div>
                      <ChevronRight size={18} style={{ color: 'var(--text-light)' }} />
                    </div>
                  </div>
                </Card>
              </div>

              {/* New Year Reset (Danger Zone) */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wide ml-1" style={{ color: '#E57373' }}>⚠️ {t.settings.newYearReset}</h3>
                <Card className="p-4 border-red-100 bg-red-50/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-bold text-red-700">{t.settings.newYearReset}</div>
                    <RotateCcw size={18} className="text-red-400" />
                  </div>
                  <p className="text-xs text-red-600 mb-4 opacity-80">{t.settings.newYearResetDesc}</p>
                  <button 
                    onClick={() => setDeleteConfirm({ type: 'reset_new_year', id: null })}
                    className="w-full py-2 bg-red-100 text-red-600 rounded-lg text-xs font-bold hover:bg-red-200 transition-colors"
                  >
                    {t.settings.newYearReset}
                  </button>
                </Card>
              </div>

              <div className="text-center mt-12 mb-6"><p className="text-xs font-serif tracking-wider" style={{ color: 'var(--text-light)' }}>{t.settings.designer}</p></div>
            </div>
          )}

        </main>

        {/* Bottom Tabs */}
        <div className="fixed bottom-0 w-full max-w-md border-t flex justify-around p-2 pb-safe z-30 shadow-lg" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}>
          {[
            { id: 'dashboard', icon: BookOpen, label: t.tabs.dashboard },
            { id: 'habit', icon: CheckSquare, label: t.tabs.habit },
            { id: 'reflection', icon: FileText, label: t.tabs.reflection },
            { id: 'crm', icon: Users, label: t.tabs.crm },
            { id: 'report', icon: Copy, label: t.tabs.report },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all ${activeTab === tab.id ? 'scale-110' : ''}`} style={{ color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-light)' }}>
              <div className="mb-1"><tab.icon size={20} strokeWidth={activeTab === tab.id ? 2.5 : 2} /></div><span className="text-[9px] font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Modals are kept same logic but using theme variables for colors */}
        {/* Habit Modal (Add) */}
        {isHabitModalOpen && (
          <div className="absolute inset-0 z-50 animate-in slide-in-from-bottom duration-300 flex flex-col items-center justify-center p-6 backdrop-blur-sm bg-opacity-90" style={{ backgroundColor: 'var(--bg)' }}>
            <div className="rounded-2xl shadow-2xl p-6 w-full max-w-xs border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}>
              <h3 className="text-lg font-bold mb-4 text-center" style={{ color: 'var(--text-main)' }}>{editingHabit ? t.habit.editTitle : t.habit.addTitle}</h3>
              <input type="text" value={newHabitName} onChange={(e) => setNewHabitName(e.target.value)} placeholder={t.habit.addPlaceholder} className="w-full p-3 border rounded-xl outline-none mb-4 text-center" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text-main)' }} autoFocus />
              <div className="flex gap-2"><Button onClick={() => setHabitModalOpen(false)} variant="secondary" className="flex-1">{t.common.cancel}</Button><Button onClick={handleSaveHabit} className="flex-1">{t.common.save}</Button></div>
            </div>
          </div>
        )}

        {/* Habit Year View Modal */}
        {isHabitYearViewOpen && (
          <div className="fixed inset-0 z-[60] animate-in slide-in-from-bottom duration-300 flex flex-col" style={{ backgroundColor: 'var(--bg)' }}>
            <div className="p-4 border-b flex justify-between items-center" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}>
              <button onClick={() => setHabitYearViewOpen(null)} className="font-medium text-sm flex items-center gap-1" style={{ color: 'var(--text-sub)' }}>
                <ChevronLeft size={20} /> {t.common.back}
              </button>
              <h3 className="font-bold text-lg" style={{ color: 'var(--text-main)' }}>{t.habit.yearView}</h3>
              <div className="w-8"></div>
            </div>
            
            <div className="p-5 flex-1 overflow-y-auto">
              {habits.filter(h => h.id === isHabitYearViewOpen).map(habit => {
                const year = new Date().getFullYear();
                const totalCompleted = habit.completedDates.filter(d => d.startsWith(`${year}`)).length;
                
                return (
                  <div key={habit.id} className="space-y-6 max-w-md mx-auto">
                    <div className="text-center">
                      <h2 className="text-2xl font-serif font-bold mb-1" style={{ color: 'var(--text-main)' }}>{habit.name}</h2>
                      <div className="text-xs inline-block px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--secondary)', color: 'var(--text-light)' }}>
                        {year}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl border text-center" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                        <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>{totalCompleted}</div>
                        <div className="text-xs" style={{ color: 'var(--text-light)' }}>{t.habit.yearTotal}</div>
                      </div>
                      <div className="p-3 rounded-xl border text-center" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                        <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>{Math.round((totalCompleted / 365) * 100)}%</div>
                        <div className="text-xs" style={{ color: 'var(--text-light)' }}>{t.habit.yearRate}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 pb-10">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="p-3 rounded-xl border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                          <div className="text-xs font-bold mb-2" style={{ color: 'var(--text-light)' }}>{i + 1}</div>
                          <MiniCalendar 
                            year={year} 
                            month={i} 
                            completedDates={habit.completedDates} 
                            onToggleDate={(dateStr) => toggleHabitDate(habit.id, dateStr)}
                            small 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Wisdom History Modal */}
        {isWisdomModalOpen && (
          <div className="absolute inset-0 z-50 bg-[#FFF9F5] animate-in slide-in-from-bottom duration-300 flex flex-col">
            <div className="p-4 border-b border-[#EBE0D6] flex justify-between items-center bg-white">
              <button onClick={() => { setWisdomModalOpen(false); setEditingWisdomId(null); setWisdomForm({ date: formatDate(new Date()), content: '' }); }} className="text-[#8D6E63] font-medium text-sm">{t.common.back}</button>
              <h3 className="font-bold text-[#5D4037]">{t.dashboard.wisdom}</h3>
              <div className="w-8"></div>
            </div>
            
            <div className="p-5 flex-1 overflow-y-auto">
              <div className="bg-white border border-[#EBE0D6] rounded-xl p-4 shadow-sm mb-6">
                <h4 className="text-xs font-bold text-[#A1887F] mb-2 flex items-center gap-1">
                  <Edit3 size={12} /> {editingWisdomId ? t.common.edit : t.common.add}
                </h4>
                <input 
                  type="date" 
                  value={wisdomForm.date} 
                  onChange={e => setWisdomForm({...wisdomForm, date: e.target.value})} 
                  className="w-full p-2 mb-2 border-b border-[#EBE0D6] outline-none text-[#5D4037] text-sm bg-transparent" 
                />
                <textarea 
                  rows={3} 
                  value={wisdomForm.content} 
                  onChange={e => setWisdomForm({...wisdomForm, content: e.target.value})} 
                  className="w-full p-2 outline-none text-[#5D4037] text-base resize-none bg-transparent placeholder-[#D7CCC8]" 
                  placeholder="..." 
                />
                <div className="flex justify-end mt-2">
                  {editingWisdomId && (
                    <button 
                      onClick={() => { setEditingWisdomId(null); setWisdomForm({ date: formatDate(new Date()), content: '' }); }}
                      className="text-xs text-[#8D6E63] mr-3 px-2 py-1"
                    >
                      {t.common.cancel}
                    </button>
                  )}
                  <button 
                    onClick={handleSaveWisdom}
                    className="bg-[#8D6E63] text-white text-xs px-4 py-2 rounded-lg font-bold shadow-sm active:scale-95 transition-transform"
                  >
                    {t.common.save}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {wisdomQuotes.map((quote) => (
                  <div key={quote.id} className={`p-4 rounded-xl border border-[#EBE0D6] bg-white ${editingWisdomId === quote.id ? 'ring-2 ring-[#8D6E63] border-transparent' : ''}`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold text-white bg-[#D7CCC8] px-2 py-1 rounded-full">
                        {quote.date}
                      </span>
                      <div className="flex gap-2">
                        <button onClick={() => handleEditWisdom(quote)} className="text-[#BCAAA4] hover:text-[#8D6E63]">
                          <Edit3 size={14} />
                        </button>
                        <button onClick={() => handleDeleteWisdom(quote.id)} className="text-[#E57373] hover:text-[#C62828]">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="text-[#5D4037] text-sm whitespace-pre-wrap leading-relaxed">
                      {quote.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="absolute inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-400">
                {deleteConfirm.type === 'reset_new_year' ? <RefreshCw size={24} /> : <Trash2 size={24} />}
              </div>
              <h3 className="text-lg font-bold text-[#5D4037] mb-2">{t.common.confirmDelete}</h3>
              <p className="text-sm text-[#8D6E63] mb-6">
                {deleteConfirm.type === 'reset_new_year' ? t.settings.resetConfirmText : '...'}
              </p>
              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5">
                  {t.common.cancel}
                </Button>
                <Button variant="danger" onClick={confirmDelete} className="flex-1 py-2.5">
                  {t.common.confirm}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Reflection Modal */}
        {isReflectionModalOpen && (
          <div className="absolute inset-0 z-50 bg-[#FFF9F5] animate-in slide-in-from-bottom duration-300 flex flex-col">
            <div className="p-4 border-b border-[#EBE0D6] flex justify-between items-center bg-white">
              <button onClick={() => setReflectionModalOpen(false)} className="text-[#8D6E63] font-medium text-sm">{t.common.cancel}</button>
              <h3 className="font-bold text-[#5D4037]">{editingItem ? t.reflection.editTitle : t.reflection.addTitle}</h3>
              <button onClick={handleSaveReflection} className="text-[#8D6E63] font-bold text-sm">{t.common.save}</button>
            </div>
            <div className="p-5 space-y-5 flex-1 overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-[#A1887F] mb-1.5">{t.reflection.date}</label>
                <input type="date" value={reflectionForm.date} onChange={e => setReflectionForm({...reflectionForm, date: e.target.value})} className="w-full p-3 bg-white border border-[#EBE0D6] rounded-xl outline-none text-[#5D4037]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#A1887F] mb-1.5">{t.reflection.category}</label>
                <select value={reflectionForm.category} onChange={e => setReflectionForm({...reflectionForm, category: e.target.value})} className="w-full p-3 bg-white border border-[#EBE0D6] rounded-xl outline-none text-[#5D4037]">
                  {t.reflection.options.map(op => <option key={op}>{op}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#A1887F] mb-1.5">{t.reflection.titleLabel}</label>
                <input 
                  type="text" 
                  value={reflectionForm.title} 
                  onChange={e => setReflectionForm({...reflectionForm, title: e.target.value})} 
                  placeholder={t.reflection.titlePlaceholder}
                  className="w-full p-3 bg-white border border-[#EBE0D6] rounded-xl outline-none text-[#5D4037] font-bold placeholder-[#D7CCC8]" 
                />
              </div>
              <div className="h-full">
                <label className="block text-xs font-bold text-[#A1887F] mb-1.5">{t.reflection.content}</label>
                <textarea rows={10} value={reflectionForm.content} onChange={e => setReflectionForm({...reflectionForm, content: e.target.value})} className="w-full p-3 bg-white border border-[#EBE0D6] rounded-xl outline-none text-[#5D4037] text-base leading-relaxed" placeholder={t.reflection.contentPlaceholder} />
              </div>
            </div>
          </div>
        )}

        {/* Contact Modal */}
        {isContactModalOpen && (
          <div className="absolute inset-0 z-50 bg-[#FFF9F5] animate-in slide-in-from-bottom duration-300 flex flex-col">
            <div className="p-4 border-b border-[#EBE0D6] flex justify-between items-center bg-white">
              <button onClick={() => setContactModalOpen(false)} className="text-[#8D6E63] font-medium text-sm">{t.common.cancel}</button>
              <h3 className="font-bold text-[#5D4037]">{editingItem ? t.crm.editTitle : t.crm.addTitle}</h3>
              <button onClick={handleSaveContact} className="text-[#8D6E63] font-bold text-sm">{t.common.save}</button>
            </div>
            <div className="p-5 space-y-5 flex-1 overflow-y-auto">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#A1887F] mb-1.5">{t.crm.name}</label>
                  <input type="text" value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} className="w-full p-3 bg-white border border-[#EBE0D6] rounded-xl outline-none text-[#5D4037]" placeholder="" />
                </div>
                
                {/* Relationship Field */}
                <div>
                  <label className="block text-xs font-bold text-[#A1887F] mb-1.5 flex items-center gap-1">
                    <Heart size={12} /> {t.crm.relationship}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {t.crm.relationshipOptions.map(rel => {
                      const isSelected = Array.isArray(contactForm.relationship) && contactForm.relationship.includes(rel);
                      return (
                        <button
                          key={rel}
                          type="button" 
                          onClick={(e) => toggleContactRelationship(e, rel)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${isSelected ? 'bg-[#8D6E63] text-white border-[#8D6E63]' : 'bg-white text-[#5D4037] border-[#EBE0D6]'}`}
                        >
                          {rel} {isSelected && <Check size={12} className="inline ml-1"/>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                   <label className="block text-xs font-bold text-[#A1887F] mb-2 flex items-center gap-1">
                     <Tag size={12} /> {t.crm.status}
                   </label>
                   <div className="grid grid-cols-2 gap-2">
                     {t.crm.statusOptions.map(option => {
                       const isSelected = contactForm.status.includes(option);
                       return (
                         <button
                          key={option}
                          type="button" 
                          onClick={(e) => toggleContactStatus(e, option)}
                          className={`p-2 rounded-lg text-sm font-medium transition-all border ${isSelected ? 'bg-[#8D6E63] text-white border-[#8D6E63]' : 'bg-white text-[#5D4037] border-[#EBE0D6]'}`}
                         >
                           {option} {isSelected && <Check size={12} className="inline ml-1"/>}
                         </button>
                       );
                     })}
                   </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#A1887F] mb-1.5">{t.crm.birthday}</label>
                  <input type="date" value={contactForm.birthday} onChange={e => setContactForm({...contactForm, birthday: e.target.value})} className="w-full p-3 bg-white border border-[#EBE0D6] rounded-xl outline-none text-[#5D4037]" />
                </div>
              </div>
              
              {/* Personal Data Section */}
              <div>
                <label className="block text-xs font-bold text-[#A1887F] mb-1.5 flex items-center gap-1">
                  <User size={12}/> {t.crm.personalData}
                </label>
                <textarea rows={3} value={contactForm.personalData} onChange={e => setContactForm({...contactForm, personalData: e.target.value})} className="w-full p-3 bg-white border border-[#EBE0D6] rounded-xl outline-none text-[#5D4037]" placeholder={t.crm.placeholderNotes} />
              </div>

              {/* Interaction Log Section */}
              <div className="border-t border-[#EBE0D6] pt-4 mt-2">
                <label className="block text-xs font-bold text-[#A1887F] mb-3 flex items-center gap-1">
                  <MessageCircle size={12}/> {t.crm.interactionLog}
                </label>
                <div className="bg-white border border-[#EBE0D6] rounded-xl p-3 mb-4 shadow-sm">
                  <input 
                    type="date" 
                    value={contactForm.newInteractionDate} 
                    onChange={e => setContactForm({...contactForm, newInteractionDate: e.target.value})} 
                    className="w-full p-2 mb-2 border-b border-[#EBE0D6] outline-none text-[#5D4037] text-sm" 
                  />
                  <textarea 
                    rows={2} 
                    value={contactForm.newInteractionContent} 
                    onChange={e => setContactForm({...contactForm, newInteractionContent: e.target.value})} 
                    className="w-full p-2 outline-none text-[#5D4037] text-sm resize-none" 
                    placeholder={t.crm.placeholderInteraction}
                  />
                </div>

                {/* History List (Editable) */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#A1887F] mb-1 flex items-center gap-1">
                    <History size={12}/> {t.crm.history}
                  </label>
                  {contactForm.interactions && contactForm.interactions.length > 0 ? (
                    contactForm.interactions.map((interaction) => (
                      <div key={interaction.id} className="bg-[#FAFAFA] border border-[#F5F5F5] rounded-lg p-3 text-sm group">
                        {editingInteractionId === interaction.id ? (
                          // Edit Mode
                          <div className="space-y-2">
                            <input 
                              type="date" 
                              value={tempInteraction.date}
                              onChange={(e) => setTempInteraction({...tempInteraction, date: e.target.value})}
                              className="w-full p-2 bg-white border border-[#EBE0D6] rounded text-[#5D4037] text-xs"
                            />
                            <textarea
                              value={tempInteraction.content}
                              onChange={(e) => setTempInteraction({...tempInteraction, content: e.target.value})}
                              className="w-full p-2 bg-white border border-[#EBE0D6] rounded text-[#5D4037] text-sm resize-none"
                              rows={2}
                            />
                            <div className="flex justify-end gap-2">
                              <button onClick={() => setEditingInteractionId(null)} className="text-xs text-[#8D6E63] px-2 py-1">{t.common.cancel}</button>
                              <button onClick={() => saveInteractionEdit(interaction.id)} className="text-xs bg-[#8D6E63] text-white px-2 py-1 rounded">{t.common.save}</button>
                            </div>
                          </div>
                        ) : (
                          // View Mode
                          <>
                            <div className="flex justify-between items-start mb-1">
                              <div className="text-xs text-[#8D6E63] font-bold">{interaction.date}</div>
                              <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => startEditingInteraction(interaction)} className="text-[#BCAAA4] hover:text-[#8D6E63]">
                                  <Edit3 size={14} />
                                </button>
                                <button onClick={() => deleteInteraction(interaction.id)} className="text-[#E57373] hover:text-[#C62828]">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                            <div className="text-[#5D4037] whitespace-pre-wrap">{interaction.content}</div>
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-xs text-[#D7CCC8] py-2">{t.crm.noHistory}</div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Install Guide Modal */}
        {isInstallModalOpen && (
          <div className="absolute inset-0 z-50 animate-in slide-in-from-bottom duration-300 flex flex-col p-6 backdrop-blur-sm bg-opacity-95" style={{ backgroundColor: 'var(--bg)' }}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold" style={{ color: 'var(--text-main)' }}>{t.install.title}</h3>
              <button onClick={() => setIsInstallModalOpen(false)} style={{ color: 'var(--text-sub)' }}><X size={24} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-8">
              {/* iOS */}
              <div>
                <h4 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--primary)' }}>
                  <span className="text-2xl">🍎</span> {t.install.iosTitle}
                </h4>
                <div className="space-y-4 text-sm" style={{ color: 'var(--text-main)' }}>
                  <div className="p-3 rounded-xl border flex items-start gap-3" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                     <div className="mt-0.5"><Globe size={18} /></div>
                     <div>{t.install.iosStep1}</div>
                  </div>
                  <div className="p-3 rounded-xl border flex items-start gap-3" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                     <div className="mt-0.5"><Settings size={18} className="rotate-90" /></div>
                     <div>{t.install.iosStep2}</div>
                  </div>
                  <div className="p-3 rounded-xl border flex items-start gap-3" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                     <div className="mt-0.5"><PlusSquare size={18} /></div>
                     <div>{t.install.iosStep3}</div>
                  </div>
                </div>
              </div>

              {/* Android */}
              <div>
                <h4 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--primary)' }}>
                  <span className="text-2xl">🤖</span> {t.install.androidTitle}
                </h4>
                <div className="space-y-4 text-sm" style={{ color: 'var(--text-main)' }}>
                  <div className="p-3 rounded-xl border flex items-start gap-3" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                     <div className="mt-0.5"><Globe size={18} /></div>
                     <div>{t.install.androidStep1}</div>
                  </div>
                  <div className="p-3 rounded-xl border flex items-start gap-3" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                     <div className="mt-0.5"><Settings size={18} className="rotate-90" /></div>
                     <div>{t.install.androidStep2}</div>
                  </div>
                  <div className="p-3 rounded-xl border flex items-start gap-3" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                     <div className="mt-0.5"><Download size={18} /></div>
                     <div>{t.install.androidStep3}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <Button onClick={() => setIsInstallModalOpen(false)} className="w-full mt-4">OK</Button>
          </div>
        )}
      </div>
    </div>
  );
}
