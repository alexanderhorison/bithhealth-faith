import { NextRequest, NextResponse } from 'next/server';
import { uploadFileToN8n } from '@/lib/n8n';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      );
    }

    // Send to n8n webhook
    const result = await uploadFileToN8n('timesheet-summary', formData);
    
    return NextResponse.json({
      success: true,
      message: 'Timesheet uploaded successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error uploading timesheet:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to upload timesheet' 
      },
      { status: 500 }
    );
  }
}
