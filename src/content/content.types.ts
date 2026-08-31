export type LinkContent = {
  label: string;
  href: string;
};

export type ImageContent = {
  src: string;
  alt: string;
};

export type HeroContent = {
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
  coverage: {
    label: string;
    linkLabel: string;
    href: string;
  };
  action: LinkContent;
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

export type OrderOptionFieldContent = {
  label: string;
  placeholder?: string;
  optionalHint?: string;
  helper?: string;
  requiredMessage?: string;
};

export type OrderContent = {
  heading: {
    title: string;
  };
  reserveHeading: string;
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
    customer: { label: string };
  };
  productName: string;
  recommendedBadge: string;
  availabilityNotes: {
    available: string;
    soldOut: string;
  };
  cta: string;
  buyLabel: string;
  addressField: OrderOptionFieldContent & { requiredMessage: string };
  betweenStreetsField: OrderOptionFieldContent;
  floorField: OrderOptionFieldContent;
  referenceField: OrderOptionFieldContent;
  customerNameField: OrderOptionFieldContent & { requiredMessage: string };
  phoneField: OrderOptionFieldContent;
  dialog: {
    title: string;
    subtitle: string;
    sizeLabel: string;
    productLineLabelSingular: string;
    productLineLabelPlural: string;
    dateLabel: string;
    slotLabel: string;
    addressLabel: string;
    betweenStreetsLabel: string;
    floorLabel: string;
    referenceLabel: string;
    customerNameLabel: string;
    phoneLabel: string;
    subtotalLabel: string;
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
  wizard: {
    editLabel: string;
    continueLabel: string;
    backLabel: string;
    stepDateTitle: string;
    stepAddressTitle: string;
    stepCustomerTitle: string;
    stepSummaryTitle: string;
    summaryButtonLabel: string;
    totalPiecesLabel: string;
    totalLabel: string;
    addLabel: string;
    removeLabel: string;
    limitMessage: string;
  };
  message: {
    greeting: string;
    orderSection: string;
    sizeLabel: string;
    dayLabel: string;
    slotLabel: string;
    totalLabel: string;
    piecesLabel: string;
    deliverySection: string;
    addressLabel: string;
    betweenStreetsLabel: string;
    floorLabel: string;
    referenceLabel: string;
    customerSection: string;
    nameLabel: string;
    phoneLabel: string;
    closing: string;
  };
};
