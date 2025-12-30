import { useState, useEffect, useCallback } from 'react';

const ONBOARDING_KEY = 'anime_onboarding_completed';
const ONBOARDING_STEP_KEY = 'anime_onboarding_step';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  target?: string; // CSS selector for highlighting
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to AniTrack! 🎌',
    description: 'Your personal anime tracking companion. Let us show you around!',
  },
  {
    id: 'browse',
    title: 'Discover Anime',
    description: 'Browse through trending, seasonal, and top-rated anime. Use filters to find exactly what you\'re looking for.',
    target: '[data-tour="browse"]',
    position: 'bottom',
  },
  {
    id: 'watchlist',
    title: 'Track Your Progress',
    description: 'Add anime to your watchlist and track episodes as you watch. Mark shows as watching, completed, or plan to watch.',
    target: '[data-tour="watchlist"]',
    position: 'bottom',
  },
  {
    id: 'search',
    title: 'Quick Search',
    description: 'Press "/" anywhere to quickly search for any anime. Use keyboard shortcuts for faster navigation!',
    target: '[data-tour="search"]',
    position: 'bottom',
  },
  {
    id: 'complete',
    title: 'You\'re All Set! 🎉',
    description: 'Start exploring and building your anime collection. Enjoy your journey!',
  },
];

export function useOnboarding() {
  const [isCompleted, setIsCompleted] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem(ONBOARDING_KEY);
    const savedStep = localStorage.getItem(ONBOARDING_STEP_KEY);
    
    if (!completed) {
      setIsCompleted(false);
      setIsActive(true);
      if (savedStep) {
        setCurrentStep(parseInt(savedStep, 10));
      }
    }
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < onboardingSteps.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      localStorage.setItem(ONBOARDING_STEP_KEY, String(next));
    } else {
      completeOnboarding();
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      localStorage.setItem(ONBOARDING_STEP_KEY, String(prev));
    }
  }, [currentStep]);

  const completeOnboarding = useCallback(() => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    localStorage.removeItem(ONBOARDING_STEP_KEY);
    setIsCompleted(true);
    setIsActive(false);
  }, []);

  const skipOnboarding = useCallback(() => {
    completeOnboarding();
  }, [completeOnboarding]);

  const restartOnboarding = useCallback(() => {
    localStorage.removeItem(ONBOARDING_KEY);
    localStorage.removeItem(ONBOARDING_STEP_KEY);
    setIsCompleted(false);
    setCurrentStep(0);
    setIsActive(true);
  }, []);

  return {
    isCompleted,
    isActive,
    currentStep,
    currentStepData: onboardingSteps[currentStep],
    totalSteps: onboardingSteps.length,
    nextStep,
    prevStep,
    skipOnboarding,
    restartOnboarding,
  };
}
