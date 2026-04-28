export const FREE_LIMITS = {
  scansPerDay: 5,
  chatMessagesPerDay: 20,
}

export const PLANS = {
  free: {
    name: 'Free',
    scans: 5,
    chats: 20,
  },

  premium: {
    name: 'Premium',
    scans: Infinity,
    chats: Infinity,
  },
}
