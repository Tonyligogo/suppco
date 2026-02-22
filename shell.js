export const SHELL_EQUIPMENT = {
  id: "shell",
  name: "Shell",
  layers: [
    // AGGREGATE
    {
      id: "aggregate",
      name: "Aggregate",
      sublayers: [
        { id: "crushed-stone", name: "Crushed Stone" },
        { id: "recycled-asphalt", name: "Recycled Asphalt" },

        {
          id: "sand",
          name: "Sand",
          items: [
            { id: "river-sand", name: "River Sand" },
            { id: "fill-sand", name: "Fill Sand" },
            { id: "pit-sand", name: "Pit Sand" },
            { id: "rock-sand", name: "Rock Sand" },
            { id: "manufactured-sand", name: "Manufactured Sand" },
            { id: "concrete-sand", name: "Concrete Sand" }
          ]
        },

        {
          id: "gravel",
          name: "Gravel",
          items: [
            { id: "pea-gravel", name: "Pea Gravel" },
            { id: "crushed-gravel", name: "Crushed Gravel" },
            { id: "bank-run-gravel", name: "Bank Run Gravel" },
            { id: "river-rock-gravel", name: "River Rock Gravel" },
            { id: "trap-rock-gravel", name: "Trap Rock Gravel" },
            { id: "granite-gravel", name: "Granite Gravel" },
            { id: "limestone-gravel", name: "Limestone Gravel" },
            { id: "quartzite-gravel", name: "Quartzite Gravel" }
          ]
        },

        {
          id: "ballast",
          name: "Ballast",
          items: [
            { id: "track-ballast", name: "Track Ballast" },
            { id: "stone-ballast", name: "Stone Ballast" },
            { id: "heavy-ballast", name: "Heavy Ballast" },
            { id: "granite-ballast", name: "Granite Ballast" },
            { id: "limestone-ballast", name: "Limestone Ballast" },
            { id: "trap-rock-ballast", name: "Trap Rock Ballast" },
            { id: "quartzite-ballast", name: "Quartzite Ballast" }
          ]
        },

        {
          id: "recycled-concrete",
          name: "Recycled Concrete",
          items: [
            { id: "crushed-concrete", name: "Crushed Concrete" },
            { id: "concrete-fines", name: "Concrete Fines" }
          ]
        }
      ]
    },
    // CEMENT
    {
      id: "cement",
      name: "Cement",
      sublayers: [
        {
          id: "cement-types",
          name: "Cement Types",
          items: [
            { id: "opc", name: "Ordinary Portland Cement" },
            { id: "ppc", name: "Portland Pozzolana Cement" },
            { id: "sulphate-resisting", name: "Sulphate Resisting Cement" },
            { id: "white-cement", name: "White Cement" },
            { id: "rapid-hardening", name: "Rapid Hardening Cement" },
            { id: "low-heat", name: "Low Heat Cement" }
          ]
        }
      ]
    },
    // METAL WORK
    {
      id: "metal-work",
      name: "Metal Work",
      sublayers: [
        {
          id: "steel",
          name: "Steel",
          items: [
            "Carbon Steel",
            "Alloy Steel",
            "Stainless Steel",
            "Tool Steel",
            "Rail Steel",
            "Axle Steel",
            "Mild Steel",
            "High Yield Steel"
          ].map(v => ({
            id: v.toLowerCase().replace(/\s+/g, "-"),
            name: v
          }))
        },

        {
          id: "aluminium",
          name: "Aluminium",
          items: [
            "1000 Series",
            "2000 Series",
            "3000 Series",
            "5000 Series",
            "6000 Series",
            "7000 Series"
          ].map(v => ({
            id: v.toLowerCase().replace(/\s+/g, "-"),
            name: v
          }))
        },

        {
          id: "other-metals",
          name: "Other Metals",
          items: [
            { id: "brass", name: "Brass" },
            { id: "copper", name: "Copper" },
            { id: "bronze", name: "Bronze" }
          ]
        }
      ]
    },
    // WALLS
    {
      id: "walls",
      name: "Walls",
      sublayers: [
        {
          id: "brick-wall",
          name: "Brick Wall",
          items: [
            "Burnt Clay Brick",
            "Sand Lime Brick",
            "Concrete Brick",
            "Fly Ash Brick",
            "Fire Brick",
            "Engineering Brick",
            "Cored Brick",
            "Paving Brick",
            "Bullnose Brick",
            "Hollow Brick"
          ].map(v => ({
            id: v.toLowerCase().replace(/\s+/g, "-"),
            name: v
          }))
        },

        {
          id: "stone-wall",
          name: "Stone Wall",
          items: [
            "Granite",
            "Limestone",
            "Sandstone",
            "Marble",
            "Slate"
          ].map(v => ({
            id: v.toLowerCase(),
            name: v
          }))
        },

        {
          id: "steel-frame-wall",
          name: "Steel Frame Wall",
          items: [
            "Steel Stud",
            "Track",
            "Channel",
            "Brackets",
            "Plates"
          ].map(v => ({
            id: v.toLowerCase().replace(/\s+/g, "-"),
            name: v
          }))
        },

        { id: "structural-insulated-panel", name: "Structural Insulated Panel" },
        { id: "straw-bale-wall", name: "Straw Bale Wall" },
        { id: "rammed-earth-wall", name: "Rammed Earth Wall" },
        { id: "cob-wall", name: "Cob Wall" },

        {
          id: "glass-wall",
          name: "Glass Wall",
          items: [
            "Clear Glass",
            "Frosted Glass",
            "Tinted Glass",
            "Low-E Glass",
            "Reflective Glass",
            "Laminated Glass",
            "Tempered Glass",
            "Fire-Rated Glass",
            "Bulletproof Glass",
            "Soundproof Glass",
            "Self-Cleaning Glass"
          ].map(v => ({
            id: v.toLowerCase().replace(/\s+/g, "-"),
            name: v
          }))
        },

        {
          id: "dry-wall",
          name: "Dry Wall",
          items: [
            "Regular",
            "Fire Resistant",
            "Moisture Resistant",
            "Soundproof",
            "Mold Resistant"
          ].map(v => ({
            id: v.toLowerCase().replace(/\s+/g, "-"),
            name: v
          }))
        },

        {
          id: "wood-wall",
          name: "Wood Wall",
          items: [
            "Plywood",
            "Solid Wood",
            "MDF",
            "Engineered Wood"
          ].map(v => ({
            id: v.toLowerCase().replace(/\s+/g, "-"),
            name: v
          }))
        }
      ]
    },
    // READY MIX CONCRETE
    {
      id: "ready-mix-concrete",
      name: "Ready Mix Concrete",
      sublayers: [
        {
          id: "regular-ready-mix",
          name: "Regular Ready-Mix Concrete"
        },
        {
          id: "high-strength-ready-mix",
          name: "High-Strength Ready-Mix Concrete"
        },
        {
          id: "self-consolidating-concrete",
          name: "Self-Consolidating Concrete (SCC)"
        },
        {
          id: "fiber-reinforced-concrete",
          name: "Fiber Reinforced Concrete"
        },
        {
          id: "lightweight-concrete",
          name: "Lightweight / Foam Concrete"
        }
      ]
    },
    // ROOF
    {
      id: "roof",
      name: "Roof",
      sublayers: [
        {
          id: "roof-truss",
          name: "Roof Truss",
          items: [
            "Lumber Truss",
            "Glulam Truss",
            "LVL Truss",
            "Steel Truss"
          ].map(v => ({
            id: v.toLowerCase().replace(/\s+/g, "-"),
            name: v
          }))
        },

        {
          id: "roofing-sheathing",
          name: "Roofing Sheathing",
          items: [
            "Plywood Sheathing",
            "OSB Sheathing",
            "Insulated Sheathing",
            "Fiberboard Sheathing"
          ].map(v => ({
            id: v.toLowerCase().replace(/\s+/g, "-"),
            name: v
          }))
        },

        {
          id: "roof-shingles",
          name: "Roof Shingles",
          items: [
            "Asphalt Shingles",
            "Wood Shingles",
            "Metal Shingles",
            "Slate Shingles",
            "Tile Shingles"
          ].map(v => ({
            id: v.toLowerCase().replace(/\s+/g, "-"),
            name: v
          }))
        },

        {
          id: "metal-roof",
          name: "Metal Roof",
          items: [
            "Steel Roofing",
            "Aluminium Roofing",
            "Copper Roofing",
            "Zinc Roofing",
            "Tin Roofing"
          ].map(v => ({
            id: v.toLowerCase().replace(/\s+/g, "-"),
            name: v
          }))
        },

        {
          id: "roof-insulation",
          name: "Roof Insulation",
          items: [
            "Fiberglass",
            "Cellulose",
            "Spray Foam",
            "Mineral Wool",
            "Polysocyanurate"
          ].map(v => ({
            id: v.toLowerCase().replace(/\s+/g, "-"),
            name: v
          }))
        }
      ]
    }
  ]
};

