-- Cria uma tabela para perfis de usuário públicos
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  first_name text,
  last_name text,
  whatsapp text,
  avatar_url text
);

-- Configura a Segurança em Nível de Linha (RLS)
alter table public.profiles enable row level security;

create policy "Perfis públicos são visíveis para todos."
  on public.profiles for select
  using ( true );

create policy "Usuários podem inserir seu próprio perfil."
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Usuários podem atualizar seu próprio perfil."
  on public.profiles for update
  using ( auth.uid() = id );

-- Este gatilho cria automaticamente um perfil para novos usuários.
-- Primeiro, remove o gatilho e a função existentes se eles existirem para evitar erros na reexecução
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user;

create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, first_name, last_name, whatsapp, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'whatsapp',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
