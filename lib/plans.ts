export const FREE_LIMITS = {
  scansPerDay: 6,
  chatMessagesPerDay: 20,
}

export const PLANS = {
  free: {
    name: 'Free',
    scans: 6,
    chats: 20,
  },

  premium: {
    name: 'Premium',
    scans: Infinity,
    chats: Infinity,
  },
}
