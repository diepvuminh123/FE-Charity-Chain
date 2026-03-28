import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import withdrawalService from '@/services/withdrawalService';

// Mock service API
jest.mock('@/services/withdrawalService', () => ({
  createWithdrawal: jest.fn()
}));

describe('Withdrawal Flow (SCRUM-64)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('validates creating withdrawal request correctly (amount, reason, proof_url)', async () => {
    // Giả lập mock API resolve
    withdrawalService.createWithdrawal.mockResolvedValue({
      status: 201,
      data: {
        id: 'wr-1',
        amount: 50000,
        reason: 'Payment for supplies',
        proof_url: 'https://ex.com/proof.jpg'
      }
    });

    const mockRequestData = {
      campaign_id: 'c-1',
      amount: 50000,
      reason: 'Payment for supplies',
      proof_url: 'https://ex.com/proof.jpg'
    };

    const response = await withdrawalService.createWithdrawal(mockRequestData);
    
    expect(withdrawalService.createWithdrawal).toHaveBeenCalledTimes(1);
    expect(withdrawalService.createWithdrawal).toHaveBeenCalledWith(mockRequestData);
    expect(response.status).toBe(201);
    expect(response.data.amount).toBe(50000);
    expect(response.data.reason).toBe('Payment for supplies');
  });
});
