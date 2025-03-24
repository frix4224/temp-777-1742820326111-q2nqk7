import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { registration } = await req.json()

    // Send email using your preferred email service
    const emailContent = `
      New Business Registration:
      
      Company: ${registration.companyName}
      Business Type: ${registration.businessType}
      Contact: ${registration.firstName} ${registration.lastName}
      Email: ${registration.email}
      Phone: ${registration.phone}
      
      Service Requirements:
      Frequency: ${registration.serviceFrequency}
      
      Additional Information:
      ${registration.description}
    `

    // Here you would integrate with your email service
    // For example using SendGrid, AWS SES, etc.
    
    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})