export type LinkContent = {
  label: string;
  href: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  badges: Array<{
    label: string;
    icon: string;
    iconWidth: number;
    iconHeight: number;
  }>;
  primaryAction: LinkContent;
  secondaryAction: LinkContent;
};

export type TextCard = {
  title: string;
  description: string;
};

export type HomeContent = {
  hero: HeroContent;
  quality: {
    eyebrow: string;
    title: string;
    description: string;
    items: TextCard[];
  };
  process: {
    eyebrow: string;
    title: string;
    items: TextCard[];
  };
  finalCta: {
    title: string;
    description: string;
    action: LinkContent;
  };
};

export type CatalogItem = {
  id: string;
  name: string;
  description: string;
  price?: number;
};

export type CatalogContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: CatalogItem[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqContent = {
  eyebrow: string;
  title: string;
  items: FaqItem[];
};
