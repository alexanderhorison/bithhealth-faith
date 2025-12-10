import { NextRequest, NextResponse } from 'next/server';

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

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return NextResponse.json({
      success: true,
      message: 'Timesheet processed successfully',
      data: {
        fileName: file.name,
        fileSize: file.size,
        status: 'completed',
        recordsProcessed: Math.floor(Math.random() * 1000) + 500
      }
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
