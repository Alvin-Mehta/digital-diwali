import React from 'react';
import { Sparkles, Users } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';

interface FullRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateNewSession: () => void;
}

export const FullRoomModal: React.FC<FullRoomModalProps> = ({
  isOpen,
  onClose,
  onCreateNewSession,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Celebration is Full!"
      subtitle="Maximum capacity of 5 participants reached"
    >
      <div className="text-center space-y-4 py-2">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-gold-500/30 flex items-center justify-center mx-auto text-gold-400">
          <Users size={32} />
        </div>

        <p className="text-sm text-text-secondary leading-relaxed">
          This celebration is full! Start your own Digital Diwali celebration and invite your friends to burst crackers together.
        </p>

        <div className="pt-2 flex flex-col gap-2">
          <Button
            variant="festive"
            size="lg"
            icon={<Sparkles size={18} />}
            onClick={onCreateNewSession}
            className="w-full"
          >
            Start My Own Celebration
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="w-full text-text-muted"
          >
            Dismiss
          </Button>
        </div>
      </div>
    </Modal>
  );
};

