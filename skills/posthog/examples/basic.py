import posthog
posthog.project_api_key = 'phc_123'
posthog.capture('user_123', 'Order Completed')