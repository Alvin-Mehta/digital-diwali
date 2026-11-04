// Client Session Service

export function generateSessionId(): string {
  const chars = 'abcdefghjkmnpqrstuvwxyz23456789';
  let rand = '';
  for (let i = 0; i < 8; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `diwali-${rand}`;
}

export function getOrCreateParticipantId(): string {
  if (typeof window === 'undefined') return 'anon-' + Math.random().toString(36).substring(2, 7);
  let id = sessionStorage.getItem('diwali_participant_id');
  if (!id) {
    id = 'p-' + Math.random().toString(36).substring(2, 9);
    sessionStorage.setItem('diwali_participant_id', id);
  }
  return id;
}

const FESTIVE_NICKNAMES = [
  'Deepak',
  'Roshni',
  'Diya',
  'Tara',
  'Jyoti',
  'Kiran',
  'Aakash',
  'Suraj',
  'Anar',
  'Sparkler',
];

export function getOrCreateNickname(): string {
  if (typeof window === 'undefined') return 'Celebrant';
  let name = sessionStorage.getItem('diwali_nickname');
  if (!name) {
    name = FESTIVE_NICKNAMES[Math.floor(Math.random() * FESTIVE_NICKNAMES.length)];
    sessionStorage.setItem('diwali_nickname', name);
  }
  return name;
}
