---
title: braintree
---

# braintree

<p class="skill-meta">Payments · Commerce</p>


<div class="trust-panel">

| | |
| :--- | :--- |
| **Validation** | validated |
| **Schema** | 1.0.0 |
| **Maintainer** | Awesome API Skills Team |
| **Updated** | 2026-07-02 |
| **Languages** | typescript, python, java |
| **Agents** | cursor, claude-code, cline, continue |
| **Doc source** | [official docs](https://developer.paypal.com/braintree/docs) |

</div>


## Graph

- **alternative to** → [stripe](/skills/stripe)

---


## Overview
Braintree (by PayPal) provides enterprise payment processing accepting Credit Cards, PayPal, Venmo, Apple Pay, and Google Pay with PCI-compliant Hosted Fields and Drop-in UI.

## Installation
```bash
npm install braintree
```

## Server Initialization
```typescript
import braintree, { Environment } from 'braintree';

const gateway = new braintree.BraintreeGateway({
  environment:
    process.env.NODE_ENV === 'production'
      ? Environment.Production
      : Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID!,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY!,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY!,
});
```

## Standard Payment Flow

### Step 1: Generate Client Token for Frontend
```typescript
export async function getClientToken(customerId?: string) {
  const response = await gateway.clientToken.generate({
    customerId: customerId,
  });
  return response.clientToken;
}
```

### Step 2: Charge the Payment Method Nonce
```typescript
export async function createSaleTransaction(nonce: string, amount: string) {
  const result = await gateway.transaction.sale({
    amount,
    paymentMethodNonce: nonce,
    options: {
      submitForSettlement: true, // Auto-submit for settlement
    },
  });

  if (result.success) {
    return { success: true, transactionId: result.transaction.id };
  } else {
    throw new Error(result.message);
  }
}
```

## AI Pitfalls & Anti-Hallucination Guidelines
- **Never Handle PAN Data**: Never write code that receives raw card numbers on the backend. The frontend must tokenize the card via Braintree Drop-in/Hosted Fields and send only a `paymentMethodNonce`.
- **Settlement Flag**: Forgetting `submitForSettlement: true` leaves transactions in an authorized-only state requiring manual capture.

## Production Verification Checklist
- [ ] Client token generated per checkout session
- [ ] 3D Secure 2.0 verification enabled for PSD2 SCA compliance
- [ ] Webhook listeners configured for disbursement and dispute notifications

---
> **Last Verified:** 2026-07-03