export const FIELD_GROUPS = {
  base_fields: [
    "product_name",
    "units_of_measurement",
    "price",
      "variation_type_name",
      "image",
      "description",
      "source_location",
      "manufacturer",
      "model_no_identification_no",
      "features",
      "condition",
      "date_of_manufacture",
      "minimum_order_quantity"
  ],

  dimension_fields: [
    "length_L",
    "width_W",
    "height_H",
    "thickness_T"
  ],

  certification_fields: [
    "standards_and_certifications",
    "environmental_specifications",
    "warranty"
  ],

  material_fields: [
    "material",
    "finish",
    "color",
    "grade"
  ]
};

export const PRODUCT_TYPE_DEFINITIONS = {
  Aggregate: {
    extends: ["base_fields"],
    fields: [
      ...FIELD_GROUPS.dimension_fields,
      "density",
      "moisture_content",
      "gradation"
    ],
    includeGroups: ["certification_fields"]
  },

  Cement: {
    extends: ["base_fields"],
    fields: [
      "shelf_life",
      "grade",
      "packaging"
    ],
    includeGroups: ["certification_fields"]
  },

  ready_mix: {
    extends: ["base_fields"],
    excludeFields: [
      "manufacturer",
      "model_no_identification_no"
    ],
    fields: [
      "slump_value",
      "cement_type",
      "mix_proportions"
    ]
  }
};

