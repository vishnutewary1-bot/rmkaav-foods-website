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

-- A shopper can see only their own orders.
create policy "orders_select_own" on public.orders
  for select using (auth.uid() = user_id);

-- The create-payment function inserts on behalf of the logged-in
-- shopper (forwarding their JWT), so it can only ever insert its own row.
create policy "orders_insert_own" on public.orders
  for insert with check (auth.uid() = user_id);

-- The verify-payment function updates on behalf of the logged-in
-- shopper (forwarding their JWT) when they return from Instamojo.
create policy "orders_update_own" on public.orders
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- No policy exists for the webhook path on purpose: Instamojo's
-- server-to-server callback carries no Supabase session at all, so no
-- auth.uid()-based policy can ever match it. That function instead
-- uses the service-role key (SUPABASE_SERVICE_ROLE_KEY), which
-- bypasses RLS entirely, and proves its own legitimacy by verifying
-- Instamojo's HMAC signature before writing anything.
