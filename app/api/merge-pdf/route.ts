import { NextRequest, NextResponse } from 'next/server';

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

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return NextResponse.json({
      success: true,
      message: `PDFs merged successfully and sent to ${sendTo}`,
      data: {
        date,
        sendTo,
        status: 'completed',
        mergedFileName: `merged_timesheets_${date}.pdf`
      }
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
