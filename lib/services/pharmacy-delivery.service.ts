// Pharmacy delivery service for handling delivery data processing
import { BaseService } from './base.service'
import {
  ApiResponse,
  PharmacyDeliveryData,
  PharmacySummaryData,
  PharmacyDeliveryResponse,
  PharmacySummaryResponse,
} from './types'

export class PharmacyDeliveryService extends BaseService {
  static async submitDeliveryData(
    data: PharmacyDeliveryData
  ): Promise<ApiResponse<PharmacyDeliveryResponse>> {
    const formData = new FormData()
    formData.append('data', data.data)
    formData.append('Month', data.month)

    return this.fetch({
      endpoint: '/pharmacy-delivery/reconsile',
      body: formData,
      delay: this.getDelay('PHARMACY_SUBMIT'),
    })
  }

  static async generateSummaryReport(
    data: PharmacySummaryData
  ): Promise<ApiResponse<PharmacySummaryResponse>> {
    return this.fetch({
      endpoint: '/pharmacy-delivery/generate-summary-report',
      method: 'GET',
      queryParams: { month: data.month },
      delay: this.getDelay('PHARMACY_SUMMARY'),
    })
  }
}