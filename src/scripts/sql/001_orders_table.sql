-- RMKAAV Foods — orders table (Phase 4: Instamojo payment integration)
--
-- Paste this into the Supabase project's SQL editor and run it once.
-- (Note: the earlier `profiles` table from Phase 1 was created by hand
-- in the SQL editor and was never saved to this repo — this is the
-- first SQL file committed here, hence starting the numbering at 001.)
--
-- One row per checkout attempt. Written as 'pending' when a payment
-- request is created, then flipped to 'paid'/'failed' by Instamojo's
-- webhook (authoritative — fires even if the shopper's browser never
-- returns to the site) and, redundantly for a fast on-screen
-- confirmation, by the redirect-return verification call.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  ref text not null unique,
  user_id uuid not null references auth.users(id),
  cart jsonb not null,
  details jsonb not null,
  totals jsonb not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed')),
  instamojo_payment_request_id text,
  instamojo_payment_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_user_id_idx on public.orders(user_id);
create index if not exists orders_payment_request_id_idx on public.orders(instamojo_payment_request_id);

alter table public.orders enable row level security;

-- A shopper can see only their own orders (used for a future order-
-- history page — nothing reads this via RLS yet, but it's harmless
-- and correct to have ready).
create policy "orders_select_own" on public.orders
  for select using (auth.uid() = user_id);

-- Deliberately NO insert/update policy for shoppers. All writes
-- (create-payment.js, verify-payment.js, instamojo-webhook.js) go
-- through the service-role key instead, which bypasses RLS entirely.
-- This is intentional, not an oversight: if a shopper's own JWT could
-- write this table directly (even "only their own row"), nothing
-- would stop them from calling Supabase's REST API themselves — e.g.
-- from devtools — and setting status='paid' on their own order
-- without ever paying, or inserting a fresh row already marked paid.
-- Authorization for writes lives in the server code instead (it
-- verifies the shopper's identity via their JWT, then explicitly
-- filters/checks row ownership itself before writing with the
-- elevated key) — see SUPABASE_SERVICE_ROLE_KEY in api/_lib/supabaseAdmin.js.
