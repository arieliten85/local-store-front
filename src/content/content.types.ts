export type LinkContent = {
  label: string;
  href: string;
};

export type ImageContent = {
  src: string;
  alt: string;
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

export type QualityItem = {
  title: string;
  description: string;
  image: ImageContent;
};

export type HomeContent = {
  hero: HeroContent;
  quality: {
    title: string;
    items: QualityItem[];
  };
  process: {
    eyebrow: string;
    title: string;
    items: TextCard[];
  };
  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
    image: ImageContent;
    action: LinkContent;
  };
};

export type ProductItem = {
  name: string;
  ingredients: string;
  image: ImageContent;
};

export type ProductContent = {
  title: string;
  description: string;
  items: ProductItem[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqContent = {
  title: string;
  items: FaqItem[];
};

export type FooterContent = {
  reservations: {
    title: string;
    lines: string[];
  };
  deliveries: {
    title: string;
    lines: string[];
  };
  coverage: {
    title: string;
    area: string;
    description: string;
  };
  contact: {
    title: string;
    whatsappLabel: string;
  };
  linksTitle: string;
  socialsTitle: string;
  copyright: string;
  legalLinks: LinkContent[];
};

export type OrderStepContent = {
  label: string;
};

export type OrderContent = {
  heading: {
    title: string;
  };
  gallery: {
    label: string;
    viewLabel: string;
    featured: ImageContent;
    thumbnails: ImageContent[];
  };
  steps: {
    size: OrderStepContent;
    date: OrderStepContent;
    slot: OrderStepContent;
    address: { label: string };
  };
  productName: string;
  recommendedBadge: string;
  availabilityNotes: {
    available: string;
    soldOut: string;
  };
  buyLabel: string;
  addressField: {
    label: string;
    placeholder: string;
    helper: string;
    requiredMessage: string;
  };
  dialog: {
    title: string;
    subtitle: string;
    sizeLabel: string;
    dateLabel: string;
    slotLabel: string;
    addressLabel: string;
    deliveryLabel: string;
    coverageLabel: string;
    totalLabel: string;
    freeDeliveryValue: string;
    coverageValue: string;
    footnote: string;
    backLabel: string;
    confirmLabel: string;
    closeLabel: string;
  };
  message: {
    greeting: string;
    sizeLabel: string;
    scheduleLabel: string;
    addressLabel: string;
    totalLabel: string;
  };
};
