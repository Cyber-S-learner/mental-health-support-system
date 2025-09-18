export const PROGRESS_STORAGE_KEY = 'mental-health-progress';

export interface UserProgress {
  [roomId: string]: {
    [moduleId: number]: boolean;
  };
}

export const getProgress = (): UserProgress => {
  if (typeof window === 'undefined') return {};
  const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
};

export const saveProgress = (progress: UserProgress): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
};

export const markModuleComplete = (roomId: string, moduleId: number): void => {
  const progress = getProgress();
  if (!progress[roomId]) {
    progress[roomId] = {};
  }
  progress[roomId][moduleId] = true;
  saveProgress(progress);
};

export const isModuleComplete = (roomId: string, moduleId: number): boolean => {
  const progress = getProgress();
  return progress[roomId]?.[moduleId] || false;
};

export const getRoomProgress = (roomId: string, totalModules: number): number => {
  const progress = getProgress();
  const roomProgress = progress[roomId] || {};
  const completedCount = Object.values(roomProgress).filter(Boolean).length;
  return Math.round((completedCount / totalModules) * 100);
};