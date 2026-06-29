// +page.server.ts
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    console.log(data.get('email'));
    return { success: true };
  }
};