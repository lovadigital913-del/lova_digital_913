-- ئیمەیڵی بەڕێوەبەر لە policy ـەکان دانراوە؛ لە Auth > Users بە هەمان ئیمەیڵ user دروست بکە.
create table if not exists public.lova_site_content (
  id text primary key check (id = 'main'),
  content jsonb not null default '{"graphics":[],"sites":[],"platforms":[],"categories":{"graphics":[],"sites":[]}}'::jsonb,
  updated_at timestamptz not null default now()
);

insert into public.lova_site_content (id, content)
values ('main', '{"graphics":[],"sites":[],"platforms":[],"categories":{"graphics":[],"sites":[]}}'::jsonb)
on conflict (id) do nothing;

alter table public.lova_site_content enable row level security;
drop policy if exists "Public can read Lova content" on public.lova_site_content;
create policy "Public can read Lova content" on public.lova_site_content
  for select to anon, authenticated using (true);
drop policy if exists "Only Lova owner can update content" on public.lova_site_content;
create policy "Only Lova owner can update content" on public.lova_site_content
  for update to authenticated
  using (lower((select auth.jwt() ->> 'email')) = lower('lovadigital913@gmail.com'))
  with check (lower((select auth.jwt() ->> 'email')) = lower('lovadigital913@gmail.com'));
grant select on public.lova_site_content to anon, authenticated;
grant update on public.lova_site_content to authenticated;

-- لە Storage ی Supabase، سەرەتا bucket ـێکی public بە ناوی lova-images دروست بکە.
drop policy if exists "Lova owner can upload portfolio images" on storage.objects;
create policy "Lova owner can upload portfolio images" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'lova-images'
    and lower((select auth.jwt() ->> 'email')) = lower('lovadigital913@gmail.com')
  );
