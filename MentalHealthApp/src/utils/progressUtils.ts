// Utility to manage room/module progress in localStorage

// ✅ Mark a module as complete
export const markModuleComplete = (roomId: string, moduleId: number) => {
  const key = `progress_${roomId}`;
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  if (!existing.includes(moduleId)) {
    existing.push(moduleId);
    localStorage.setItem(key, JSON.stringify(existing));
  }
};

// ✅ Check if a module is complete
export const isModuleComplete = (roomId: string, moduleId: number): boolean => {
  const key = `progress_${roomId}`;
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  return existing.includes(moduleId);
};

// ✅ Get overall room progress in percentage
export const getRoomProgress = (roomId: string, totalModules: number): number => {
  const key = `progress_${roomId}`;
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  if (totalModules === 0) return 0;
  return Math.round((existing.length / totalModules) * 100);
};

// ✅ Reset all progress for a room
export const resetRoomProgress = (roomId: string) => {
  const key = `progress_${roomId}`;
  localStorage.removeItem(key);
};
