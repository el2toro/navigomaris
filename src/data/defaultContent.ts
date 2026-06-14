import siteContent from '../content/site-content.json';
import supabase from '../utils/supabase';

 const { data: heroImages } = await supabase
  .from('hero_images')
  .select('*')
  .order('id', { ascending: true });

 const { data: services } = await supabase
  .from('services')
  .select('*')
  .order('id', { ascending: true });

export const defaultContent = siteContent;
    // heroTitle: siteContent.heroTitle,
    // heroSubtitle: siteContent.heroSubtitle,
    // heroImages: heroImages,
    // services: services
