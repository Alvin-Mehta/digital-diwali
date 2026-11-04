import { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/layout/Header';
import { WelcomeScreen } from './features/welcome/WelcomeScreen';
import { CrackerMenu } from './features/crackers/menu/CrackerMenu';
import { MobileCrackerSelector } from './features/crackers/menu/MobileCrackerSelector';
import { CelebrationStage } from './features/celebration/CelebrationStage';
import { InviteFriendsModal } from './features/modals/InviteFriendsModal';
import { FullRoomModal } from './features/modals/FullRoomModal';
import { crackerRegistry, getCrackerById, getDefaultCracker } from './features/crackers';
import { CrackerDefinition } from './features/crackers/types';
import { audioManager } from './features/audio/AudioManager';
import { generateSessionId } from './services/sessionService';
import { useMultiplayer } from './features/multiplayer/useMultiplayer';

export function App() {
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(audioManager.getMuted());
  const [selectedCracker, setSelectedCracker] = useState<CrackerDefinition>(getDefaultCracker());
  const [isIgniting, setIsIgniting] = useState<boolean>(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);

  // Initialize or read session from URL query or path
  const [sessionId, setSessionId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlSession = params.get('session');
      if (urlSession) return urlSession;

      const pathParts = window.location.pathname.split('/');
      const celebrateIdx = pathParts.indexOf('celebrate');
      if (celebrateIdx !== -1 && pathParts[celebrateIdx + 1]) {
        return pathParts[celebrateIdx + 1];
      }
    }
    return generateSessionId();
  });

  // Sync session ID to browser URL without reload
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = new URL(window.location.href);
      if (currentUrl.searchParams.get('session') !== sessionId) {
        currentUrl.searchParams.set('session', sessionId);
        window.history.replaceState({}, '', currentUrl.toString());
      }
    }
  }, [sessionId]);

  const inviteUrl = useMemo(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('session', sessionId);
      return url.toString();
    }
    return `https://digitaldiwali.app/celebrate/${sessionId}`;
  }, [sessionId]);

  // Remote Event Callbacks for Multiplayer
  const handleRemoteSelectCracker = useCallback((crackerId: string) => {
    const cracker = getCrackerById(crackerId);
    if (cracker) {
      setSelectedCracker(cracker);
    }
  }, []);

  const handleRemoteIgnite = useCallback((payload: { crackerId: string }) => {
    const cracker = getCrackerById(payload.crackerId);
    if (cracker) {
      setSelectedCracker(cracker);
    }
    setIsIgniting(true);
  }, []);

  const handleRemoteReset = useCallback(() => {
    setIsIgniting(false);
  }, []);

  // Real-time Multiplayer Hook
  const {
    participants,
    isRoomFull,
    setIsRoomFull,
    emitSelectCracker,
    emitIgnite,
    emitComplete,
    currentUserId,
  } = useMultiplayer({
    roomId: sessionId,
    selectedCrackerId: selectedCracker.id,
    onRemoteSelectCracker: handleRemoteSelectCracker,
    onRemoteIgnite: handleRemoteIgnite,
    onRemoteReset: handleRemoteReset,
  });

  // Audio mute toggle
  const handleToggleMute = () => {
    const newMuted = audioManager.toggleMute();
    setIsMuted(newMuted);
  };

  // Cracker Selection Handler
  const handleSelectCracker = (cracker: CrackerDefinition) => {
    if (isIgniting) return;
    setSelectedCracker(cracker);
    emitSelectCracker(cracker.id);
  };

  // Cracker Ignition Handler ("LIGHT THE CRACKER")
  const handleIgnite = () => {
    if (isIgniting) return;
    setIsIgniting(true);
    emitIgnite(selectedCracker.id, selectedCracker.durationMs);
  };

  // Animation Completion Handler
  const handleAnimationComplete = () => {
    setIsIgniting(false);
    emitComplete();
  };

  // Create new session handler when room is full
  const handleCreateNewSession = () => {
    const newSession = generateSessionId();
    setSessionId(newSession);
    setIsRoomFull(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-deep text-text-primary overflow-hidden">
      {/* Welcome Screen Intro (15s auto-dismiss or manual skip) */}
      {showWelcome && (
        <WelcomeScreen
          onDismiss={() => setShowWelcome(false)}
          autoDismissSeconds={15}
        />
      )}

      {/* Persistent Global Header */}
      <Header
        participantCount={participants.length || 1}
        maxParticipants={5}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenInviteModal={() => setIsInviteModalOpen(true)}
        onOpenWelcome={() => setShowWelcome(true)}
      />

      {/* Main Layout: Desktop 30%/70% Split | Mobile Full Stage with Horizontal Selector */}
      <main className="flex-1 flex flex-col md:flex-row w-full overflow-hidden relative min-h-0">
        {/* Left Section (Desktop Only ~30%): Vertical Cracker Selection Menu */}
        <aside className="hidden md:block w-full md:w-[32%] lg:w-[28%] h-[calc(100vh-61px)] shrink-0 z-20">
          <CrackerMenu
            crackers={crackerRegistry}
            selectedCracker={selectedCracker}
            onSelectCracker={handleSelectCracker}
            isIgniting={isIgniting}
          />
        </aside>

        {/* Right Section: Main Celebration Stage (Full-width on Mobile & ~70% on Desktop) */}
        <section className="flex-1 h-[calc(100dvh-61px)] md:h-[calc(100vh-61px)] relative z-10 flex flex-col overflow-hidden">
          <CelebrationStage
            cracker={selectedCracker}
            isIgniting={isIgniting}
            onIgnite={handleIgnite}
            onAnimationComplete={handleAnimationComplete}
            isMuted={isMuted}
            participants={participants}
            currentUserId={currentUserId}
            mobileSelector={
              <MobileCrackerSelector
                crackers={crackerRegistry}
                selectedCracker={selectedCracker}
                onSelectCracker={handleSelectCracker}
                isIgniting={isIgniting}
              />
            }
          />
        </section>
      </main>

      {/* Invite Friends Modal */}
      <InviteFriendsModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        inviteUrl={inviteUrl}
        participants={participants}
        maxCapacity={5}
      />

      {/* Room Full Modal (Enforced Max 5 Limit) */}
      <FullRoomModal
        isOpen={isRoomFull}
        onClose={() => setIsRoomFull(false)}
        onCreateNewSession={handleCreateNewSession}
      />
    </div>
  );
}
export default App;
