import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authOptions";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions) as { user?: { email?: string } };

  console.log("session:", session);

  if (!session || !session.user?.email) {
    redirect("/login");
  }

  return (
    <div style={{ padding: '2rem' }}>
      {/* ✅ Aangepaste regel hieronder */}
      <h1>Welkom op je Dashboard{session?.user?.email ? `, ${session.user.email}` : ''}!</h1>
      <p>Je bent succesvol ingelogd.</p>

      <form method="POST" action="/dashboard/send" style={{ marginTop: '2rem' }}>
        <h2>E-mail opslaan</h2>
        <input
          type="text"
          name="subject"
          placeholder="Onderwerp"
          required
        /><br /><br />
        <textarea
          name="message"
          placeholder="Bericht"
          required
        /><br /><br />
        <button type="submit">Opslaan in database</button>
      </form>
    </div>
  );
}
