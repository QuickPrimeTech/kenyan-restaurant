export default function ReservationHeader() {
  return (
    <section className="section bg-header-foreground/20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Reservations
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Reserve Your Table
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Secure your spot for an unforgettable coastal dining experience. We
            recommend booking in advance, especially for sunset dining and
            weekend reservations.
          </p>
        </div>
      </div>
    </section>
  );
}
