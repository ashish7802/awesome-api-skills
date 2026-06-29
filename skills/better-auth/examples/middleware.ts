import { auth } from './auth';
const session = await auth.api.getSession({ headers: req.headers });
if (!session) return res.status(401).send();