"use client";

import { createContext, useContext, useState, useCallback } from 'react';

const UseCaseContext = createContext(null);

export function UseCaseProvider({ children }) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentRoute, setCurrentRoute] = useState(null);
  const [onCategoryChange, setOnCategoryChange] = useState(null);

  const openBottomSheet = useCallback((options = {}) => {
    if (options.selectedCategory) setSelectedCategory(options.selectedCategory);
    if (options.currentRoute) setCurrentRoute(options.currentRoute);
    if (options.onCategoryChange) setOnCategoryChange(() => options.onCategoryChange);
    setIsBottomSheetOpen(true);
  }, []);

  const closeBottomSheet = useCallback(() => {
    setIsBottomSheetOpen(false);
  }, []);

  const toggleBottomSheet = useCallback(() => {
    setIsBottomSheetOpen(prev => !prev);
  }, []);

  return (
    <UseCaseContext.Provider
      value={{
        isBottomSheetOpen,
        selectedCategory,
        currentRoute,
        onCategoryChange,
        openBottomSheet,
        closeBottomSheet,
        toggleBottomSheet,
        setSelectedCategory,
        setCurrentRoute,
        setOnCategoryChange,
      }}
    >
      {children}
    </UseCaseContext.Provider>
  );
}

export function useUseCase() {
  const context = useContext(UseCaseContext);
  if (!context) {
    throw new Error('useUseCase must be used within a UseCaseProvider');
  }
  return context;
}

