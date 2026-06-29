from clerk_backend_api import Clerk
clerk = Clerk(bearer_auth="sk_test_xxx")
session = clerk.sessions.verify_session("sess_xxx", "token")