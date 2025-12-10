import { NextRequest, NextResponse } from 'next/server';
import { sendToN8n } from '@/lib/n8n';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, sendTo } = body;
    
    if (!date || !sendTo) {
      return NextResponse.json(
        { success: false, message: 'Date and sendTo are required' },
        { status: 400 }
      );
    }

    // Send to n8n webhook
    const result = await sendToN8n('merge-pdf', { date, sendTo });
    
    return NextResponse.json({
      success: true,
      message: 'PDF merge request submitted successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error submitting PDF merge request:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to submit request' 
      },
      { status: 500 }
    );
  }
}
