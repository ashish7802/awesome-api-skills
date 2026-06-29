def get_db():
  db = SessionLocal()
  try: yield db
  finally: db.close()

@app.get('/users/')
def get_users(db: Session = Depends(get_db)):
  return db.query(User).all()