export const FIELD_DEFINITIONS = {
  // =========================
  // BASE FIELDS
  // =========================
  units_of_measurement: {
    id: "units_of_measurement",
    label: "Units of Measurement",
    type: "select",
    options: [
      { label: "Kilograms", value: "kg" },
      { label: "Tonnes", value: "ton" },
      { label: "Cubic Meter", value: "m3" },
      { label: "Piece", value: "piece" }
    ],
    required: true,
    filterable: true
  },

  variation_type_name: {
    id: "variation_type_name",
    label: "Variation / Type Name",
    type: "text",
    placeholder: "e.g. Fine River Sand",
    filterable: true
  },

  image: {
    id: "image",
    label: "Product Images",
    type: "file",
    multiple: true,
    accept: ["image/*"],
    // required: true
  },

  description: {
    id: "description",
    label: "Description",
    type: "textarea",
    comparable: true
  },

  product_name: {
    id: "product_name",
    label: "Product name",
    type: "text",
    filterable: true
  },
  source_location: {
    id: "source_location",
    label: "Source Location",
    type: "text",
    filterable: true
  },
  price: {
    id: "price",
    label: "Price",
    type: "number",
    min:1,
  },

  manufacturer: {
    id: "manufacturer",
    label: "Manufacturer",
    type: "text",
    filterable: true
  },

  model_no_identification_no: {
    id: "model_no_identification_no",
    label: "Model / Identification Number",
    type: "text"
  },

  features: {
    id: "features",
    label: "Features",
    type: "textarea"
  },

  condition: {
    id: "condition",
    label: "Condition",
    type: "select",
    options: [
      { label: "New", value: "new" },
      { label: "Used", value: "used" },
      { label: "Refurbished", value: "refurbished" }
    ],
    filterable: true
  },

  date_of_manufacture: {
    id: "date_of_manufacture",
    label: "Date of Manufacture",
    type: "date"
  },

  minimum_order_quantity: {
    id: "minimum_order_quantity",
    label: "Minimum Order Quantity",
    type: "number",
    min: 1
  },

  // =========================
  // DIMENSION FIELDS
  // =========================
  diameter_D: {
    id: "diameter_D",
    label: "Diameter (D)",
    type: "number",
    allowRange: true,
    unit: ["mm", "cm", "m"],
    filterable: true,
    comparable: true
  },

  width_W: {
    id: "width_W",
    label: "Width (W)",
    type: "number",
    allowRange: true,
    unit: ["mm", "cm", "m"]
  },

  length_L: {
    id: "length_L",
    label: "Length (L)",
    type: "number",
    allowRange: true,
    unit: ["mm", "cm", "m"]
  },

  height_H: {
    id: "height_H",
    label: "Height (H)",
    type: "number",
    allowRange: true,
    unit: ["mm", "cm", "m"]
  },

  thickness_T: {
    id: "thickness_T",
    label: "Thickness (T)",
    type: "number",
    allowRange: true,
    unit: ["mm", "cm"]
  },

  // =========================
  // CERTIFICATION
  // =========================
  standards_and_certifications: {
    id: "standards_and_certifications",
    label: "Standards & Certifications",
    type: "textarea",
    filterable: true
  },

  environmental_specifications: {
    id: "environmental_specifications",
    label: "Environmental Specifications",
    type: "textarea"
  },

  warranty: {
    id: "warranty",
    label: "Warranty",
    type: "text"
  },

  // =========================
  // PERFORMANCE
  // =========================
  fire_resistance: {
    id: "fire_resistance",
    label: "Fire Resistance",
    type: "text",
    allowRange: true,
    filterable: true
  },

  moisture_resistance: {
    id: "moisture_resistance",
    label: "Moisture Resistance",
    type: "text",
    allowRange: true
  },

  // =========================
  // MATERIAL
  // =========================
  material: {
    id: "material",
    label: "Material",
    type: "text",
    allowRange: true,
    filterable: true
  },

  finish: {
    id: "finish",
    label: "Finish",
    type: "text"
  },

  color: {
    id: "color",
    label: "Color",
    type: "text",
    filterable: true
  },

  grade: {
    id: "grade",
    label: "Grade",
    type: "text",
    allowRange: true,
    filterable: true,
    comparable: true
  }
};
