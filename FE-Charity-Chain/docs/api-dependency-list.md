# API Dependency List (Frontend Handoff)

## Base Assumption
- Base URL from `VITE_API_URL` with fallback in frontend service layer.
- Auth uses `Authorization: Bearer <token>` header.

## Endpoints Required by Current UI

### Campaign
- `GET /campaigns?page=<number>&limit=<number>`
- `GET /campaigns/:id`
- `POST /org/campaigns`

### Withdrawal
- `POST /org/campaigns/:campaignId/withdrawal-requests`
- `GET /campaigns/:campaignId/withdrawal-requests`
- `GET /withdrawal-requests/:id`
- `GET /withdrawal-requests/:requestId/votes`
- `POST /withdrawal-requests/:requestId/votes`

### Auth / Profile
- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/register-org`
- `GET /profile`
- `PUT /profile/wallet`

## Required Response/Data Fields

### Campaign object (`GET /campaigns`, `GET /campaigns/:id`)
- `id: number|string`
- `title: string`
- `short_description: string`
- `status: string` (expected values include `active`, `completed`, `draft`, `pending_review`)
- `goal_amount: number|string`
- `current_amount: number|string`
- `token_address?: string`
- `contract_address?: string`
- `token_symbol?: string` (fallbacks: `symbol`, `token.symbol`)
- `withdrawals?: WithdrawalRequest[]`

### Withdrawal request object (`campaign.withdrawals` and withdrawal endpoints)
- `id: number|string`
- `amount: number|string`
- `status: string` (frontend expects `voting`, `approved`, `rejected`; case-insensitive recommended)
- `yes_votes?: number`
- `no_votes?: number`
- `voting_deadline?: string` (ISO datetime)
- `reason?: string`
- `proof_url?: string`
- `tx_hash?: string`
- `created_at?: string`
- `updated_at?: string`

### Vote list item (`GET /withdrawal-requests/:requestId/votes`)
At least one wallet field is required to detect whether current user has voted:
- `wallet_address` OR `voter_wallet` OR `wallet` OR `address`

Vote choice fields accepted by frontend:
- `is_approved: boolean` OR
- `vote: "yes"|"no"` OR
- `choice: "yes"|"no"` OR
- `decision: "yes"|"no"`

### Vote submit payload (`POST /withdrawal-requests/:requestId/votes`)
- Request body: `{ "is_approved": boolean }`

### Create withdrawal payload (`POST /org/campaigns/:campaignId/withdrawal-requests`)
Frontend sends `multipart/form-data` with:
- `amount: string`
- `reason: string`
- `proof_file: File` (PDF/JPG/PNG, <=10MB)

## UI Behavior Dependencies
- Guest (no wallet connected) can view campaign and vote stats but cannot vote.
- Connected wallet can vote only once per request from UI perspective; backend must enforce one-vote rule.
- Countdown requires valid `voting_deadline` timestamps.
- Disbursement history shows approved requests and links `tx_hash` to Sepolia Etherscan.

## Response Envelope Assumption
Frontend currently uses service responses in this shape:
- success envelope includes `status_code` and `data`
- for vote list endpoint, frontend tolerates:
  - array directly
  - `{ data: array }`
  - `{ data: { items: array } }`
  - `{ data: { votes: array } }`

Recommend standardizing one response shape for all endpoints.
