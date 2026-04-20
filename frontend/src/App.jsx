import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, X, Search, Filter, Settings, LayoutGrid, ChevronRight, MoreVertical, Download, Moon, Sun, Bell, BellOff, ArchiveRestore, Archive, Mail, Lock, User } from 'lucide-react';
import companyLogo from './assets/images/developershub_corporation_logo.jpg';
import myProfile from './assets/images/My_LinkedIn_Profile.jpg';
import siteFavicon from './assets/images/favicon.svg'

const AuthScreen = ({ onEnter, onAuth, user, setTables }) => {
  const [step, setStep] = useState(0); // 0: Center Intro, 1: Slide Left & Show Form, 2: Fade Out
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Auto-slide to the left after 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setStep(1), 2500);
    return () => clearTimeout(timer);
  }, []);

 const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
        const success = await onAuth(
            { email: formData.email, password: formData.password },
            "login"
        );
        if (success) setStep(2);
    } else {
        const success = await onAuth(formData, "register");
        if (success) setStep(2);
    }
};

  const handleGuestEntry = () => {
    const guestUser = {
      id: "guest",
      name: "Guest User",
      email: "guest@local"
    };

    const guestToken = "guest_token_123";

    // Use correct keys
    localStorage.setItem("taskly_user", JSON.stringify(guestUser));
    localStorage.setItem("taskly_token", guestToken);

    // Directly update App state via onAuth
    onAuth(
      {
        token: guestToken,
        user: guestUser
      },
      "guest"
    );

    setStep(2);
  };

  return (
    <AnimatePresence>
      {step < 2 && (
        <motion.div
          exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="min-h-screen bg-[#F0F9FF] flex items-center justify-center p-6 overflow-hidden"
        >
          <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-12">

            {/* LEFT SIDE: Intro & Logos */}
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, x: step === 1 ? -20 : 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center text-center max-w-md"
            >
              {/* Company Logo Placeholder */}
              <div>
                <img src={siteFavicon} alt="Company Logo" className="w-full h-full object-cover text-[10px] text-gray-400" />
              </div>

              <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight mb-4">
                Task Management System
              </h1>

              <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                <span>by a Software Developer</span>
                {/* Your LinkedIn Profile Pic */}
                <a href="https://www.linkedin.com/in/khawaja-qasid-183744285/" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border-2 border-blue-500 overflow-hidden hover:scale-110 transition-transform shadow-md">
                  <img src={myProfile} alt="My Profile" className="w-full h-full object-cover bg-gray-200 text-[8px]" />
                </a>
                <span>at</span>
                {/* Company LinkedIn Profile Pic */}
                <a href="https://www.linkedin.com/company/developershub-corporation" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-md border-2 border-blue-500 overflow-hidden hover:scale-110 transition-transform shadow-md">
                  <img src={companyLogo} alt="Company Profile" className="w-full h-full object-cover bg-gray-200 text-[8px]" />
                </a>
              </div>
            </motion.div>

            {/* RIGHT SIDE: Auth Form */}
            <AnimatePresence>
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 50, filter: "blur(5px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl border border-blue-50"
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-6">
                    {isLogin ? "Welcome Back" : "Create an Account"}
                  </h2>

                  <form className="space-y-4" onSubmit={handleSubmit}>
                    {!isLogin && (
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-gray-50"
                            placeholder="Khawaja Qasid"
                          />
                        </div>
                      </div>
                    )}
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-gray-50"
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                          type="password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-gray-50"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <button type="submit" className="w-full py-2.5 mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-md shadow-blue-500/30">
                      {isLogin ? "Sign In" : "Register"}
                    </button>
                  </form>

                  <div className="mt-6 flex flex-col items-center gap-4">
                    <button onClick={() => setIsLogin(!isLogin)} className="text-[12px] font-medium text-gray-500 hover:text-blue-600 transition-colors">
                      {isLogin ? "Don't have an account? Register" : "Already have an account? Sign In"}
                    </button>

                    <div className="w-full border-t border-gray-100 relative">
                      <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-white px-2 text-[10px] font-bold text-gray-400 uppercase">OR</span>
                    </div>

                    <button onClick={handleGuestEntry} className="text-[13px] font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-lg transition-all active:scale-95">
                      Continue as a Guest
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function App() {
  const [token, setToken] = useState(localStorage.getItem("taskly_token") || null);
  const [user, setUser] = useState(() => {
    try {
      const data = localStorage.getItem("taskly_user");
      return (data && data !== "undefined" && data !== "null") ? JSON.parse(data) : null;
    } catch (err) {
      console.error("Local storage parse error:", err);
      return null;
    }
  });
  const [tables, setTables] = useState([]);
  const [isAppVisible, setIsAppVisible] = useState(!!token);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTable, setActiveTable] = useState(0);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [newTableName, setNewTableName] = useState("");
  const [isRemoveTableModalOpen, setIsRemoveTableModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [sourceTableId, setSourceTableId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [showArchivedList, setShowArchivedList] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [draggedOverTableId, setDraggedOverTableId] = useState(null);

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [editUserData, setEditUserData] = useState({
    name: user?.name || "",
    email: user?.email || ""
  });

  const handleAuth = async (formData, endpoint) => {

    // ✅ HANDLE GUEST WITHOUT API CALL
    if (endpoint === "guest") {
      localStorage.setItem("taskly_token", formData.token);
      localStorage.setItem("taskly_user", JSON.stringify(formData.user));

      setToken(formData.token);
      setUser(formData.user);
      setTimeout(() => setIsAppVisible(true), 800);

      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("taskly_token", data.token);
        localStorage.setItem("taskly_user", JSON.stringify(data.user));

        setToken(data.token);
        setUser(data.user);
        setTimeout(() => setIsAppVisible(true), 800);
        return true;
      } else {
        alert(data.message || "Authentication failed");
        return false;
      }
    } catch (err) {
      console.error("Auth error:", err);
    }
  };

  // Notification State
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const notifTimeoutRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("taskly_token");
    localStorage.removeItem("taskly_user");
    setToken(null);
    setUser(null);
    setIsAppVisible(false);

  };

  // 🔧 FIX #1: LOAD DATA when user logs in - Handle both _id and id
  useEffect(() => {
    if (!user || user.id === "guest") {
      setTables([]);
      return;
    }

    const fetchTablesAndTasks = async () => {
      try {
        // 🔥 FIX: Use user._id OR user.id (backend might return different field names)
        const userId = user._id || user.id;
        console.log("🔍 FETCHING DATA FOR USER ID:", userId);
        console.log("🔍 FULL USER OBJECT:", user);

        // 1️⃣ FETCH TABLES FIRST
        const tableRes = await fetch(`http://localhost:5000/api/tables/${userId}`);
        const tableData = await tableRes.json();

        console.log("📊 TABLES FROM DB:", tableData);

        // Create base tables
        const tableMap = {};
        tableData.forEach(t => {
          tableMap[String(t.tableId)] = {
            id: t.tableId,
            title: t.title,
            tasks: [],
            isArchived: false
          };
        });

        // 2️⃣ FETCH TASKS
        const taskRes = await fetch(`http://localhost:5000/api/tasks/${userId}`);
        const taskData = await taskRes.json();

        console.log("✅ TASKS FROM DB:", taskData);

        // 3️⃣ ASSIGN TASKS TO TABLES
        taskData.forEach(task => {
          const key = String(task.tableId);
          if (!tableMap[task.tableId]) {
            // fallback if table missing
            tableMap[task.tableId] = {
              id: task.tableId,
              title: `Table ${task.tableId}`,
              tasks: [],
              isArchived: false
            };
          }

          tableMap[task.tableId].tasks.push({
            ...task,
            id: task._id // IMPORTANT FIX - use MongoDB _id
          });
        });

        // 4️⃣ SET STATE
        const loadedTables = Object.values(tableMap);
        console.log("🎯 FINAL TABLES TO RENDER:", loadedTables);
        setTables(loadedTables);

      } catch (err) {
        console.error("❌ Fetch error:", err);
        setTables([]);
      }
    };

    fetchTablesAndTasks();
  }, [user]);

  const [filters, setFilters] = useState({
    status: "All",
    beforeDate: "",
    isFilterOpen: false
  });

  // --- Core Table Logic ---
  const activeTables = tables.filter(t => !t.isArchived);
  const archivedTablesList = tables.filter(t => t.isArchived);

  // Logic to find the current active table or return null if none exist
  const currentTable =
    activeTables.find(t => t.id === activeTable) ||
    activeTables[0] ||
    null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskData, setNewTaskData] = useState({ title: "", description: "", dueDate: "" });

  // Handle Notification Toggle and 5-minute Delay
  const toggleNotifications = () => {
    if (!isNotificationsEnabled) {
      Notification.requestPermission().then(perm => {
        if (perm === 'granted') {
          setIsNotificationsEnabled(true);
          // Fire immediately once so the user knows it's working
          triggerDueNotification();
        }
      });
    } else {
      setIsNotificationsEnabled(false);
      if (notifTimeoutRef.current) clearTimeout(notifTimeoutRef.current);
    }
  };
  const triggerDueNotification = () => {
    if (!isNotificationsEnabled && Notification.permission !== "granted") return;

    const today = new Date().toLocaleDateString('en-CA'); // Matches YYYY-MM-DD reliably

    tables.forEach(table => {
      if (table.isArchived) return; // Don't notify for archived tables
      table.tasks.forEach(task => {
        if (task.dueDate === today && task.status === "Pending") {
          new Notification("Taskly Reminder", {
            body: `Your task "${task.title}" is due today!`,
            icon: "/favicon.ico"
          });
        }
      });
    });

    // Re-schedule next check
    notifTimeoutRef.current = setTimeout(triggerDueNotification, 300000);
  };

  // --- Helper Functions ---

  const handleRenameTable = async (newName) => {
    const updatedTables = tables.map(table =>
      table.id === activeTable ? { ...table, title: newName } : table
    );
    setTables(updatedTables);

    // Save to DB
    try {
      await fetch(`http://localhost:5000/api/tables/${activeTable}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newName })
      });
    } catch (err) {
      console.error('Rename error:', err);
    }
  };

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tables));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "taskly_backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    setIsSettingsOpen(false);
  };

  const markAllCompleted = () => {
    if (!currentTable) return;
    const updatedTables = tables.map(table =>
      table.id === currentTable.id
        ? { ...table, tasks: table.tasks.map(t => ({ ...t, status: "Completed" })) }
        : table
    );
    setTables(updatedTables);
    setIsMoreMenuOpen(false);
  };

  const archiveTable = () => {
    if (!currentTable) return;
    const updatedTables = tables.map(table =>
      table.id === currentTable.id ? { ...table, isArchived: true } : table
    );
    setTables(updatedTables);
    setIsMoreMenuOpen(false);
  };

  const unarchiveTable = (id) => {
    const updatedTables = tables.map(table =>
      table.id === id ? { ...table, isArchived: false } : table
    );
    setTables(updatedTables);
    setActiveTable(id);
  };

  // 🔧 FIX #2: Fixed table creation to use the title as identifier
  const submitNewTable = async (e) => {
    e.preventDefault();

    if (!newTableName.trim()) return;

    // 🔥 FIX: Generate a unique numeric ID (keep this for internal tracking)
    const uniqueTableId = String(Date.now());

    const newTable = {
      id: uniqueTableId,
      title: newTableName, // This is what the user sees
      tasks: [],
      isArchived: false
    };

    setTables([...tables, newTable]);

    // 🔥 FIX: Use user._id OR user.id
    const userId = user._id || user.id;

    try {
      await fetch("http://localhost:5000/api/tables", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: userId,
          tableId: uniqueTableId, // Send the numeric ID
          title: newTableName // Send the actual title/name
        })
      });

      console.log("✅ Table created:", { userId, tableId: uniqueTableId, title: newTableName });

    } catch (err) {
      console.error("❌ Table save error:", err);
    }

    setActiveTable(newTable.id);
    setIsTableModalOpen(false);
    setNewTableName("");
  };

  const deleteSpecificTable = async (tableId) => {
    try {
        await fetch(`http://localhost:5000/api/tables/${tableId}`, {
            method: 'DELETE'
        });
    } catch (err) {
        console.error('Delete table error:', err);
    }

    const updatedTables = tables.filter((table) => table.id !== tableId);
    setTables(updatedTables);
};

  const handleDropTask = async (e, targetTableId) => {
    e.preventDefault();
    setDraggedOverTableId(null);

    if (!draggedTaskId || targetTableId === sourceTableId) return;

    let taskToMove = null;

    // 🔍 STEP 1: Find the task BEFORE state update
    const sourceTable = tables.find(t => t.id === sourceTableId);
    if (sourceTable) {
      taskToMove = sourceTable.tasks.find(t => t.id === draggedTaskId);
    }

    if (!taskToMove) return;

    // 🌐 STEP 2: UPDATE DATABASE FIRST
    try {
      await fetch(`http://localhost:5000/api/tasks/${taskToMove._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tableId: targetTableId
        })
      });
    } catch (err) {
      console.error("Move task error:", err);
      return; // stop if DB fails
    }

    // 🎯 STEP 3: UPDATE FRONTEND STATE
    setTables(prevTables => {
      let movedTask = null;

      const updated = prevTables.map(table => {
        if (table.id === sourceTableId) {
          movedTask = table.tasks.find(t => t.id === draggedTaskId);
          return {
            ...table,
            tasks: table.tasks.filter(t => t.id !== draggedTaskId)
          };
        }
        return table;
      });

      return updated.map(table => {
        if (table.id === targetTableId && movedTask) {
          return {
            ...table,
            tasks: [...table.tasks, movedTask]
          };
        }
        return table;
      });
    });

    setDraggedTaskId(null);
  };

  // 🔧 FIX #3: Fixed task submission to use correct user ID
  const submitNewTask = async (e) => {
    e.preventDefault();
    if (!currentTable) return;

    const userId = user._id || user.id;

    if (editingTaskId) {
      // Edit existing task
      const updatedTables = tables.map(table => {
        if (String(table.id) === String(currentTable.id)) {
          return {
            ...table,
            tasks: table.tasks.map(t =>
              String(t.id) === String(editingTaskId) ? { ...t, ...newTaskData } : t
            )
          };
        }
        return table;
      });
      setTables(updatedTables);
    } else {
      // Create new task
      const newTask = {
        userId: userId,
        tableId: String(currentTable.id),
        tableTitle: currentTable.title,
        title: newTaskData.title,
        description: newTaskData.description || "No description provided.",
        status: "Pending",
        dueDate: newTaskData.dueDate || new Date().toISOString().split('T')[0]
      };

      try {
        const res = await fetch("http://localhost:5000/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask)
        });

        const savedTask = await res.json();
        console.log("Task saved to DB:", savedTask);

        // Use MongoDB _id as the id
        const taskWithId = {
          ...savedTask,
          id: savedTask._id
        };

        setTables(prevTables => prevTables.map(table => {
          if (String(table.id) === String(currentTable.id)) {
            return { ...table, tasks: [...table.tasks, taskWithId] };
          }
          return table;
        }));

      } catch (err) {
        console.error("Save error:", err);
      }
    }

    setIsModalOpen(false);
    setEditingTaskId(null);
    setNewTaskData({ title: "", description: "", dueDate: "" });
  };

  const deleteSpecificTask = (taskId) => {
    if (!currentTable) return;
    const updatedTables = tables.map(table => {
      if (String(table.id) === String(currentTable.id)) {
        // Check both .id (frontend) and ._id (MongoDB)
        return { ...table, tasks: table.tasks.filter((task) => String(task.id) !== String(taskId) && String(task._id) !== String(taskId)) };
      }
      return table;
    });
    setTables(updatedTables);
  };

  const toggleTaskStatus = async (taskId) => {
    if (!currentTable) return;

    // Pehle current status dhundo
    let newStatus = "";
    const updatedTables = tables.map(table => {
        if (String(table.id) === String(currentTable.id)) {
            return {
                ...table,
                tasks: table.tasks.map(t => {
                    if (String(t.id) === String(taskId) || String(t._id) === String(taskId)) {
                        newStatus = t.status === "Completed" ? "Pending" : "Completed";
                        return { ...t, status: newStatus };
                    }
                    return t;
                })
            };
        }
        return table;
    });

    setTables(updatedTables);

    // DB mein save karo
    try {
        await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });
    } catch (err) {
        console.error('Status update error:', err);
    }
};

  // --- Derived Data ---
  const completedCount = currentTable ? currentTable.tasks.filter(t => t.status === "Completed").length : 0;
  const totalCount = currentTable ? currentTable.tasks.length : 0;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredSidebarTables = activeTables.filter(table =>
    table.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleTasks = currentTable ? currentTable.tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filters.status === "All" || task.status === filters.status;
    const matchesDate = !filters.beforeDate || new Date(task.dueDate) <= new Date(filters.beforeDate);
    return matchesSearch && matchesStatus && matchesDate;
  }) : [];

  if (!isAppVisible) {
    return <AuthScreen onEnter={() => setIsAppVisible(true)} onAuth={handleAuth} />;
  }

  const handleUpdateProfile = async () => {
    if (!editUserData.name.trim() || !editUserData.email.trim()) {
      alert("Name and Email cannot be empty.");
      return;
    }

    console.log("ATTEMPTING UPDATE WITH DATA:", editUserData);

    try {
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editUserData),
      });

      if (response.ok) {
        const data = await response.json();

        // Use the server's response to ensure IDs (like _id vs id) are consistent
        const updatedUser = data.user || { ...user, ...editUserData };

        setUser(updatedUser);
        localStorage.setItem("taskly_user", JSON.stringify(updatedUser));
        setIsEditProfileModalOpen(false);
      } else {
        const errData = await response.json();
        console.error("SERVER ERROR:", errData);
        alert(errData.message || "Update failed");
      }
    } catch (err) {
      console.error("NETWORK ERROR:", err);
      alert("CONNECTION ERROR: Is your backend running on port 5000?");
    }
  };
  // --- MAIN APP RENDER ---
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-slate-900 text-white" : "bg-[#F0F9FF]"}`}>
      <header className={`${darkMode ? "bg-slate-800 border-slate-700" : "bg-white"} shadow-sm px-4 py-2 flex items-center gap-4`}>
        <div className="flex items-center gap-2 pr-4 border-r border-gray-100">
          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
            <LayoutGrid size={14} className="text-white" />
          </div>
          <span className="font-bold text-sm tracking-tight text-blue-600 font-sans uppercase">TASKLY</span>
        </div>

        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Task Actions</span>
        <button onClick={() => setIsModalOpen(true)} className="p-1.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all active:scale-90"><Plus size={15} /></button>
        <button onClick={() => setIsRemoveModalOpen(true)} className="p-1.5 rounded bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-90"><Minus size={15} /></button>

        <div className="flex-grow flex items-center gap-2 max-w-2xl mx-auto relative">
          <div className="relative flex-grow">
            <Search className={`absolute left-2.5 top-1/2 transform -translate-y-1/2 transition-colors ${searchQuery ? 'text-blue-500' : 'text-gray-400'}`} size={13} />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search tasks or tables..." className={`w-full pl-8 pr-10 py-1.5 border rounded text-[12px] focus:outline-none focus:ring-1 focus:ring-blue-400 ${darkMode ? "bg-slate-700 border-slate-600" : "bg-gray-50 border-gray-200"}`} />
          </div>

          <div className="relative">
            <button onClick={() => setFilters({ ...filters, isFilterOpen: !filters.isFilterOpen })} className={`flex items-center gap-1.5 px-3 py-1.5 border rounded text-[12px] transition-all z-50 relative ${filters.status !== "All" || filters.beforeDate ? 'bg-blue-600 border-blue-600 text-white' : (darkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200 text-gray-600')}`}><Filter size={13} /><span>Filter</span></button>
            <AnimatePresence>
              {filters.isFilterOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setFilters({ ...filters, isFilterOpen: false })} />
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className={`absolute right-0 mt-2 w-72 shadow-2xl rounded-xl border z-50 p-5 ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white"}`}>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-3">Status</label>
                        <div className={`flex p-1 rounded-lg gap-1 ${darkMode ? "bg-slate-700" : "bg-gray-100"}`}>
                          {["All", "Pending", "Completed"].map((s) => (
                            <button key={s} onClick={() => setFilters({ ...filters, status: s })} className={`flex-1 py-1.5 rounded-md text-[11px] font-bold ${filters.status === s ? (darkMode ? 'bg-slate-600 text-white' : 'bg-white text-blue-600') : 'text-gray-500'}`}>{s}</button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-3">Due Before</label>
                        <input type="date" value={filters.beforeDate} onChange={(e) => setFilters({ ...filters, beforeDate: e.target.value })} className={`w-full text-[12px] p-2.5 border rounded-lg outline-none ${darkMode ? "bg-slate-700 border-slate-600" : "bg-gray-50"}`} />
                        {(filters.status !== "All" || filters.beforeDate) && (
                          <button
                            onClick={() => setFilters({ status: "All", beforeDate: "", isFilterOpen: false })}
                            className="w-full mt-2 py-2 text-[11px] font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-dashed border-red-200"
                          >
                            Reset All Filters
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>



        <div className="relative">
          <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className="p-2 text-gray-400 hover:text-blue-600 ml-2 transition-colors">
            <Settings size={17} />
          </button>
          <AnimatePresence>

            {isSettingsOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsSettingsOpen(false)} />
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className={`absolute right-0 mt-2 w-64 shadow-2xl rounded-xl border z-50 p-2 overflow-hidden ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white"}`}>
                  <button onClick={() => setDarkMode(!darkMode)} className={`w-full flex items-center gap-3 px-3 py-2.5 text-[11px] font-bold uppercase rounded-lg transition-colors ${darkMode ? "hover:bg-slate-700 text-gray-300" : "hover:bg-gray-50 text-gray-600"}`}>
                    {darkMode ? <Sun size={14} className="text-yellow-400" /> : <Moon size={14} />}
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </button>
                  <button onClick={exportData} className={`w-full flex items-center gap-3 px-3 py-2.5 text-[11px] font-bold uppercase rounded-lg transition-colors ${darkMode ? "hover:bg-slate-700 text-gray-300" : "hover:bg-gray-50 text-gray-600"}`}>
                    <Download size={14} /> Export Backup
                  </button>
                  <button onClick={toggleNotifications} className={`w-full flex items-center justify-between px-3 py-2.5 text-[11px] font-bold uppercase rounded-lg transition-colors ${isNotificationsEnabled ? "bg-blue-50 text-blue-600" : (darkMode ? "hover:bg-slate-700 text-gray-300" : "hover:bg-gray-50 text-gray-600")}`}>
                    <div className="flex items-center gap-3">
                      {isNotificationsEnabled ? <Bell size={14} /> : <BellOff size={14} />}
                      Notifications
                    </div>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded ${isNotificationsEnabled ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}>{isNotificationsEnabled ? "ENABLED" : "DISABLED"}</span>
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Auth Section: Show Login if Guest, Show Profile if Logged In */}
        {!(token && user && user.id !== "guest") ? (
          <button
            onClick={() => setIsAppVisible(false)}
            className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-lg transition-all shadow-md active:scale-95 uppercase"
          >
            <User size={14} />
            Login / Register
          </button>
        ) : (
          <div className="relative group">
            <button className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-full transition-all">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold uppercase border-2 border-white shadow-sm">
                {user?.name ? user.name.charAt(0) : "U"}
              </div>
            </button>

            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <div className="px-4 py-2 border-b border-gray-50 mb-1">
                {/* Fix: Explicitly show user name or 'Loading...' instead of defaulting to Guest while logged in */}
                <p className="text-[12px] font-bold text-gray-800 truncate">{user?.name || "Loading..."}</p>
                <p className="text-[10px] text-gray-400 truncate">{user?.email || ""}</p>
              </div>
              <button
                onClick={() => {
                  setEditUserData({ name: user?.name || "", email: user?.email || "" });
                  setIsEditProfileModalOpen(true);
                }}
                className="w-full text-left px-4 py-2 text-[11px] font-bold text-gray-600 hover:bg-blue-50 transition-colors uppercase"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-[11px] font-bold text-red-500 hover:bg-red-50 transition-colors uppercase"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      <div className="h-screen flex flex-col overflow-hidden font-sans">
        <div className="flex flex-1 overflow-hidden">
          <aside className={`w-[30%] border-r p-4 flex flex-col gap-4 ${darkMode ? "bg-slate-800/50 border-slate-700" : "border-blue-100 bg-blue-50/30"}`}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">My Tables</h2>
              <div className="flex gap-1">
                <button onClick={() => setIsTableModalOpen(true)} className="text-blue-500 hover:bg-blue-100 p-1 rounded transition-colors"><Plus size={14} /></button>
                <button onClick={() => setIsRemoveTableModalOpen(true)} className="text-red-400 hover:bg-red-50 p-1 rounded transition-colors"><Minus size={14} /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {filteredSidebarTables.map((table, index) => (
                <motion.div
                  key={table.id}
                  whileHover={{ x: 4 }}
                  onClick={() => setActiveTable(table.id)}
                  onDragOver={(e) => { e.preventDefault(); setDraggedOverTableId(table.id); }}
                  onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setDraggedOverTableId(null); }}
                  onDrop={(e) => { setDraggedOverTableId(null); handleDropTask(e, table.id); }}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${draggedOverTableId === table.id
                    ? (darkMode ? 'bg-slate-600 border-dashed border-2 border-blue-400 scale-105' : 'bg-blue-50 border-dashed border-2 border-blue-500 scale-105 shadow-md')
                    : activeTable === table.id
                      ? (darkMode ? 'bg-slate-700 border-blue-500 border text-white' : 'bg-white shadow-sm border border-blue-200 text-blue-600')
                      : 'text-gray-600 hover:bg-white/50 border border-transparent'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${activeTable === table.id ? 'bg-blue-500' : 'bg-gray-300'}`} />
                    <span className="text-[13px] font-medium">
                      {table.title} <span className="text-[11px] opacity-60 ml-1">({table.tasks.length})</span>
                    </span>
                  </div>
                  <ChevronRight size={14} className={activeTable === table.id ? 'opacity-100' : 'opacity-0'} />
                </motion.div>
              ))}

              {/* Archived Section */}
              {archivedTablesList.length > 0 && (
                <div className="mt-8 border-t border-gray-200 pt-4">
                  <button onClick={() => setShowArchivedList(!showArchivedList)} className="flex items-center justify-between w-full text-[10px] font-bold text-gray-400 uppercase mb-2 hover:text-blue-500">
                    <span>Archived ({archivedTablesList.length})</span>
                    <Archive size={12} />
                  </button>
                  {showArchivedList && archivedTablesList.map(table => (
                    <div key={table.id} className="flex items-center justify-between p-2 rounded text-gray-400 bg-gray-100/50 mb-1">
                      <span className="text-[12px] italic">{table.title}</span>
                      <button onClick={() => unarchiveTable(table.id)} className="p-1 hover:bg-blue-100 text-blue-400 rounded"><ArchiveRestore size={14} /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>

          <main className={`w-[70%] p-6 overflow-y-auto ${darkMode ? "bg-slate-900" : "bg-white"}`}>
            {currentTable ? (
              <>
                <header className="flex justify-between items-center mb-6">
                  <div className="flex-grow mr-4">
                    <input type="text" value={currentTable.title} onChange={(e) => handleRenameTable(e.target.value)} className={`text-xl font-bold tracking-tight bg-transparent border-b border-transparent hover:border-gray-200 focus:border-blue-500 focus:outline-none w-full transition-colors ${darkMode ? "text-white" : "text-gray-800"}`} />
                    <p className="text-[11px] text-gray-400 font-medium mt-1">Status: Active Table</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className={`flex items-center gap-3 px-3 py-1.5 border rounded-md ${darkMode ? "bg-slate-800 border-slate-700" : "bg-gray-50 border-gray-200"}`}>
                      <span className="text-[10px] font-bold text-gray-500 uppercase">Progress</span>
                      <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div animate={{ width: `${progress}%` }} className="h-full bg-blue-500" />
                      </div>
                      <span className="text-[10px] font-bold text-blue-600">{progress}%</span>
                    </button>

                    <div className="relative">
                      <button onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)} className="p-2 text-gray-400 hover:text-gray-600 transition-colors"><MoreVertical size={18} /></button>
                      <AnimatePresence>
                        {isMoreMenuOpen && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setIsMoreMenuOpen(false)} />
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`absolute right-0 mt-2 w-48 shadow-2xl rounded-xl border z-50 p-2 ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white"}`}>
                              <button onClick={() => { setIsModalOpen(true); setNewTaskData({ title: "", description: "", dueDate: "" }); setIsMoreMenuOpen(false); }} className={`w-full text-left px-3 py-2 text-[11px] font-bold uppercase rounded-lg ${darkMode ? "hover:bg-slate-700 text-gray-300" : "hover:bg-blue-50 text-gray-600"}`}>Add New Task</button>
                              <button onClick={() => { setIsRemoveModalOpen(true); setIsMoreMenuOpen(false); }} className={`w-full text-left px-3 py-2 text-[11px] font-bold uppercase rounded-lg ${darkMode ? "hover:bg-slate-700 text-gray-300" : "hover:bg-blue-50 text-gray-600"}`}>Manage Tasks</button>
                              <div className={`my-1 border-t ${darkMode ? "border-slate-700" : "border-gray-100"}`}></div>
                              <button onClick={() => { markAllCompleted(); setIsMoreMenuOpen(false); }} className={`w-full text-left px-3 py-2 text-[11px] font-bold uppercase rounded-lg ${darkMode ? "hover:bg-slate-700 text-gray-300" : "hover:bg-blue-50 text-gray-600"}`}>Mark All Completed</button>
                              <button onClick={() => { archiveTable(); setIsMoreMenuOpen(false); }} className={`w-full text-left px-3 py-2 text-[11px] font-bold uppercase text-red-500 rounded-lg ${darkMode ? "hover:bg-red-500/10" : "hover:bg-red-50"}`}>Archive Table</button>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </header>

                <div className={`flex flex-col border rounded-lg overflow-hidden ${darkMode ? "border-slate-700" : "border-gray-100"}`}>
                  <div className={`grid grid-cols-12 gap-4 px-4 py-2 border-b text-[11px] font-bold text-gray-400 uppercase tracking-wider ${darkMode ? "bg-slate-800/50" : "bg-gray-50"}`}>
                    <div className="col-span-3">Title</div>
                    <div className="col-span-4">Description</div>
                    <div className="col-span-2 text-center">Status</div>
                    <div className="col-span-2">Due Date</div>
                    <div className="col-span-1 text-right">Action</div>
                  </div>
                  {visibleTasks.length > 0 ? (
                    visibleTasks.map((task) => (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        draggable
                        onDragStart={() => {
                          setDraggedTaskId(task.id);
                          setSourceTableId(currentTable.id); // 👈 important
                        }}
                        onDragEnd={() => setDraggedTaskId(null)}
                        className={`grid grid-cols-12 gap-4 px-4 py-3 items-center border-b last:border-0 group transition-colors cursor-grab active:cursor-grabbing ${draggedTaskId === task.id ? 'opacity-50 scale-95 shadow-inner' : ''} ${darkMode ? "hover:bg-slate-800 border-slate-700" : "hover:bg-blue-50/30 border-gray-100"}`}
                      >
                        <div className={`col-span-3 font-bold text-[13px] truncate ${darkMode ? "text-gray-200" : "text-gray-800"}`}>{task.title}</div>
                        <div className="col-span-4 text-[12px] text-gray-500 truncate">{task.description}</div>
                        <div className="col-span-2 flex justify-center">
                          <button onClick={() => toggleTaskStatus(task.id)} className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${task.status === "Completed" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>{task.status}</button>
                        </div>
                        <div className="col-span-2 text-[11px] text-gray-400 font-medium italic">{task.dueDate}</div>
                        <div className="col-span-1 text-right">
                          <button onClick={() => { setEditingTaskId(task.id); setNewTaskData({ ...task }); setIsModalOpen(true); }} className="text-[11px] text-blue-500 font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity">Edit</button>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="p-12 flex flex-col items-center justify-center text-gray-300">
                      <LayoutGrid size={32} strokeWidth={1} />
                      <p className="text-[12px] mt-2 mb-4">No tasks found</p>
                      <button onClick={() => { setIsModalOpen(true); setNewTaskData({ title: "", description: "", dueDate: "" }); }} className="px-4 py-2 text-[12px] font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors">Create First Task</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                <Archive size={48} strokeWidth={1} />
                <div className="text-center">
                  <h3 className="text-lg font-bold">No Active Tables</h3>
                  <p className="text-sm">Create a new table or unarchive one from the sidebar.</p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* --- Modals (Consistent with previous logic) --- */}

      {/* TASK MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className={`rounded-xl shadow-2xl w-full max-w-md overflow-hidden ${darkMode ? "bg-slate-800 text-white" : "bg-white"}`}>
              <div className={`px-6 py-4 border-b flex justify-between items-center ${darkMode ? "bg-slate-700 border-slate-600" : "bg-gray-50/50"}`}>
                <h2 className="text-[14px] font-bold">{editingTaskId ? "Edit Task" : "Create New Task"}</h2>
                <button onClick={() => { setIsModalOpen(false); setEditingTaskId(null); }} className="text-gray-400 hover:text-red-500"><X size={16} /></button>
              </div>
              <form onSubmit={submitNewTask} className="p-6 space-y-4">
                <div><label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">Task Title</label><input type="text" required value={newTaskData.title} onChange={(e) => setNewTaskData({ ...newTaskData, title: e.target.value })} className={`w-full px-3 py-2 border rounded-md text-[13px] outline-none focus:border-blue-500 ${darkMode ? "bg-slate-700 border-slate-600" : "bg-gray-50"}`} /></div>
                <div><label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">Description</label><textarea rows="3" value={newTaskData.description} onChange={(e) => setNewTaskData({ ...newTaskData, description: e.target.value })} className={`w-full px-3 py-2 border rounded-md text-[13px] outline-none focus:border-blue-500 resize-none ${darkMode ? "bg-slate-700 border-slate-600" : "bg-gray-50"}`} /></div>
                <div><label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">Due Date</label><input type="date" required value={newTaskData.dueDate} onChange={(e) => setNewTaskData({ ...newTaskData, dueDate: e.target.value })} className={`w-full px-3 py-2 border rounded-md text-[13px] outline-none focus:border-blue-500 ${darkMode ? "bg-slate-700 border-slate-600" : "bg-gray-50"}`} /></div>
                <div className="pt-2 flex gap-3">
                  <button type="button" onClick={() => { setIsModalOpen(false); setEditingTaskId(null); }} className={`flex-1 px-4 py-2 text-[12px] font-bold rounded-md ${darkMode ? "bg-slate-700 text-gray-300" : "text-gray-600 bg-gray-100"}`}>Cancel</button>
                  <button type="submit" className="flex-1 px-4 py-2 text-[12px] font-bold text-white bg-blue-600 rounded-md">Confirm</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE TASK MODAL */}
      <AnimatePresence>
        {isRemoveModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className={`rounded-xl shadow-2xl w-full max-w-sm overflow-hidden ${darkMode ? "bg-slate-800" : "bg-white"}`}>
              <div className={`px-6 py-4 border-b flex justify-between items-center ${darkMode ? "bg-slate-700 border-slate-600" : "bg-red-50/30"}`}>
                <h2 className="text-[13px] font-bold uppercase">Delete Tasks</h2>
                <button onClick={() => setIsRemoveModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
              </div>
              <div className="p-4 max-h-[300px] overflow-y-auto">
                {currentTable?.tasks.length > 0 ? (
                  <div className="space-y-2">
                    {currentTable.tasks.map((task) => (
                      <div key={task.id} className={`flex items-center justify-between p-3 rounded-lg group ${darkMode ? "bg-slate-700 hover:bg-red-900/20" : "bg-gray-50 hover:bg-red-50"}`}>
                        <span className="text-[12px] font-medium truncate mr-4">{task.title}</span>
                        <button onClick={() => deleteSpecificTask(task.id)} className="text-[10px] font-bold text-red-500 opacity-0 group-hover:opacity-100 bg-white border border-red-200 px-2 py-1 rounded hover:bg-red-500 hover:text-white transition-all">Delete</button>
                      </div>
                    ))}
                  </div>
                ) : <div className="text-center py-8 text-gray-400 text-[12px]">Empty list</div>}
              </div>
              <div className="p-4"><button onClick={() => setIsRemoveModalOpen(false)} className={`w-full py-2 text-[12px] font-bold rounded-md ${darkMode ? "bg-slate-700 text-white" : "bg-gray-200 text-gray-600"}`}>Close</button></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TABLE MODALS */}
      <AnimatePresence>
        {isTableModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className={`rounded-xl shadow-2xl w-full max-w-sm overflow-hidden ${darkMode ? "bg-slate-800" : "bg-white"}`}>
              <div className="px-6 py-4 border-b flex justify-between items-center">
                <h2 className="text-[14px] font-bold">New Table</h2>
                <button onClick={() => setIsTableModalOpen(false)} className="text-gray-400 hover:text-red-500"><X size={16} /></button>
              </div>
              <form onSubmit={submitNewTable} className="p-6 space-y-4">
                <input type="text" required autoFocus value={newTableName} onChange={(e) => setNewTableName(e.target.value)} placeholder="Enter Table Name" className={`w-full px-3 py-2 border rounded-md text-[13px] outline-none ${darkMode ? "bg-slate-700 border-slate-600" : "bg-gray-50"}`} />
                <button type="submit" className="w-full px-4 py-2 text-[12px] font-bold text-white bg-blue-600 rounded-md">Create Table</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isRemoveTableModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`rounded-xl shadow-2xl w-full max-w-sm overflow-hidden border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-200 text-gray-900"
                }`}
            >
              {/* Header */}
              <div className={`px-6 py-4 border-b flex justify-between items-center ${darkMode ? "border-slate-700" : "border-gray-100"}`}>
                <h2 className="text-[13px] font-bold uppercase">Permanent Delete</h2>
                <button
                  onClick={() => setIsRemoveTableModalOpen(false)}
                  className={`${darkMode ? "text-slate-400 hover:text-white" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Table List */}
              <div className="p-4 space-y-2">
                {tables.filter(t => !t.isArchived).map((table) => (
                  <div
                    key={table.id}
                    className={`flex items-center justify-between p-3 rounded-lg group transition-colors ${darkMode ? "bg-slate-700/50 hover:bg-red-900/30" : "bg-gray-50 hover:bg-red-50"
                      }`}
                  >
                    <span className="font-medium">{table.title}</span>
                    <button
                      onClick={() => deleteSpecificTable(table.id)}
                      className="text-[10px] font-bold text-red-500 opacity-0 group-hover:opacity-100 bg-white border border-red-200 px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EDIT PROFILE MODAL */}
      <AnimatePresence>
        {isEditProfileModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className={`rounded-xl shadow-2xl w-full max-w-sm overflow-hidden ${darkMode ? "bg-slate-800" : "bg-white"}`}>
              <div className="px-6 py-4 border-b flex justify-between items-center">
                <h2 className="text-[14px] font-bold uppercase">Edit Profile</h2>
                <button onClick={() => setIsEditProfileModalOpen(false)} className="text-gray-400 hover:text-red-500"><X size={16} /></button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">New Name</label>
                  <input type="text" value={editUserData.name} onChange={(e) => setEditUserData({ ...editUserData, name: e.target.value })} className={`w-full px-3 py-2 border rounded-md text-[13px] outline-none ${darkMode ? "bg-slate-700 border-slate-600" : "bg-gray-50"}`} />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">New Email</label>
                  <input type="email" value={editUserData.email} onChange={(e) => setEditUserData({ ...editUserData, email: e.target.value })} className={`w-full px-3 py-2 border rounded-md text-[13px] outline-none ${darkMode ? "bg-slate-700 border-slate-600" : "bg-gray-50"}`} />
                </div>
                <button
                  type="button"
                  onClick={handleUpdateProfile}
                  className="w-full px-4 py-2 text-[12px] font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
