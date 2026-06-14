import { getPublicUrl } from '../utils/supabase';

export const imageService = '';


//get images from db url and return them as an array of strings

const navalServiceUrl = getPublicUrl('services/marine_service.avif');
const ropeServiceUrl = getPublicUrl('services/rope_acces_service.avif');
const constructionServiceUrl = getPublicUrl('services/construction_service.avif');
const weldingServiceUrl = getPublicUrl('services/welding_service.avif');

const marineService1Url = getPublicUrl('services/marine_service1.jpg');
const ropeAccessService1Url = getPublicUrl('services/rope_acces_service1.jpg');
const constructionService1Url = getPublicUrl('services/construction_service1.jpg');
const civilEngineeringService1Url = getPublicUrl('services/civil_engineering_service1.jpg');

export interface ImageProvider {
 marineService: string[];
 ropeAccessService: string[];
 constructionService: string[];
 weldingService: string[];
 civilEngineeringService: string[];
}