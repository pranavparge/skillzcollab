import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Search } from "lucide-react";

import Card from "../components/Card";

const creativeChallenges = [
  {
    id: 1,
    name: "Nike",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/nike-4-logo-png-transparent.png",
    title: "Sustainability Storytelling Campaign",
    description:
      "Create a multimedia campaign showcasing Nike's commitment to environmental sustainability. Design visuals that highlight our Move to Zero initiative and inspire consumers to make eco-conscious choices in sports.",
    fullDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    guidelines: [
      "Campaign must align with Nike's Move to Zero sustainability initiative",
      "Include at least 3 different media formats (video, print, digital)",
      "Target audience: environmentally conscious athletes aged 18-35",
      "Brand guidelines must be strictly followed",
      "Include clear call-to-action for sustainable behavior change",
    ],
    resources: [
      {
        title: "Nike Brand Guidelines",
        url: "https://example.com/nike-brand-guide",
      },
      {
        title: "Move to Zero Initiative",
        url: "https://example.com/move-to-zero",
      },
      {
        title: "Sustainability Assets",
        url: "https://example.com/sustainability-assets",
      },
      {
        title: "Campaign Examples",
        url: "https://example.com/campaign-examples",
      },
    ],
    deadline: new Date("2025-10-15"),
    reward: 5000,
    category: "Design",
  },
  {
    id: 2,
    name: "Spotify",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/spotify-2-logo-png-transparent.png",
    title: "Gen Z Music Discovery Interface",
    description:
      "Design an innovative user interface for music discovery that resonates with Gen Z users. Focus on personalized experiences and social sharing features that make finding new music feel like a social adventure.",
    fullDescription:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris viverra venenenatis lacus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci. Aenean nec lorem. In porttitor. Donec laoreet nonummy augue. Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
    guidelines: [
      "Interface must be mobile-first and responsive",
      "Incorporate social sharing and collaborative playlist features",
      "Use Spotify's design system and color palette",
      "Focus on Gen Z user behaviors and preferences",
      "Include gamification elements for music discovery",
    ],
    resources: [
      {
        title: "Spotify Design System",
        url: "https://example.com/spotify-design-system",
      },
      {
        title: "Gen Z User Research",
        url: "https://example.com/gen-z-research",
      },
      {
        title: "Music Discovery Patterns",
        url: "https://example.com/discovery-patterns",
      },
      {
        title: "API Documentation",
        url: "https://example.com/spotify-api-docs",
      },
    ],
    deadline: new Date("2025-09-28"),
    reward: 15000,
    category: "Music",
  },
  {
    id: 3,
    name: "Coca-Cola",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/coca-cola-logo-png-transparent.png",
    title: "Holiday Packaging Design Contest",
    description:
      "Develop festive packaging designs for our holiday season bottles and cans. Create designs that celebrate global traditions while maintaining Coca-Cola's iconic brand identity and spreading joy worldwide.",
    fullDescription:
      "Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.",
    guidelines: [
      "Maintain Coca-Cola's iconic red color and logo visibility",
      "Celebrate diverse global holiday traditions",
      "Design must work on both bottles and cans",
      "Include seasonal messaging that promotes joy and togetherness",
      "Consider sustainability in packaging materials",
    ],
    resources: [
      {
        title: "Coca-Cola Brand Book",
        url: "https://example.com/coca-cola-brand-book",
      },
      {
        title: "Global Holiday Traditions",
        url: "https://example.com/holiday-traditions",
      },
      {
        title: "Packaging Templates",
        url: "https://example.com/packaging-templates",
      },
      {
        title: "Previous Holiday Campaigns",
        url: "https://example.com/holiday-campaigns",
      },
    ],
    deadline: new Date("2025-09-20"),
    reward: 3000,
    category: "Design",
  },
  {
    id: 4,
    name: "Tesla",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/tesla-9-logo-png-transparent.png",
    title: "Electric Future Vision Campaign",
    description:
      "Design a forward-thinking campaign that visualizes the future of sustainable transportation. Create compelling visuals and messaging that educate consumers about electric vehicle benefits in an engaging way.",
    fullDescription:
      "Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh.",
    guidelines: [
      "Focus on environmental benefits and sustainability",
      "Use Tesla's minimalist design aesthetic",
      "Include data visualization of EV impact",
      "Target both current ICE vehicle owners and potential EV buyers",
      "Emphasize innovation and future-forward thinking",
    ],
    resources: [
      {
        title: "Tesla Brand Guidelines",
        url: "https://example.com/tesla-brand-guidelines",
      },
      {
        title: "EV Impact Statistics",
        url: "https://example.com/ev-statistics",
      },
      {
        title: "Sustainability Data",
        url: "https://example.com/sustainability-data",
      },
      {
        title: "Future Tech Assets",
        url: "https://example.com/future-tech-assets",
      },
    ],
    deadline: new Date("2025-11-20"),
    reward: 5000,
    category: "Video",
  },
  {
    id: 5,
    name: "Adobe",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/adobe-logo-png-transparent.png",
    title: "AI-Powered Creative Tools Showcase",
    description:
      "Create an interactive experience demonstrating how AI enhances human creativity rather than replacing it. Design engaging demonstrations that show the collaborative potential between artists and artificial intelligence.",
    fullDescription:
      "Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.",
    guidelines: [
      "Demonstrate AI as a creative collaborator, not replacement",
      "Showcase multiple Adobe Creative Cloud applications",
      "Include before/after examples of AI-enhanced creativity",
      "Target professional creatives and design students",
      "Emphasize workflow efficiency and creative possibilities",
    ],
    resources: [
      {
        title: "Adobe AI Research",
        url: "https://example.com/adobe-ai-research",
      },
      { title: "Creative Cloud APIs", url: "https://example.com/cc-apis" },
      {
        title: "AI Tool Documentation",
        url: "https://example.com/ai-tool-docs",
      },
      {
        title: "Creative Workflows",
        url: "https://example.com/creative-workflows",
      },
    ],
    deadline: new Date("2025-09-29"),
    reward: 25000,
    category: "Video",
  },
  {
    id: 6,
    name: "Apple",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/apple-black-logo-png-transparent.png",
    title: "Minimalist Product Launch Campaign",
    description:
      "Develop a clean, minimalist campaign for our next product launch that emphasizes simplicity and innovation. Create designs that communicate complex technology through elegant, accessible visual language.",
    fullDescription:
      "Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.",
    guidelines: [
      "Follow Apple's minimalist design philosophy",
      "Use typography and whitespace effectively",
      "Focus on product benefits rather than technical specifications",
      "Maintain premium brand positioning",
      "Create cohesive campaign across digital and print media",
    ],
    resources: [
      {
        title: "Apple Brand Guidelines",
        url: "https://example.com/apple-brand-guidelines",
      },
      {
        title: "Product Photography",
        url: "https://example.com/product-photography",
      },
      {
        title: "Typography Standards",
        url: "https://example.com/typography-standards",
      },
      {
        title: "Campaign Archives",
        url: "https://example.com/campaign-archives",
      },
    ],
    deadline: new Date("2025-09-18"),
    reward: 50000,
    category: "Design",
  },
  {
    id: 7,
    name: "Duolingo",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/duolingo-logo-png-transparent.png",
    title: "Gamified Learning Experience Design",
    description:
      "Design new gamification elements that make language learning more engaging and addictive. Create playful interfaces and reward systems that motivate users to maintain daily learning streaks.",
    fullDescription:
      "Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus.",
    guidelines: [
      "Maintain Duolingo's playful and encouraging tone",
      "Design reward systems that promote daily engagement",
      "Include progress visualization and achievement badges",
      "Consider different learning styles and motivations",
      "Ensure accessibility for users of all ages",
    ],
    resources: [
      {
        title: "Duolingo Style Guide",
        url: "https://example.com/duolingo-style-guide",
      },
      {
        title: "Gamification Research",
        url: "https://example.com/gamification-research",
      },
      {
        title: "Learning Psychology",
        url: "https://example.com/learning-psychology",
      },
      { title: "UI Pattern Library", url: "https://example.com/ui-patterns" },
    ],
    deadline: new Date("2025-10-25"),
    reward: 1000,
    category: "Design",
  },
  {
    id: 8,
    name: "Patagonia",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/patagonia-logo-png-transparent.png",
    title: "Climate Activism Visual Campaign",
    description:
      "Create powerful visual content that inspires environmental activism and showcases Patagonia's commitment to fighting climate change. Design impactful graphics for social media and outdoor advertising.",
    fullDescription:
      "Nullam rutrum. Nam vestibulum accumsan nisl. Ut id nisl quis enim dignissim sagittis. Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros. Proin magna. Duis vel nibh at velit scelerisque suscipit. Curabitur turpis. Vestibulum suscipit nulla quis orci. Fusce ac felis sit amet ligula pharetra condimentum. Maecenas faucibus mollis interdum.",
    guidelines: [
      "Communicate urgency of climate action",
      "Use Patagonia's authentic, activist brand voice",
      "Include clear calls-to-action for environmental engagement",
      "Design for both digital and outdoor advertising formats",
      "Incorporate real environmental data and statistics",
    ],
    resources: [
      {
        title: "Patagonia Activism Hub",
        url: "https://example.com/patagonia-activism",
      },
      {
        title: "Climate Data Visualization",
        url: "https://example.com/climate-data",
      },
      {
        title: "Environmental Photography",
        url: "https://example.com/environmental-photos",
      },
      {
        title: "Campaign Best Practices",
        url: "https://example.com/campaign-practices",
      },
    ],
    deadline: new Date("2025-09-30"),
    reward: 35000,
    category: "Photography",
  },
  {
    id: 9,
    name: "Red Bull",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/red-bull-1-logo-png-transparent.png",
    title: "Extreme Sports Brand Experience",
    description:
      "Design an immersive brand experience for extreme sports events. Create dynamic visual elements and interactive installations that capture the energy and adrenaline of Red Bull's brand spirit.",
    fullDescription:
      "Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis.",
    guidelines: [
      "Capture Red Bull's high-energy, extreme sports aesthetic",
      "Design for immersive, experiential environments",
      "Include interactive elements for event attendees",
      "Incorporate motion graphics and dynamic visuals",
      "Consider multi-sensory brand experiences",
    ],
    resources: [
      {
        title: "Red Bull Brand Book",
        url: "https://example.com/redbull-brand-book",
      },
      {
        title: "Extreme Sports Footage",
        url: "https://example.com/extreme-sports-footage",
      },
      {
        title: "Event Design Examples",
        url: "https://example.com/event-design-examples",
      },
      {
        title: "Interactive Tech Resources",
        url: "https://example.com/interactive-tech",
      },
    ],
    deadline: new Date("2025-09-15"),
    reward: 15000,
    category: "Video",
  },
];

