import { NextRequest, NextResponse } from 'next/server'
import { redis, KEYS, DevisData } from '@/lib/redis'

// GET /api/devis/[id] - Récupérer un devis spécifique
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { error: 'ID du devis requis' },
        { status: 400 }
      )
    }

    const devis = await redis.get<DevisData>(KEYS.devis(id))

    if (!devis) {
      return NextResponse.json(
        { error: 'Devis non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json({ devis })
  } catch (error) {
    console.error('Erreur lors de la récupération du devis:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du devis' },
      { status: 500 }
    )
  }
}

// PUT /api/devis/[id] - Mettre à jour un devis
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await req.json()

    if (!id) {
      return NextResponse.json(
        { error: 'ID du devis requis' },
        { status: 400 }
      )
    }

    // Vérifier que le devis existe
    const existingDevis = await redis.get<DevisData>(KEYS.devis(id))

    if (!existingDevis) {
      return NextResponse.json(
        { error: 'Devis non trouvé' },
        { status: 404 }
      )
    }

    // Mettre à jour le devis
    const updatedDevis: DevisData = {
      ...existingDevis,
      ...body,
      id, // S'assurer que l'ID ne change pas
      updatedAt: new Date().toISOString(),
    }

    // Recalculer le total HT
    const subtotalHT = updatedDevis.lines.reduce((sum, line) => sum + line.total, 0)
    let totalHT = subtotalHT
    
    if (updatedDevis.discount && updatedDevis.discount.value > 0) {
      if (updatedDevis.discount.type === 'percentage') {
        totalHT = subtotalHT - (subtotalHT * updatedDevis.discount.value) / 100
      } else {
        totalHT = subtotalHT - updatedDevis.discount.value
      }
    }
    
    updatedDevis.totalHT = totalHT

    await redis.set(KEYS.devis(id), updatedDevis)

    return NextResponse.json({ 
      success: true, 
      devis: updatedDevis,
      message: 'Devis mis à jour avec succès'
    })
  } catch (error) {
    console.error('Erreur lors de la mise à jour du devis:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du devis' },
      { status: 500 }
    )
  }
}

// DELETE /api/devis/[id] - Supprimer un devis
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { error: 'ID du devis requis' },
        { status: 400 }
      )
    }

    // Vérifier que le devis existe
    const existingDevis = await redis.get<DevisData>(KEYS.devis(id))

    if (!existingDevis) {
      return NextResponse.json(
        { error: 'Devis non trouvé' },
        { status: 404 }
      )
    }

    // Supprimer le devis
    await redis.del(KEYS.devis(id))

    // Supprimer l'ID de l'index
    await redis.srem(KEYS.devisIndex(), id)

    return NextResponse.json({ 
      success: true, 
      message: 'Devis supprimé avec succès'
    })
  } catch (error) {
    console.error('Erreur lors de la suppression du devis:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du devis' },
      { status: 500 }
    )
  }
}

