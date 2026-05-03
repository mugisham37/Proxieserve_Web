import type { TestimonialItem } from "@/types";

const AVATAR_COLORS = ["#5B7CFF", "#34D399", "#FFB547", "#F97066", "#7AA7FF", "#34A853"];

function avatarColor(name: string) {
  return AVATAR_COLORS[name.length % AVATAR_COLORS.length];
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Marie Uwimana",
    company: "Inema Boutique",
    location: "Kigali, Rwanda",
    quote:
      "I uploaded my ceramics, set a RWF 50,000 daily cap, and walked away. Two weeks later — 340 orders, mostly via WhatsApp. I can see exactly why each budget decision was made.",
    avatarColor: avatarColor("Marie Uwimana"),
  },
  {
    name: "David Okafor",
    company: "Lagos Print Co.",
    location: "Lagos, Nigeria",
    quote:
      "We tried three agencies before SolAI. None could explain where the money went. SolAI's audit trail is something our accountant actually reads.",
    avatarColor: avatarColor("David Okafor"),
  },
  {
    name: "Amara Diallo",
    company: "Aïcha Diallo Maison",
    location: "Dakar, Senegal",
    quote:
      "My customers speak French and Wolof. SolAI's sales agent handles both on Instagram DM. The MoMo integration means my rural customers can pay too.",
    avatarColor: avatarColor("Amara Diallo"),
  },
];
