export const FREE_LIMITS = {
  scansPerDay: 100,
  chatMessagesPerDay: 200,
}

export const PLANS = {
  free: {
    name: 'Free',
    scans: 100,
    chats: 200,
  },

  premium: {
    name: 'Premium',
    scans: Infinity,
    chats: Infinity,
  },
}
