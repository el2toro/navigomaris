import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://hfnjmqxfckzpmuwyunfo.supabase.co',
  'sb_publishable_3iJlSb47l2FrXcAUO8fRgQ_GnidKXF0'
);

const getPublicUrl = (path: string) => {
  const { data } = supabase.storage.from('images').getPublicUrl(path);
  return data.publicUrl;
};

export { getPublicUrl };

export default supabase;