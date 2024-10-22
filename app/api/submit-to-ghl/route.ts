import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  console.log('API route called')
  const ghlApiKey = process.env.GHL_API_KEY
  const ghlLocationId = process.env.GHL_LOCATION_ID

  if (!ghlApiKey || !ghlLocationId) {
    console.error('GHL API key or Location ID is missing')
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  try {
    const body = await request.json()
    console.log('Received body:', body)

    if (!body.name || !body.email) {
      console.error('Name or email is missing')
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    console.log('Sending request to GHL API')
    const response = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ghlApiKey}`,
      },
      body: JSON.stringify({
        locationId: ghlLocationId,
        name: body.name,
        email: body.email,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('GHL API error:', errorData)
      throw new Error(`Failed to submit to GHL: ${JSON.stringify(errorData)}`)
    }

    const data = await response.json()
    console.log('GHL API response:', data)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in API route:', error)
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}