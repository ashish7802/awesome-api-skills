import Mixpanel from 'mixpanel';
const mixpanel = Mixpanel.init('TOKEN');
mixpanel.track('Signed Up', { distinct_id: 'user_123', 'Referred By': 'Friend' });