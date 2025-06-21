import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import locationData from "@/data/locations.json";
import { useEffect, useState } from "react";

export default function BookingForm() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const checkIn = searchParams.get("from") || "";
  const checkOut = searchParams.get("to") || "";
  const navigate = useNavigate();

  const typedData: Record<
    string,
    (typeof locationData)[keyof typeof locationData]
  > = locationData;
  const property = locationData[id as keyof typeof locationData];

  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!property) {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-2xl font-bold">Wohnung nicht gefunden</h1>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);

    // In einem echten Szenario würden wir hier z. B. ein Payment auslösen oder Daten senden
  };

  if (bookingConfirmed) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">✅ Buchung erfolgreich!</h1>
        <p className="mb-4">
          Du hast <strong>{property.name}</strong> vom{" "}
          <strong>{checkIn}</strong> bis <strong>{checkOut}</strong> gebucht.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Zurück zur Startseite
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Buchung bestätigen</h1>

      <img
        src={property.images?.[0]}
        alt={property.name}
        className="w-full h-64 object-cover rounded-md mb-4"
      />

      <div className="mb-4">
        <h2 className="text-lg font-semibold">{property.name}</h2>
        <p className="text-gray-500">{property.city}</p>
        <p className="text-blue-600 font-bold">{property.price}€ / Nacht</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Check-in</label>
          <input
            type="date"
            value={checkIn}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Check-out</label>
          <input
            type="date"
            value={checkOut}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Buchung abschließen
        </button>
      </form>
    </div>
  );
}
