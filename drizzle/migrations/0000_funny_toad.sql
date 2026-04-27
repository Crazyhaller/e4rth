CREATE TYPE "public"."chat_role" AS ENUM('user', 'assistant');--> statement-breakpoint
CREATE TYPE "public"."notification_type" AS ENUM('watering', 'disease', 'reminder', 'system');--> statement-breakpoint
CREATE TYPE "public"."plan" AS ENUM('free', 'premium');--> statement-breakpoint
CREATE TYPE "public"."severity" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TYPE "public"."subscription_status" AS ENUM('active', 'cancelled', 'past_due');--> statement-breakpoint
CREATE TABLE "care_plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"plant_id" uuid NOT NULL,
	"watering_frequency" integer,
	"sunlight" text,
	"fertilizer" text,
	"notes" text,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "chats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"plant_id" uuid,
	"role" "chat_role",
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "growth_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"plant_id" uuid NOT NULL,
	"height" real,
	"leaf_count" integer,
	"health_score" integer,
	"notes" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"type" "notification_type",
	"message" text NOT NULL,
	"is_read" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "plants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"species" text,
	"location" text,
	"tags" text[],
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "scans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"plant_id" uuid,
	"image_url" text NOT NULL,
	"disease" text,
	"confidence" real,
	"severity" "severity",
	"raw_response" json,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"plan" "plan",
	"status" "subscription_status",
	"razorpay_customer_id" text,
	"razorpay_sub_id" text,
	"current_period_end" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" text NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"image_url" text,
	"plan" "plan" DEFAULT 'free',
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id")
);
--> statement-breakpoint
ALTER TABLE "care_plans" ADD CONSTRAINT "care_plans_plant_id_plants_id_fk" FOREIGN KEY ("plant_id") REFERENCES "public"."plants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chats" ADD CONSTRAINT "chats_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "growth_logs" ADD CONSTRAINT "growth_logs_plant_id_plants_id_fk" FOREIGN KEY ("plant_id") REFERENCES "public"."plants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "plants" ADD CONSTRAINT "plants_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scans" ADD CONSTRAINT "scans_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scans" ADD CONSTRAINT "scans_plant_id_plants_id_fk" FOREIGN KEY ("plant_id") REFERENCES "public"."plants"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;