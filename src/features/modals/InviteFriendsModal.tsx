import React, { useState } from 'react';
import { Copy, Check, Users, Share2, Sparkles } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Participant } from '../../types';
import { Avatar } from '../../components/ui/Avatar';

interface InviteFriendsModalProps {
  isOpen: boolean;
  onClose: () => void;
  inviteUrl: string;
  participants: Participant[];
  maxCapacity?: number;
}

export const InviteFriendsModal: React.FC<InviteFriendsModalProps> = ({
  isOpen,
  onClose,
  inviteUrl,
  participants,
  maxCapacity = 5,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join my Digital Diwali Celebration!',
          text: 'Burst digital crackers with me in real-time on Digital Diwali!',
          url: inviteUrl,
        });
      } catch {
        // Ignored if cancelled
      }
    } else {
      handleCopy();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Celebrate Together!"
      subtitle="Your Diwali celebration is better together. Invite your friends!"
    >
      <div className="space-y-5">
        {/* Capacity Indicator Banner */}
        <div className="p-3.5 rounded-xl bg-bg-surface border border-gold-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-gold-400" />
            <span className="text-xs text-text-secondary">Celebration Space:</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm text-gold-300">
              {participants.length} / {maxCapacity}
            </span>
            <span className="text-[11px] text-text-muted">Connected</span>
          </div>
        </div>

        {/* Current Active Participants */}
        <div>
          <label className="block text-xs font-semibold text-text-muted mb-2">
            Joined Celebrants
          </label>
          <div className="space-y-1.5 max-h-36 overflow-y-auto">
            {participants.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-2 rounded-lg bg-bg-surface/50 border border-gold-500/10 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <Avatar name={p.name} isHost={p.isHost} size="sm" />
                  <span className="font-medium text-text-primary">{p.name}</span>
                </div>
                {p.isHost && (
                  <span className="text-[10px] text-gold-400 font-bold px-2 py-0.5 rounded-full bg-gold-500/10 border border-gold-500/20">
                    Host
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Shareable Link Box */}
        <div>
          <label className="block text-xs font-semibold text-text-muted mb-1.5">
            Shareable Invitation Link
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={inviteUrl}
              className="flex-1 px-3 py-2 rounded-xl bg-bg-deep border border-gold-500/25 text-xs text-gold-300 select-all focus:outline-none focus:border-gold-400"
            />
            <Button
              variant={copied ? 'secondary' : 'primary'}
              size="sm"
              icon={copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              onClick={handleCopy}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          {copied && (
            <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 animate-fadeIn">
              <Sparkles size={12} />
              Invitation link copied to clipboard!
            </p>
          )}
        </div>

        {/* Action Controls */}
        <div className="pt-2 flex items-center gap-3">
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <Button
              variant="secondary"
              size="md"
              icon={<Share2 size={16} />}
              onClick={handleNativeShare}
              className="flex-1"
            >
              Share via Apps
            </Button>
          )}
          <Button
            variant="ghost"
            size="md"
            onClick={onClose}
            className="flex-1"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

