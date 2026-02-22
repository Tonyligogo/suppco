const data = {
  "common_field_definitions": {
    "base_fields": {
      "units_of_measurement": "string",
      "variation_type_name": "string",
      "image": "file",
      "description": "text",
      "source_location": "string",
      "manufacturer": "string",
      "model_no_identification_no": "string",
      "features": "text",
      "condition": "string",
      "date_of_manufacture": "date",
      "minimum_order_quantity": "number"
    },
    "dimension_fields": {
      "unit": ["inch", "mm", "cm", "m"],
      "diameter_D": "number (range on/off)",
      "width_W": "number (range on/off)",
      "length_L": "number (range on/off)",
      "height_H": "number (range on/off)",
      "thickness_T": "number (range on/off)"
    },
    "certification_fields": {
      "standards_and_certifications": "text",
      "environmental_specifications": "text",
      "warranty": "text"
    },
    "performance_fields": {
      "fire_resistance": "string (range on/off)",
      "moisture_resistance": "string (range on/off)",
      "weather_resistance": {
        "wind_resistance": "string",
        "impact_resistance": "string",
        "ultra_violet": "string"
      }
    },
    "material_fields": {
      "material": "string (range on/off)",
      "finish": "string (range on/off)",
      "color": "string (range on/off)",
      "grade": "string (range on/off)"
    }
  },
  "shell_equipment": {
    "aggregate": {
      "extends": ["base_fields"],
      "specifications": {
        "size_dimensions": {
          "extends": ["dimension_fields"],
          "fine_or_coarse": ["fine", "coarse"],
          "size_range": "string (e.g., 5mm, 5-20mm)"
        },
        "shape": "string (range on/off)",
        "density": "number (range on/off)",
        "compressive_strength": "number (range on/off)",
        "moisture_content": "number (range on/off)",
        "contamination_levels": "number (range on/off)",
        "silt_content": "number (range on/off)",
        "gradation": "string (range on/off)",
        "extends": ["certification_fields"]
      }
    },
    "metalwork": {
      "extends": ["base_fields"],
      "specifications": {
        "size_dimensions": {
          "extends": ["dimension_fields"]
        },
        "extends": ["material_fields", "certification_fields"]
      }
    },
    "cement": {
      "extends": ["base_fields"],
      "specifications": {
        "shelf_life": "number (range on/off)",
        "grade": "string (range on/off)",
        "packaging": "string (range on/off)",
        "extends": ["certification_fields"]
      }
    },
    "ready_mix": {
      "extends": ["base_fields"],
      "exclude_fields": ["source_location", "manufacturer", "model_no_identification_no", "features", "condition", "date_of_manufacture"],
      "specifications": {
        "size_dimensions": {
          "unit": ["inch", "mm", "cm", "m"]
        },
        "aggregate_size": {
          "type": ["fine", "coarse"],
          "size_range": "string (e.g., 5mm, 5-20mm)"
        },
        "grade": "string (range on/off)",
        "slump_value": "number (range on/off)",
        "cement_type": "string (range on/off)",
        "admixture": "string (range on/off)",
        "mix_proportions": "string (range on/off)",
        "extends": ["certification_fields"]
      }
    },
    "walls": {
      "brick_stone": {
        "extends": ["base_fields"],
        "specifications": {
          "size_dimensions": {
            "extends": ["dimension_fields"]
          },
          "color": "string (range on/off)",
          "texture_finish": "string (range on/off)",
          "stone_cut": "string (range on/off)",
          "compressive_strength": "number (range on/off)",
          "r_value": "number (range on/off)",
          "moisture_absorption": "number (range on/off)",
          "mortar_type": "string (range on/off)",
          "packaging": "string (range on/off)",
          "extends": ["certification_fields"]
        }
      },
      "drywall_mdf": {
        "extends": ["base_fields"],
        "specifications": {
          "size_dimensions": {
            "extends": ["dimension_fields"]
          },
          "edge_type": "string (range on/off)",
          "texture_finish": "string (range on/off)",
          "sound_proofing": "string (range on/off)",
          "density": "number (range on/off)",
          "packaging": "string (range on/off)",
          "extends": ["certification_fields", "performance_fields:fire_resistance", "performance_fields:moisture_resistance"]
        }
      },
      "plywood": {
        "extends": ["base_fields"],
        "specifications": {
          "size_dimensions": {
            "extends": ["dimension_fields"]
          },
          "veneer_species": "string (range on/off)",
          "core_material": "string (range on/off)",
          "texture_finish": "string (range on/off)",
          "glue_bonding": "string (range on/off)",
          "extends": ["certification_fields", "performance_fields:fire_resistance", "performance_fields:moisture_resistance"]
        }
      },
      "solid_wood": {
        "extends": ["base_fields"],
        "specifications": {
          "size_dimensions": {
            "extends": ["dimension_fields"]
          },
          "grade": "string (range on/off)",
          "texture_finish": "string (range on/off)",
          "moisture_content": "number (range on/off)",
          "sustainability": "text",
          "extends": ["certification_fields", "performance_fields:fire_resistance"]
        }
      },
      "engineered_wood": {
        "extends": ["base_fields"],
        "specifications": {
          "size_dimensions": {
            "extends": ["dimension_fields"]
          },
          "wood_species": "string (range on/off)",
          "texture_finish": "string (range on/off)",
          "fe_emission": "string (range on/off)",
          "sustainability": "text",
          "extends": ["certification_fields", "performance_fields:fire_resistance", "performance_fields:moisture_resistance"]
        }
      },
      "glass": {
        "extends": ["base_fields"],
        "specifications": {
          "size_dimensions": {
            "extends": ["dimension_fields"]
          },
          "edge_type": "string (range on/off)",
          "transparency": "string (range on/off)",
          "glass_coating": "string (range on/off)",
          "extends": ["certification_fields"]
        }
      }
    },
    "roof": {
      "truss": {
        "extends": ["base_fields"],
        "specifications": {
          "size_dimensions": {
            "extends": ["dimension_fields"]
          },
          "wood_species": "string (range on/off)",
          "treatment": "string (range on/off)",
          "surface_finish": "string (range on/off)",
          "moisture_content": "number (range on/off)",
          "extends": ["material_fields:grade", "certification_fields", "performance_fields:fire_resistance"]
        }
      },
      "sheathing": {
        "extends": ["base_fields"],
        "specifications": {
          "size_dimensions": {
            "extends": ["dimension_fields"]
          },
          "edge_profile": "string (range on/off)",
          "sheathing_compatibility": "string (range on/off)",
          "extends": ["material_fields", "certification_fields", "performance_fields:fire_resistance", "performance_fields:moisture_resistance"]
        }
      },
      "shingles": {
        "extends": ["base_fields"],
        "specifications": {
          "size_dimensions": {
            "extends": ["dimension_fields"]
          },
          "style": "string (range on/off)",
          "extends": ["material_fields", "certification_fields", "performance_fields:fire_resistance", "performance_fields:weather_resistance", "certification_fields:warranty"]
        }
      },
      "flashing": {
        "extends": ["base_fields"],
        "specifications": {
          "size_dimensions": {
            "extends": ["dimension_fields"]
          },
          "compatibility": "string (range on/off)",
          "extends": ["material_fields", "certification_fields", "performance_fields:fire_resistance", "certification_fields:warranty"]
        }
      },
      "underlayment": {
        "extends": ["base_fields"],
        "specifications": {
          "size_dimensions": {
            "extends": ["dimension_fields"]
          },
          "permeability": "string (range on/off)",
          "slip_resistance": "string (range on/off)",
          "compatibility": "string (range on/off)",
          "extends": ["material_fields:material", "material_fields:color", "certification_fields", "performance_fields:fire_resistance"]
        }
      },
      "tiles": {
        "extends": ["base_fields"],
        "specifications": {
          "size_dimensions": {
            "extends": ["dimension_fields"]
          },
          "profile": "string (range on/off)",
          "weight": "number (range on/off)",
          "compatibility": "string (range on/off)",
          "extends": ["material_fields", "certification_fields", "performance_fields:fire_resistance", "performance_fields:weather_resistance"]
        }
      },
      "connectors": {
        "extends": ["base_fields"],
        "specifications": {
          "size_dimensions": {
            "extends": ["dimension_fields"]
          },
          "profile": "string (range on/off)",
          "coating": "string (range on/off)",
          "tooth_configuration": "string (range on/off)",
          "load_capacity": "number (range on/off)",
          "hole_pattern": "string (range on/off)",
          "extends": ["material_fields:material", "certification_fields"]
        }
      },
      "membrane": {
        "extends": ["base_fields"],
        "specifications": {
          "size_dimensions": {
            "extends": ["dimension_fields"]
          },
          "ultra_violet_resistance": "string (range on/off)",
          "installation": "text",
          "extends": ["material_fields:material", "material_fields:color", "certification_fields", "performance_fields:fire_resistance"]
        }
      },
      "metal": {
        "extends": ["base_fields"],
        "specifications": {
          "size_dimensions": {
            "extends": ["dimension_fields"]
          },
          "profile": "string (range on/off)",
          "coating": "string (range on/off)",
          "extends": ["material_fields:material", "material_fields:color", "certification_fields", "performance_fields:fire_resistance", "performance_fields:weather_resistance", "certification_fields:warranty"]
        }
      },
      "bracing": {
        "extends": ["base_fields"],
        "specifications": {
          "size_dimensions": {
            "extends": ["dimension_fields"],
            "diameter_D": "number (range on/off)"
          },
          "coating": "string (range on/off)",
          "connection_detail": "string (range on/off)",
          "extends": ["material_fields:material", "material_fields:grade", "certification_fields", "certification_fields:warranty"]
        }
      },
      "insulation": {
        "extends": ["base_fields"],
        "specifications": {
          "size_dimensions": {
            "extends": ["dimension_fields"],
            "diameter_D": "number (range on/off)"
          },
          "density": "number (range on/off)",
          "r_value": "number (range on/off)",
          "facing_vapor_barrier": "string (range on/off)",
          "sound_absorption": "string (range on/off)",
          "extends": ["material_fields:material", "material_fields:finish", "certification_fields", "performance_fields:fire_resistance", "certification_fields:warranty"]
        }
      }
    },
    "formwork": {
      "extends": ["base_fields"],
      "specifications": {
        "size_dimensions": {
          "extends": ["dimension_fields"],
          "diameter_D": "number (range on/off)"
        },
        "surface_finish": "string (range on/off)",
        "formwork_compatibility": "string (range on/off)",
        "panel_characteristics": {
          "panel_strength": "string (range on/off)",
          "panel_thickness_tolerance": "string (range on/off)",
          "panel_surface_treatment": "string (range on/off)",
          "panel_connection": "string (range on/off)"
        },
        "re_use_no": "number (range on/off)",
        "edge_protection": "string (range on/off)",
        "extends": ["material_fields:material", "material_fields:grade", "certification_fields", "certification_fields:warranty"]
      }
    },
    "precast": {
      "extends": ["base_fields"],
      "specifications": {
        "size_dimensions": {
          "extends": ["dimension_fields"],
          "diameter_D": "number (range on/off)"
        },
        "design": "string (range on/off)",
        "reinforcement": "string (range on/off)",
        "connection_details": "string (range on/off)",
        "extends": ["material_fields", "certification_fields", "certification_fields:warranty"]
      }
    }
  },
  "shell_details_and_subcomponents": {
    "roof_accessories": {
      "common_accessory_fields": {
        "units_of_measurement": "string",
        "variation_type_name": "string",
        "image": "file",
        "description": "text",
        "source_location": "string",
        "manufacturer": "string",
        "model_no": "string",
        "features": "text",
        "condition": "string"
      },
      "common_dimensional_accessory_fields": {
        "size_dimensions": {
          "unit": ["inch", "mm", "cm", "m"],
          "gauge_diameter_D": "number (range on/off)",
          "width_W": "number (range on/off)",
          "length_L": "number (range on/off)",
          "height_depth_H": "number (range on/off)",
          "thickness_T": "number (range on/off)",
          "volume": "number (range on/off)"
        },
        "weight": "number (range on/off)",
        "application": "string (range on/off)",
        "accessories": "string (range on/off)"
      },
      "common_material_composition": {
        "base_material": "string (range on/off)",
        "coating": "string (range on/off)"
      },
      "common_performance": {
        "durability": "string (range on/off)",
        "load_bearing": "string (range on/off)"
      },
      "mastics": {
        "extends": ["common_accessory_fields"],
        "specifications": {
          "application": "string",
          "material_composition": {
            "base": "string (range on/off)",
            "reinforcement": "string (range on/off)",
            "additives": "string (range on/off)"
          },
          "physical_properties": {
            "form": "string (range on/off)",
            "color": "string (range on/off)",
            "density": "string (range on/off)",
            "viscosity": "string (range on/off)"
          },
          "performance_characteristics": {
            "adhesion": "string (range on/off)",
            "flexibility": "string (range on/off)",
            "durability": "string (range on/off)",
            "waterproofing": "string (range on/off)",
            "cure_time": "string (range on/off)"
          },
          "application_specs": {
            "method": "string (range on/off)",
            "surface_preparation": "string (range on/off)",
            "thickness": "string (range on/off)",
            "coverage": "string (range on/off)"
          },
          "extends": ["certification_fields"]
        }
      },
      "cement": {
        "extends": ["common_accessory_fields"],
        "specifications": {
          "extends": ["roof_accessories.mastics.specifications"]
        }
      },
      "primers": {
        "extends": ["common_accessory_fields"],
        "specifications": {
          "application": "string (range on/off)",
          "material_composition": {
            "base": "string (range on/off)",
            "solvent": "string (range on/off)",
            "additives": "string (range on/off)"
          },
          "physical_properties": {
            "form": "string (range on/off)",
            "color": "string (range on/off)",
            "density": "string (range on/off)",
            "viscosity": "string (range on/off)"
          },
          "performance_characteristics": {
            "adhesion": "string (range on/off)",
            "penetration": "string (range on/off)",
            "durability": "string (range on/off)",
            "cure_time": "string (range on/off)"
          },
          "application_specs": {
            "method": "string (range on/off)",
            "surface_preparation": "string (range on/off)",
            "thickness": "string (range on/off)",
            "coverage": "string (range on/off)"
          },
          "extends": ["certification_fields"]
        }
      },
      "brackets": {
        "extends": ["common_accessory_fields", "common_dimensional_accessory_fields"],
        "specifications": {
          "extends": ["common_material_composition"],
          "design_and_construction": {
            "type": "string (range on/off)",
            "adjustability": "string (range on/off)",
            "reinforcement": "string (range on/off)",
            "attachment_method": "string (range on/off)",
            "mounting_holes": "string (range on/off)"
          },
          "performance_characteristics": {
            "extends": ["common_performance"],
            "safety_features": "string (range on/off)"
          },
          "extends": ["certification_fields"]
        }
      },
      "straps": {
        "extends": ["common_accessory_fields", "common_dimensional_accessory_fields"],
        "specifications": {
          "extends": ["common_material_composition"],
          "design_and_construction": {
            "type": "string (range on/off)",
            "shape": "string (range on/off)",
            "mounting_holes": "string (range on/off)"
          },
          "performance_characteristics": {
            "extends": ["common_performance"],
            "flexibility": "string (range on/off)"
          },
          "extends": ["certification_fields"]
        }
      },
      "tensioners": {
        "extends": ["common_accessory_fields", "common_dimensional_accessory_fields"],
        "specifications": {
          "extends": ["common_material_composition"],
          "design_and_construction": {
            "type": "string (range on/off)",
            "adjustability": "string (range on/off)",
            "reinforcement": "string (range on/off)",
            "attachment_method": "string (range on/off)",
            "mounting_holes": "string (range on/off)"
          },
          "performance_characteristics": {
            "extends": ["common_performance"],
            "flexibility": "string (range on/off)"
          },
          "extends": ["certification_fields"]
        }
      },
      "vents": {
        "extends": ["common_accessory_fields", "common_dimensional_accessory_fields"],
        "specifications": {
          "physical_properties": {
            "shape": "string (range on/off)"
          },
          "extends": ["common_material_composition"],
          "design_and_construction": {
            "type": "string (range on/off)",
            "ventilation_mechanism": "string (range on/off)",
            "grill_blades": "string (range on/off)",
            "mounting_flange": "string (range on/off)",
            "airflow_capacity": "string (range on/off)"
          },
          "performance_characteristics": {
            "airflow_capacity": "string (range on/off)",
            "water_resistance": "string (range on/off)",
            "durability": "string (range on/off)"
          },
          "extends": ["certification_fields"]
        }
      },
      "adhesives_and_sealants": {
        "extends": ["common_accessory_fields"],
        "specifications": {
          "application": "string (range on/off)",
          "material_composition": {
            "base_material": "string (range on/off)",
            "additives": "string (range on/off)"
          },
          "physical_properties": {
            "form": "string (range on/off)",
            "color": "string (range on/off)",
            "density": "string (range on/off)",
            "viscosity": "string (range on/off)"
          },
          "performance_characteristics": {
            "adhesion": "string (range on/off)",
            "flexibility": "string (range on/off)",
            "durability": "string (range on/off)",
            "waterproofing": "string (range on/off)",
            "cure_time": "string (range on/off)"
          },
          "application_specs": {
            "method": "string (range on/off)",
            "surface_preparation": "string (range on/off)",
            "thickness": "string (range on/off)",
            "coverage": "string (range on/off)"
          },
          "extends": ["certification_fields"],
          "safety_features": "text"
        }
      },
      "tapes": {
        "extends": ["common_accessory_fields", "common_dimensional_accessory_fields"],
        "specifications": {
          "material_composition": {
            "base_material": "string (range on/off)",
            "adhesive": "string (range on/off)"
          },
          "physical_properties": {
            "form": "string (range on/off)",
            "color": "string (range on/off)"
          },
          "performance_characteristics": {
            "adhesion": "string (range on/off)",
            "flexibility": "string (range on/off)",
            "durability": "string (range on/off)",
            "waterproofing": "string (range on/off)"
          },
          "application_specs": {
            "method": "string (range on/off)",
            "surface_preparation": "string (range on/off)",
            "temperature": "string (range on/off)",
            "coverage": "string (range on/off)"
          },
          "extends": ["certification_fields"]
        }
      },
      "fasteners_and_anchors": {
        "extends": ["common_accessory_fields", "common_dimensional_accessory_fields"],
        "specifications": {
          "extends": ["common_material_composition"],
          "design_and_construction": {
            "threads": "string (range on/off)",
            "head_type": "string (range on/off)",
            "point_type": "string (range on/off)",
            "washers": "string (range on/off)",
            "anchors": "string (range on/off)"
          },
          "performance_characteristics": {
            "strength": "string (range on/off)",
            "corrosion_resistance": "string (range on/off)",
            "durability": "string (range on/off)",
            "load_capacity": "string (range on/off)"
          },
          "extends": ["certification_fields"]
        }
      },
      "tools": {
        "extends": ["common_accessory_fields", "common_dimensional_accessory_fields"],
        "specifications": {
          "extends": ["common_material_composition"],
          "design_and_construction": {
            "handles": "string (range on/off)",
            "blades": "string (range on/off)",
            "mechanism": "string (range on/off)"
          },
          "performance_characteristics": {
            "durability": "string (range on/off)",
            "precision": "string (range on/off)",
            "comfort": "string (range on/off)",
            "maintenance": "string (range on/off)"
          },
          "extends": ["certification_fields"],
          "safety_features": "text"
        }
      }
    },
    "precast_accessories": {
      "anchors": {
        "extends": ["roof_accessories.common_accessory_fields", "roof_accessories.common_dimensional_accessory_fields"],
        "specifications": {
          "extends": ["roof_accessories.common_material_composition"],
          "design_and_construction": {
            "anchor_head": "string (range on/off)",
            "shank": "string (range on/off)",
            "base": "string (range on/off)"
          },
          "performance_characteristics": {
            "durability": "string (range on/off)",
            "load_capacity": "string (range on/off)",
            "corrosion_resistance": "string (range on/off)"
          },
          "extends": ["certification_fields"],
          "installation_requirements": "text"
        }
      },
      "connectors": {
        "extends": ["roof_accessories.common_accessory_fields", "roof_accessories.common_dimensional_accessory_fields"],
        "specifications": {
          "extends": ["roof_accessories.common_material_composition"],
          "design_and_construction": {
            "load_capacity": "string (range on/off)",
            "shape": "string (range on/off)",
            "welding": "string (range on/off)",
            "bolts_and_fasteners": "string (range on/off)",
            "adjustability": "string (range on/off)"
          },
          "performance_characteristics": {
            "durability": "string (range on/off)",
            "strength": "string (range on/off)",
            "compatibility": "string (range on/off)"
          },
          "extends": ["certification_fields"],
          "installation_requirements": "text"
        }
      },
      "bolts_and_nuts": {
        "extends": ["roof_accessories.common_accessory_fields", "roof_accessories.common_dimensional_accessory_fields"],
        "specifications": {
          "extends": ["roof_accessories.common_material_composition"],
          "physical_properties": {
            "threads": "string (range on/off)"
          },
          "design_and_construction": {
            "grade": "string (range on/off)",
            "head_type": "string (range on/off)",
            "nut_type": "string (range on/off)",
            "tolerance": "string (range on/off)",
            "finish": "string (range on/off)"
          },
          "performance_characteristics": {
            "durability": "string (range on/off)",
            "strength": "string (range on/off)",
            "compatibility": "string (range on/off)",
            "corrosion_resistance": "string (range on/off)"
          },
          "extends": ["certification_fields"]
        }
      },
      "expansion_joints": {
        "extends": ["roof_accessories.common_accessory_fields", "roof_accessories.common_dimensional_accessory_fields"],
        "specifications": {
          "material_composition": {
            "base_material": "string (range on/off)",
            "coating": "string (range on/off)",
            "reinforcement": "string (range on/off)"
          },
          "design_and_construction": {
            "movement_capability": "string (range on/off)",
            "installation": "string (range on/off)",
            "flexibility": "string (range on/off)",
            "durability": "string (range on/off)",
            "compatibility": "string (range on/off)"
          },
          "performance_characteristics": {
            "load_capacity": "string (range on/off)",
            "water_tightness": "string (range on/off)"
          },
          "extends": ["certification_fields"]
        }
      },
      "dowels": {
        "extends": ["roof_accessories.common_accessory_fields", "roof_accessories.common_dimensional_accessory_fields"],
        "specifications": {
          "extends": ["roof_accessories.common_material_composition"],
          "design_and_construction": {
            "shape": "string (range on/off)",
            "ends": "string (range on/off)",
            "alignment": "string (range on/off)",
            "tolerance": "string (range on/off)"
          },
          "performance_characteristics": {
            "durability": "string (range on/off)",
            "strength": "string (range on/off)",
            "load_transfer": "string (range on/off)",
            "compatibility": "string (range on/off)"
          },
          "extends": ["certification_fields"],
          "warranties": "text",
          "safety_features": "text"
        }
      },
      "epoxy_adhesives": {
        "extends": ["roof_accessories.common_accessory_fields"],
        "specifications": {
          "accessories": "string (range on/off)",
          "application": "string (range on/off)",
          "material_composition": {
            "base_components": "string (range on/off)",
            "fillers_and_additives": "string (range on/off)"
          },
          "physical_properties": {
            "form": "string (range on/off)",
            "color": "string (range on/off)",
            "viscosity": "string (range on/off)"
          },
          "design_and_construction": {
            "mix_ratio": "string (range on/off)",
            "pot_life": "string (range on/off)",
            "curing_time": "string (range on/off)",
            "application_temperature": "string (range on/off)"
          },
          "performance_characteristics": {
            "bond_strength": "string (range on/off)",
            "durability": "string (range on/off)",
            "adhesion": "string (range on/off)",
            "flexibility": "string (range on/off)"
          },
          "extends": ["certification_fields"]
        }
      }
    },
    "foundation_slab_accessories": {
      "spacers_chairs": {
        "extends": ["roof_accessories.common_accessory_fields", "roof_accessories.common_dimensional_accessory_fields"],
        "specifications": {
          "extends": ["roof_accessories.common_material_composition"],
          "physical_properties": {
            "shape": "string (range on/off)"
          },
          "design_and_construction": {
            "load_capacity": "string (range on/off)",
            "surface": "string (range on/off)",
            "stability": "string (range on/off)",
            "attachment": "string (range on/off)"
          },
          "performance_characteristics": {
            "strength": "string (range on/off)",
            "durability": "string (range on/off)",
            "nonconductive": "string (range on/off)",
            "compatibility": "string (range on/off)"
          },
          "extends": ["certification_fields"]
        }
      },
      "reinforcement_mesh": {
        "extends": ["roof_accessories.common_accessory_fields", "roof_accessories.common_dimensional_accessory_fields"],
      }}}}