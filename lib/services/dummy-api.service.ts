// Base types for API responses
import { ApiResponse } from './types'

// Generic API service for testing and dummy endpoints
export class DummyApiService {
  static async simulateProcessing(delay: number = 2000): Promise<ApiResponse> {
    await new Promise(resolve => setTimeout(resolve, delay))
    
    return {
      success: true,
      message: 'Processing completed successfully'
    }
  }

  static async simulateError(delay: number = 1000): Promise<never> {
    await new Promise(resolve => setTimeout(resolve, delay))
    throw new Error('Simulated API error for testing')
  }
}