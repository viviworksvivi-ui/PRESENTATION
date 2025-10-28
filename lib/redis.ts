import { Redis } from '@upstash/redis'

// Vérifier que les variables d'environnement sont présentes
if (!process.env.UPSTASH_REDIS_REST_URL) {
  throw new Error('UPSTASH_REDIS_REST_URL is not defined')
}

if (!process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error('UPSTASH_REDIS_REST_TOKEN is not defined')
}

// Créer une instance Redis
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

// Types pour les devis
export interface DevisData {
  id: string
  numero: string
  date: string
  validite: string
  clientNom: string
  clientAdresse: string
  clientCodePostal: string
  clientVille: string
  clientTelephone: string
  clientEmail: string
  lines: Array<{
    id: string
    description: string
    quantity: number
    unitPrice: number
    total: number
  }>
  notes: string
  signature?: string
  signatureDate?: string
  discount?: {
    id: string
    label: string
    value: number
    type: 'percentage' | 'fixed'
  }
  createdAt: string
  updatedAt: string
  status?: 'draft' | 'sent' | 'signed' | 'paid' | 'cancelled'
  totalHT?: number
}

// Clés Redis
export const KEYS = {
  devis: (id: string) => `devis:${id}`,
  allDevis: () => 'devis:all',
  devisIndex: () => 'devis:index',
}

