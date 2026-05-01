import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  boolean,
  real,
  json,
  pgEnum,
} from 'drizzle-orm/pg-core'

/* =====================================================
   ENUMS (DATA SAFETY + CONSISTENCY)
===================================================== */

export const planEnum = pgEnum('plan', ['free', 'premium'])

export const severityEnum = pgEnum('severity', ['low', 'medium', 'high'])

export const notificationTypeEnum = pgEnum('notification_type', [
  'care_reminder',
  'plant_alert',
  'scan_completed',
  'growth_insight',
])

export const subscriptionStatusEnum = pgEnum('subscription_status', [
  'active',
  'cancelled',
  'past_due',
])

export const chatRoleEnum = pgEnum('chat_role', ['user', 'assistant'])

/* =====================================================
   USERS
===================================================== */

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),

  clerkId: text('clerk_id').notNull().unique(),

  email: text('email').notNull(),
  name: text('name'),
  imageUrl: text('image_url'),

  plan: planEnum('plan').default('free'),

  createdAt: timestamp('created_at').defaultNow(),
})

/* =====================================================
   PLANTS
===================================================== */

export const plants = pgTable('plants', {
  id: uuid('id').primaryKey().defaultRandom(),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  name: text('name').notNull(),
  species: text('species'),
  location: text('location'),
  imageUrl: text('image_url'),

  tags: text('tags').array(),

  createdAt: timestamp('created_at').defaultNow(),
})

/* =====================================================
   SCANS (AI DIAGNOSIS)
===================================================== */

export const scans = pgTable('scans', {
  id: uuid('id').primaryKey().defaultRandom(),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  plantId: uuid('plant_id').references(() => plants.id, {
    onDelete: 'set null',
  }),

  imageUrl: text('image_url').notNull(),

  disease: text('disease'),
  confidence: real('confidence'),

  severity: severityEnum('severity'),

  rawResponse: json('raw_response'),

  createdAt: timestamp('created_at').defaultNow(),
})

/* =====================================================
   CARE PLANS
===================================================== */

export const carePlans = pgTable('care_plans', {
  id: uuid('id').primaryKey().defaultRandom(),

  plantId: uuid('plant_id')
    .notNull()
    .references(() => plants.id, { onDelete: 'cascade' }),

  wateringFrequency: integer('watering_frequency'), // days
  sunlight: text('sunlight'),
  fertilizer: text('fertilizer'),

  notes: text('notes'),

  updatedAt: timestamp('updated_at').defaultNow(),
})

/* =====================================================
   GROWTH LOGS
===================================================== */

export const growthLogs = pgTable('growth_logs', {
  id: uuid('id').primaryKey().defaultRandom(),

  plantId: uuid('plant_id')
    .notNull()
    .references(() => plants.id, { onDelete: 'cascade' }),

  height: real('height'),
  leafCount: integer('leaf_count'),
  healthScore: integer('health_score'),

  notes: text('notes'),

  createdAt: timestamp('created_at').defaultNow(),
})

/* =====================================================
   NOTIFICATIONS
===================================================== */

export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  type: notificationTypeEnum('type'),

  message: text('message').notNull(),

  isRead: boolean('is_read').default(false),

  createdAt: timestamp('created_at').defaultNow(),
})

/* =====================================================
   SUBSCRIPTIONS
===================================================== */

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  plan: planEnum('plan'),

  status: subscriptionStatusEnum('status'),

  razorpayCustomerId: text('razorpay_customer_id'),
  razorpaySubId: text('razorpay_sub_id'),

  currentPeriodEnd: timestamp('current_period_end'),
})

/* =====================================================
   CHAT HISTORY
===================================================== */

export const chats = pgTable('chats', {
  id: uuid('id').primaryKey().defaultRandom(),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  plantId: uuid('plant_id'),

  role: chatRoleEnum('role'),

  message: text('message').notNull(),

  createdAt: timestamp('created_at').defaultNow(),
})
