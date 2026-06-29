// app/actions.ts
'use server';
import { revalidatePath } from 'next/cache';
export async function updateName(formData: FormData) {
  const name = formData.get('name');
  await db.update(name);
  revalidatePath('/profile');
}