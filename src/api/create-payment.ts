import { createMollieClient } from '@mollie/api-client';

const mollieClient = createMollieClient({ 
  apiKey: 'live_mEmS3snqamKtaNsQNpSmhFmUR5m8DN' 
});

export async function createPayment(req: Request) {
  try {
    // Get request body as text
    let body = '';
    // @ts-ignore - req is actually a Node request
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // Wait for the complete request body
    await new Promise((resolve) => {
      // @ts-ignore - req is actually a Node request
      req.on('end', resolve);
    });

    if (!body) {
      throw new Error('Request body is empty');
    }

    const { amount, currency, description, redirectUrl, webhookUrl, metadata } = JSON.parse(body);

    // Validate required fields
    if (!amount || !currency || !description || !redirectUrl) {
      throw new Error('Missing required payment fields');
    }

    console.log('Creating payment with data:', {
      amount,
      currency,
      description,
      redirectUrl,
      metadata
    });

    // Create payment request with proper structure
    const payment = await mollieClient.payments.create({
      amount: {
        value: amount.toFixed(2),
        currency: currency
      },
      description,
      redirectUrl,
      webhookUrl,
      metadata: {
        order_number: metadata?.orderNumber || '',
        customer_name: metadata?.customerName || 'Guest',
        email: metadata?.email || '',
        timestamp: new Date().toISOString(),
        custom: {} // Required by Mollie
      },
      method: ['ideal', 'creditcard', 'bancontact'],
      locale: 'nl_NL'
    });

    console.log('Payment created:', payment);

    return new Response(
      JSON.stringify({
        id: payment.id,
        checkoutUrl: payment.getCheckoutUrl()
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } catch (error) {
    console.error('Payment creation error:', error);
    
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Payment creation failed'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}