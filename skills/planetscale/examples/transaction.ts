await conn.transaction(async (tx) => {
  await tx.execute('INSERT INTO logs (msg) VALUES (?)', ['start']);
});