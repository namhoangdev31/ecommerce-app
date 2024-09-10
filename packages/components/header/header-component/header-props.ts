export interface HeaderProps {
    id: string;
    navItems?: {
        link: {
            type?: 'reference' | 'custom';
            newTab?: boolean;
            reference: {
                relationTo: 'pages';
                value: string | Page;
            };
            url: string;
            label: string;
            icon?: string | Media;
        };
        id?: string;
    }[];
    updatedAt?: string;
    createdAt?: string;
}
export interface Page {
    id: string;
    title: string;
    publishedOn?: string;
    hero: {
        type: 'none' | 'highImpact' | 'mediumImpact' | 'lowImpact' | 'customHero';
        richText: {
            [k: string]: unknown;
        }[];
        links?: {
            link: {
                type?: 'reference' | 'custom';
                newTab?: boolean;
                reference: {
                    relationTo: 'pages';
                    value: string | Page;
                };
                url: string;
                label: string;
                icon?: string | Media;
                appearance?: 'default' | 'primary' | 'secondary';
            };
            id?: string;
        }[];
        media: string | Media;
    };
    layout: (
        | {
            invertBackground?: boolean;
            richText: {
                [k: string]: unknown;
            }[];
            links?: {
                link: {
                    type?: 'reference' | 'custom';
                    newTab?: boolean;
                    reference: {
                        relationTo: 'pages';
                        value: string | Page;
                    };
                    url: string;
                    label: string;
                    icon?: string | Media;
                    appearance?: 'primary' | 'secondary';
                };
                id?: string;
            }[];
            id?: string;
            blockName?: string;
            blockType: 'cta';
        }
        | {
            invertBackground?: boolean;
            columns?: {
                size?: 'oneThird' | 'half' | 'twoThirds' | 'full';
                richText: {
                    [k: string]: unknown;
                }[];
                enableLink?: boolean;
                link?: {
                    type?: 'reference' | 'custom';
                    newTab?: boolean;
                    reference: {
                        relationTo: 'pages';
                        value: string | Page;
                    };
                    url: string;
                    label: string;
                    icon?: string | Media;
                    appearance?: 'default' | 'primary' | 'secondary';
                };
                id?: string;
            }[];
            id?: string;
            blockName?: string;
            blockType: 'content';
        }
        | {
            invertBackground?: boolean;
            position?: 'default' | 'fullscreen';
            media: string | Media;
            id?: string;
            blockName?: string;
            blockType: 'mediaBlock';
        }
        | {
            introContent: {
                [k: string]: unknown;
            }[];
            populateBy?: 'collection' | 'selection';
            relationTo?: 'products';
            categories?: string[] | Category[];
            limit?: number;
            selectedDocs?:
            | {
                relationTo: 'products';
                value: string;
            }[]
            | {
                relationTo: 'products';
                value: Product;
            }[];
            populatedDocs?:
            | {
                relationTo: 'products';
                value: string;
            }[]
            | {
                relationTo: 'products';
                value: Product;
            }[];
            populatedDocsTotal?: number;
            id?: string;
            blockName?: string;
            blockType: 'archive';
        }
    )[];
    slug?: string;
    meta?: {
        title?: string;
        description?: string;
        image?: string | Media;
    };
    updatedAt: string;
    createdAt: string;
    _status?: 'draft' | 'published';
}
export interface Media {
    id: string;
    alt: string;
    caption?: {
        [k: string]: unknown;
    }[];
    updatedAt: string;
    createdAt: string;
    url?: string;
    filename?: string;
    mimeType?: string;
    filesize?: number;
    width?: number;
    height?: number;
}
export interface Category {
    id: string;
    title: string;
    media?: string | Media;
    parent?: string | Category;
    breadcrumbs?: {
        doc?: string | Category;
        url?: string;
        label?: string;
        id?: string;
    }[];
    updatedAt: string;
    createdAt: string;
}
export interface Product {
    id: string;
    title: string;
    publishedOn?: string;
    layout?: (
        | {
            invertBackground?: boolean;
            richText: {
                [k: string]: unknown;
            }[];
            links?: {
                link: {
                    type?: 'reference' | 'custom';
                    newTab?: boolean;
                    reference: {
                        relationTo: 'pages';
                        value: string | Page;
                    };
                    url: string;
                    label: string;
                    icon?: string | Media;
                    appearance?: 'primary' | 'secondary';
                };
                id?: string;
            }[];
            id?: string;
            blockName?: string;
            blockType: 'cta';
        }
        | {
            invertBackground?: boolean;
            columns?: {
                size?: 'oneThird' | 'half' | 'twoThirds' | 'full';
                richText: {
                    [k: string]: unknown;
                }[];
                enableLink?: boolean;
                link?: {
                    type?: 'reference' | 'custom';
                    newTab?: boolean;
                    reference: {
                        relationTo: 'pages';
                        value: string | Page;
                    };
                    url: string;
                    label: string;
                    icon?: string | Media;
                    appearance?: 'default' | 'primary' | 'secondary';
                };
                id?: string;
            }[];
            id?: string;
            blockName?: string;
            blockType: 'content';
        }
        | {
            invertBackground?: boolean;
            position?: 'default' | 'fullscreen';
            media: string | Media;
            id?: string;
            blockName?: string;
            blockType: 'mediaBlock';
        }
        | {
            introContent: {
                [k: string]: unknown;
            }[];
            populateBy?: 'collection' | 'selection';
            relationTo?: 'products';
            categories?: string[] | Category[];
            limit?: number;
            selectedDocs?:
            | {
                relationTo: 'products';
                value: string;
            }[]
            | {
                relationTo: 'products';
                value: Product;
            }[];
            populatedDocs?:
            | {
                relationTo: 'products';
                value: string;
            }[]
            | {
                relationTo: 'products';
                value: Product;
            }[];
            populatedDocsTotal?: number;
            id?: string;
            blockName?: string;
            blockType: 'archive';
        }
    )[];
    stripeProductID?: string;
    priceJSON?: string;
    enablePaywall?: boolean;
    paywall?: (
        | {
            invertBackground?: boolean;
            richText: {
                [k: string]: unknown;
            }[];
            links?: {
                link: {
                    type?: 'reference' | 'custom';
                    newTab?: boolean;
                    reference: {
                        relationTo: 'pages';
                        value: string | Page;
                    };
                    url: string;
                    label: string;
                    icon?: string | Media;
                    appearance?: 'primary' | 'secondary';
                };
                id?: string;
            }[];
            id?: string;
            blockName?: string;
            blockType: 'cta';
        }
        | {
            invertBackground?: boolean;
            columns?: {
                size?: 'oneThird' | 'half' | 'twoThirds' | 'full';
                richText: {
                    [k: string]: unknown;
                }[];
                enableLink?: boolean;
                link?: {
                    type?: 'reference' | 'custom';
                    newTab?: boolean;
                    reference: {
                        relationTo: 'pages';
                        value: string | Page;
                    };
                    url: string;
                    label: string;
                    icon?: string | Media;
                    appearance?: 'default' | 'primary' | 'secondary';
                };
                id?: string;
            }[];
            id?: string;
            blockName?: string;
            blockType: 'content';
        }
        | {
            invertBackground?: boolean;
            position?: 'default' | 'fullscreen';
            media: string | Media;
            id?: string;
            blockName?: string;
            blockType: 'mediaBlock';
        }
        | {
            introContent: {
                [k: string]: unknown;
            }[];
            populateBy?: 'collection' | 'selection';
            relationTo?: 'products';
            categories?: string[] | Category[];
            limit?: number;
            selectedDocs?:
            | {
                relationTo: 'products';
                value: string;
            }[]
            | {
                relationTo: 'products';
                value: Product;
            }[];
            populatedDocs?:
            | {
                relationTo: 'products';
                value: string;
            }[]
            | {
                relationTo: 'products';
                value: Product;
            }[];
            populatedDocsTotal?: number;
            id?: string;
            blockName?: string;
            blockType: 'archive';
        }
    )[];
    categories?: string[] | Category[];
    relatedProducts?: string[] | Product[];
    slug?: string;
    skipSync?: boolean;
    meta?: {
        title?: string;
        description?: string;
        image?: string | Media;
    };
    updatedAt: string;
    createdAt: string;
    _status?: 'draft' | 'published';
}