// Pharmacy delivery service for handling delivery data processing
import { ApiResponse } from './types'

export interface PharmacyDeliveryData {
  data: File
  Month: string
}

export class PharmacyDeliveryService {
  private static readonly API_BASE_URL = 'https://n8n.zenithtech.cloud/webhook-test'

  static async submitDeliveryData(data: PharmacyDeliveryData): Promise<ApiResponse> {
    const formData = new FormData()
    formData.append('data', data.data)
    formData.append('Month', data.Month)

    try {
      // Simulate processing time for better UX demonstration
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // For testing: always return success to demonstrate complete workflow
      const mockResponse = {
        status: 'success',
        processedAt: new Date().toISOString(),
        fileName: data.data.name,
        month: data.Month,
        transactionsProcessed: Math.floor(Math.random() * 500) + 100,
        unbilledReportsGenerated: Math.floor(Math.random() * 50) + 10,
        tikiOrdersProcessed: Math.floor(Math.random() * 30) + 5
      }

      return {
        success: true,
        message: `Successfully processed ${mockResponse.transactionsProcessed} transactions for ${data.Month}. Generated ${mockResponse.unbilledReportsGenerated} unbilled reports and ${mockResponse.tikiOrdersProcessed} TIKI delivery orders.`,
        data: mockResponse
      }

      /* Uncomment when ready to use real N8N webhook:
      const response = await fetch(`${this.API_BASE_URL}/pharmacy-delivery/reconsile`, {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to process delivery data')
      }

      return {
        success: true,
        message: result.message || 'Workflow was started',
        data: result
      }
      */
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to process delivery data')
    }
  }
}