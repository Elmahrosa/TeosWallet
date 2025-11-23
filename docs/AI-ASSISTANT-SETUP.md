# TEOS Wallet AI Assistant Setup Guide

## Overview

TEOS Wallet features an intelligent AI assistant powered by **OpenMind AI** with automatic fallback to OpenAI. The assistant helps users understand their wallet, transactions, token swaps, and blockchain concepts.

---

## Features

- **Dual AI Provider Support**: Primary OpenMind AI with OpenAI fallback
- **Wallet Context Awareness**: AI knows your balances and recent transactions
- **Egyptian Ecosystem Expert**: Specialized knowledge of TEOS, TUT, and ERT tokens
- **Bilingual Support**: Responds in both English and Arabic
- **Real-time Streaming**: Fast, responsive conversations
- **Provider Toggle**: Users can switch between OpenMind and OpenAI in the UI

---

## Setup Instructions

### 1. Get OpenMind AI API Key (Primary Provider)

1. Visit [https://openmind.ai](https://openmind.ai)
2. Create an account or sign in
3. Navigate to API Keys section
4. Generate a new API key
5. Copy the API key

### 2. Get OpenAI API Key (Fallback Provider)

1. Visit [https://platform.openai.com](https://platform.openai.com)
2. Sign in or create an account
3. Go to API Keys section
4. Create a new secret key
5. Copy the API key

### 3. Configure Environment Variables

Add these variables to your Vercel project or `.env.local` file:

\`\`\`env
# OpenMind AI (Primary)
OPENMIND_API_KEY=your_openmind_api_key_here
OPENMIND_BASE_URL=https://api.openmind.ai/v1

# OpenAI (Fallback)
OPENAI_API_KEY=your_openai_api_key_here
\`\`\`

### 4. Deploy to Vercel

\`\`\`bash
# If using Vercel CLI
vercel env add OPENMIND_API_KEY
vercel env add OPENMIND_BASE_URL
vercel env add OPENAI_API_KEY

# Redeploy
vercel --prod
\`\`\`

Or add via Vercel Dashboard:
1. Go to your project settings
2. Navigate to Environment Variables
3. Add each variable
4. Redeploy the project

---

## Usage

### For Users

1. Click the AI assistant button (bottom-right corner)
2. Choose your preferred AI provider (OpenMind or OpenAI)
3. Ask questions about:
   - Token balances
   - Transaction history
   - How to swap tokens
   - Pi Network integration
   - Security best practices
   - Egyptian ecosystem tokens

### Example Questions

- "What's my current TEOS balance?"
- "How do I swap Pi for TEOS?"
- "Explain the difference between TUT and ERT tokens"
- "What are the recent transactions in my wallet?"
- "How does staking work?"

---

## Provider Selection

### OpenMind AI (Default)
- **Pros**: Advanced reasoning, cost-effective, optimized for blockchain
- **Model**: GPT-4 compatible
- **Best for**: Complex wallet queries, multi-step transactions

### OpenAI (Fallback)
- **Pros**: Highly reliable, fast responses, broad knowledge
- **Model**: GPT-4o-mini
- **Best for**: Quick answers, general blockchain questions

The system automatically uses OpenMind AI if configured, with seamless fallback to OpenAI if:
- OpenMind API key is missing
- OpenMind service is unavailable
- Request fails for any reason

---

## API Endpoints

### Server Actions

**`lib/ai-assistant.ts`**

\`\`\`typescript
// Standard text generation
await askWalletAssistant({
  message: "What's my balance?",
  context: { balances: { TEOS: 100, TUT: 50 } },
  provider: "openmind" // or "openai"
})

// Streaming responses
await streamWalletAssistant({
  message: "Explain staking",
  provider: "openmind"
})
\`\`\`

---

## Cost Considerations

### OpenMind AI Pricing
- Competitive rates for blockchain applications
- Typically 30-50% cheaper than OpenAI
- Check current pricing at [openmind.ai/pricing](https://openmind.ai/pricing)

### OpenAI Pricing
- GPT-4o-mini: $0.15 per 1M input tokens, $0.60 per 1M output tokens
- Budget-friendly for fallback usage
- Check current pricing at [openai.com/pricing](https://openai.com/pricing)

### Rate Limiting
- Max 500 tokens per response
- Implement user rate limiting if needed
- Monitor usage in provider dashboards

---

## Troubleshooting

### AI Assistant Not Responding

1. **Check API Keys**: Verify both keys are set in Vercel environment variables
2. **Check Logs**: View Vercel function logs for error messages
3. **Test Provider**: Try switching between OpenMind and OpenAI in the UI
4. **Verify Deployment**: Ensure environment variables were applied after latest deploy

### "All AI providers failed" Error

This means both OpenMind and OpenAI failed. Check:
- API keys are valid and not expired
- Account has sufficient credits/balance
- No rate limiting on your account
- Network connectivity to provider APIs

### Slow Responses

- OpenMind is generally faster for complex queries
- Switch to OpenAI for quick general questions
- Check your internet connection
- Verify provider service status

---

## Security Best Practices

1. **Never expose API keys** in client-side code
2. **Use server actions** (`"use server"`) for all AI calls
3. **Implement rate limiting** to prevent abuse
4. **Rotate keys regularly** (monthly recommended)
5. **Monitor usage** for unexpected spikes
6. **Set spending limits** in provider dashboards

---

## Future Enhancements

- Voice input support
- Multi-language automatic detection
- Transaction execution via AI commands
- Portfolio analysis and recommendations
- Custom AI training on Egyptian ecosystem data

---

## Support

- **OpenMind AI**: [support@openmind.ai](mailto:support@openmind.ai)
- **OpenAI**: [help.openai.com](https://help.openai.com)
- **TEOS Wallet**: [ayman@elmahrousa.com](mailto:ayman@elmahrousa.com)

---

**Last Updated**: January 2025  
**Version**: 1.0.0
