import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()

  const ghlApiKey = process.env.GHL_API_KEY
  const ghlLocationId = process.env.GHL_LOCATION_ID

  if (!ghlApiKey || !ghlLocationId) {
    return NextResponse.json({ error: 'GHL API key or Location ID is missing' }, { status: 500 })
  }

  try {
    const response = await fetch(`https://rest.gohighlevel.com/v1/contacts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ghlApiKey}`,
      },
      body: JSON.stringify({
        locationId: ghlLocationId,
        name: body.name,
        email: body.email,
        phone: body.phone,
        customField: {
          message: body.message,
        },
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to submit to GHL')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error submitting to GHL:', error)
    return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 })
  }
}