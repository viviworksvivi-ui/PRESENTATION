import { NextRequest, NextResponse } from 'next/server'
import { redis, KEYS, DevisData } from '@/lib/redis'

// GET /api/devis - Récupérer tous les devis
export async function GET(req: NextRequest) {
  try {
    // Récupérer tous les IDs de devis
    const devisIds = await redis.smembers(KEYS.devisIndex())
    
    if (!devisIds || devisIds.length === 0) {
      return NextResponse.json({ devis: [] })
    }

    // Récupérer tous les devis en parallèle
    const devisPromises = devisIds.map(async (id) => {
      return await redis.get<DevisData>(KEYS.devis(id as string))
    })

    const allDevis = await Promise.all(devisPromises)
    
    // Filtrer les devis null et trier par date de création (plus récent d'abord)
    const validDevis = allDevis
      .filter((devis): devis is DevisData => devis !== null)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({ devis: validDevis })
  } catch (error) {
    console.error('Erreur lors de la récupération des devis:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des devis' },
      { status: 500 }
    )
  }
}

// POST /api/devis - Créer ou mettre à jour un devis
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const devisData: DevisData = body

    // Validation basique
    if (!devisData.numero || !devisData.clientNom) {
      return NextResponse.json(
        { error: 'Numéro de devis et nom du client requis' },
        { status: 400 }
      )
    }

    // Générer un ID unique si pas présent
    if (!devisData.id) {
      devisData.id = `devis-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }

    // Calculer le total HT
    const subtotalHT = devisData.lines.reduce((sum, line) => sum + line.total, 0)
    let totalHT = subtotalHT
    
    if (devisData.discount && devisData.discount.value > 0) {
      if (devisData.discount.type === 'percentage') {
        totalHT = subtotalHT - (subtotalHT * devisData.discount.value) / 100
      } else {
        totalHT = subtotalHT - devisData.discount.value
      }
    }
    
    devisData.totalHT = totalHT

    // Ajouter les timestamps
    const now = new Date().toISOString()
    if (!devisData.createdAt) {
      devisData.createdAt = now
    }
    devisData.updatedAt = now

    // Status par défaut
    if (!devisData.status) {
      devisData.status = 'draft'
    }

    // Sauvegarder le devis dans Redis
    await redis.set(KEYS.devis(devisData.id), devisData)

    // Ajouter l'ID dans l'index des devis
    await redis.sadd(KEYS.devisIndex(), devisData.id)

    return NextResponse.json({ 
      success: true, 
      devis: devisData,
      message: 'Devis sauvegardé avec succès'
    })
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du devis:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la sauvegarde du devis' },
      { status: 500 }
    )
  }
}

// DELETE /api/devis - Supprimer tous les devis (pour développement uniquement)
export async function DELETE(req: NextRequest) {
  try {
    // Récupérer tous les IDs
    const devisIds = await redis.smembers(KEYS.devisIndex())
    
    if (!devisIds || devisIds.length === 0) {
      return NextResponse.json({ message: 'Aucun devis à supprimer' })
    }

    // Supprimer tous les devis
    const deletePromises = devisIds.map(async (id) => {
      return await redis.del(KEYS.devis(id as string))
    })

    await Promise.all(deletePromises)

    // Supprimer l'index
    await redis.del(KEYS.devisIndex())

    return NextResponse.json({ 
      success: true, 
      message: `${devisIds.length} devis supprimés`
    })
  } catch (error) {
    console.error('Erreur lors de la suppression des devis:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression des devis' },
      { status: 500 }
    )
  }
}

