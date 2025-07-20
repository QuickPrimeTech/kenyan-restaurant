import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function TeamSection() {
  const team = [
    {
      name: "Giuseppe Marinelli",
      role: "Founder & Executive Chef",
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1749719145/chef_3_teamzr.jpg",
      bio: "With over 40 years of culinary experience, Giuseppe brings authentic Italian coastal cuisine to every dish.",
    },
    {
      name: "Maria Marinelli",
      role: "Co-Founder & General Manager",
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1749719146/chef_1_xtp86u.png",
      bio: "Maria oversees operations and ensures every guest feels like family from the moment they walk in.",
    },
    {
      name: "Diana Marinelli",
      role: "Head Chef",
      image:
        "https://res.cloudinary.com/quick-prime-tech/image/upload/v1749719144/chef_1_qivkfm.jpg",
      bio: "The next generation, Antonio combines traditional techniques with modern innovation and local ingredients.",
    },
  ];

  return (
    <section className="section bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-gray-900 mb-6">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The passionate individuals who bring our coastal dining vision to
            life every day
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                width={300}
                height={300}
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
