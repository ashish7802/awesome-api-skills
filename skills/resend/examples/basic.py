import resend
resend.api_key = "re_123"
r = resend.Emails.send({"from":"me@me.com", "to":"you@you.com", "subject":"Hi", "html":"<p>Hi</p>"})