import React from 'react';
import { LandingVideoIllustration } from './landing-video';

interface WelcomeScreenProps {
  onDismiss: () => void;
  autoDismissSeconds?: number;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onDismiss }) => {
  return (
    <LandingVideoIllustration
      onComplete={onDismiss}
    />
  );
};