function ChallengeListing() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDeadline, setSelectedDeadline] = useState("All Deadlines");

  const categories = [
    "All Categories",
    ...new Set(creativeChallenges.map((challenge) => challenge.category)),
  ];

  const getDeadlineStatus = (deadline) => {
    const today = new Date();
    const challengeDeadline = new Date(deadline);
    const daysDiff = Math.ceil(
      (challengeDeadline - today) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff < 0) return "Past";
    if (daysDiff <= 7) return "Upcoming";
    return "Ongoing";
  };

  const filteredChallenges = useMemo(() => {
    return creativeChallenges.filter((challenge) => {
      const matchesSearch =
        challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        challenge.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All Categories" ||
        challenge.category === selectedCategory;

      const matchesDeadline =
        selectedDeadline === "All Deadlines" ||
        getDeadlineStatus(challenge.deadline) === selectedDeadline;

      return matchesSearch && matchesCategory && matchesDeadline;
    });
  }, [searchTerm, selectedCategory, selectedDeadline]);

  const handleDetailsClick = (challenge) => {
    navigate("/details", { state: { challenge } });
  };

  return (
    <>
      <div className="mb-6">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search challenges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white w-full"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="relative">
            <select
              value={selectedDeadline}
              onChange={(e) => setSelectedDeadline(e.target.value)}
              className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white w-full"
            >
              <option value="All Deadlines">All Deadlines</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Past">Past</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      {filteredChallenges.map((challenge) => (
        <Card
          key={challenge.id}
          {...challenge}
          onClick={() => handleDetailsClick(challenge)}
        />
      ))}
    </>
  );
}

export default ChallengeListing;
