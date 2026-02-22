const data = {
  "shell_equipment": {
    "aggregate": {
      "common_fields": {
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
      "specifications": {
        "size_dimensions": {
          "unit": ["inch", "mm", "cm", "m"],
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
        "standards_and_certificates": "text",
        "environmental_specifications": "text"
      }
    },
    "metalwork": {
      "common_fields": {
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
      "specifications": {
        "size_dimensions": {
          "unit": ["inch", "mm", "cm", "m"],
          "diameter_D": "number (range on/off)",
          "width_W": "number (range on/off)",
          "length_L": "number (range on/off)",
          "height_H": "number (range on/off)",
          "thickness_T": "number (range on/off)"
        },
        "grade": "string (range on/off)",
        "finish": "string (range on/off)",
        "standards_and_certificates": "text",
        "environmental_specifications": "text"
      }
    },
    "cement": {
      "common_fields": {
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
      "specifications": {
        "shelf_life": "number (range on/off)",
        "grade": "string (range on/off)",
        "packaging": "string (range on/off)",
        "standards_and_certifications": "text",
        "environmental_specifications": "text"
      }
    },
    "ready_mix": {
      "common_fields": {
        "units_of_measurement": "string",
        "variation_type_name": "string",
        "image": "file",
        "description": "text",
        "minimum_order_quantity": "number"
      },
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
        "standards_and_certifications": "text",
        "environmental_specifications": "text"
      }
    },
    "walls": {
      "brick_stone": {
        "common_fields": {
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
        "specifications": {
          "size_dimensions": {
            "unit": ["inch", "mm", "cm", "m"],
            "width_W": "number (range on/off)",
            "length_L": "number (range on/off)",
            "thickness_T": "number (range on/off)",
            "height_H": "number (range on/off)"
          },
          "color": "string (range on/off)",
          "texture_finish": "string (range on/off)",
          "stone_cut": "string (range on/off)",
          "compressive_strength": "number (range on/off)",
          "r_value": "number (range on/off)",
          "moisture_absorption": "number (range on/off)",
          "mortar_type": "string (range on/off)",
          "packaging": "string (range on/off)",
          "standards_and_certifications": "text",
          "environmental_specifications": "text"
        }
      },
      "drywall_mdf": {
        "common_fields": {
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
        "specifications": {
          "size_dimensions": {
            "unit": ["inch", "mm", "cm", "m"],
            "width_W": "number (range on/off)",
            "length_L": "number (range on/off)",
            "thickness_T": "number (range on/off)",
            "height_H": "number (range on/off)"
          },
          "edge_type": "string (range on/off)",
          "texture_finish": "string (range on/off)",
          "fire_rating": "string (range on/off)",
          "moisture_resistance": "string (range on/off)",
          "sound_proofing": "string (range on/off)",
          "density": "number (range on/off)",
          "packaging": "string (range on/off)",
          "standards_and_certifications": "text",
          "environmental_specifications": "text"
        }
      },
      "plywood": {
        "common_fields": {
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
        "specifications": {
          "size_dimensions": {
            "unit": ["inch", "mm", "cm", "m"],
            "width_W": "number (range on/off)",
            "length_L": "number (range on/off)",
            "thickness_T": "number (range on/off)",
            "height_H": "number (range on/off)"
          },
          "veneer_species": "string (range on/off)",
          "core_material": "string (range on/off)",
          "texture_finish": "string (range on/off)",
          "fire_rating": "string (range on/off)",
          "moisture_resistance": "string (range on/off)",
          "glue_bonding": "string (range on/off)",
          "standards_and_certifications": "text",
          "environmental_specifications": "text"
        }
      },
      "solid_wood": {
        "common_fields": {
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
        "specifications": {
          "size_dimensions": {
            "unit": ["inch", "mm", "cm", "m"],
            "width_W": "number (range on/off)",
            "length_L": "number (range on/off)",
            "thickness_T": "number (range on/off)",
            "height_H": "number (range on/off)"
          },
          "grade": "string (range on/off)",
          "texture_finish": "string (range on/off)",
          "fire_rating": "string (range on/off)",
          "moisture_content": "number (range on/off)",
          "standards_and_certifications": "text",
          "environmental_specifications": "text",
          "sustainability": "text"
        }
      },
      "engineered_wood": {
        "common_fields": {
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
        "specifications": {
          "size_dimensions": {
            "unit": ["inch", "mm", "cm", "m"],
            "width_W": "number (range on/off)",
            "length_L": "number (range on/off)",
            "thickness_T": "number (range on/off)",
            "height_H": "number (range on/off)"
          },
          "wood_species": "string (range on/off)",
          "texture_finish": "string (range on/off)",
          "fire_rating": "string (range on/off)",
          "moisture_resistance": "string (range on/off)",
          "fe_emission": "string (range on/off)",
          "standards_and_certifications": "text",
          "environmental_specifications": "text",
          "sustainability": "text"
        }
      },
      "glass": {
        "common_fields": {
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
        "specifications": {
          "size_dimensions": {
            "unit": ["inch", "mm", "cm", "m"],
            "width_W": "number (range on/off)",
            "length_L": "number (range on/off)",
            "thickness_T": "number (range on/off)",
            "height_H": "number (range on/off)"
          },
          "edge_type": "string (range on/off)",
          "transparency": "string (range on/off)",
          "glass_coating": "string (range on/off)",
          "standards_and_certifications": "text",
          "environmental_specifications": "text"
        }
      }
    },
    "roof": {
      "truss": {
        "common_fields": {
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
        "specifications": {
          "size_dimensions": {
            "unit": ["inch", "mm", "cm", "m"],
            "width_W": "number (range on/off)",
            "length_L": "number (range on/off)",
            "thickness_T": "number (range on/off)",
            "height_H": "number (range on/off)"
          },
          "wood_species": "string (range on/off)",
          "grade": "string (range on/off)",
          "treatment": "string (range on/off)",
          "surface_finish": "string (range on/off)",
          "fire_resistance": "string (range on/off)",
          "moisture_content": "number (range on/off)",
          "standards_and_certifications": "text"
        }
      },
      "sheathing": {
        "common_fields": {
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
        "specifications": {
          "size_dimensions": {
            "unit": ["inch", "mm", "cm", "m"],
            "width_W": "number (range on/off)",
            "length_L": "number (range on/off)",
            "thickness_T": "number (range on/off)",
            "height_H": "number (range on/off)"
          },
          "material": "string (range on/off)",
          "grade": "string (range on/off)",
          "finish": "string (range on/off)",
          "edge_profile": "string (range on/off)",
          "sheathing_compatibility": "string (range on/off)",
          "fire_resistance": "string (range on/off)",
          "moisture_resistance": "string (range on/off)",
          "standards_and_certifications": "text",
          "environmental_specifications": "text"
        }
      },
      "shingles": {
        "common_fields": {
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
        "specifications": {
          "size_dimensions": {
            "unit": ["inch", "mm", "cm", "m"],
            "width_W": "number (range on/off)",
            "length_L": "number (range on/off)",
            "thickness_T": "number (range on/off)",
            "height_H": "number (range on/off)"
          },
          "material": "string (range on/off)",
          "style": "string (range on/off)",
          "color": "string (range on/off)",
          "grade": "string (range on/off)",
          "weather_resistance": {
            "wind_resistance": "string",
            "impact_resistance": "string",
            "ultra_violet": "string"
          },
          "fire_resistance": "string (range on/off)",
          "standards_and_certifications": "text",
          "environmental_specifications": "text",
          "warranty": "text"
        }
      },
      "flashing": {
        "common_fields": {
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
        "specifications": {
          "size_dimensions": {
            "unit": ["inch", "mm", "cm", "m"],
            "width_W": "number (range on/off)",
            "length_L": "number (range on/off)",
            "thickness_T": "number (range on/off)",
            "height_H": "number (range on/off)"
          },
          "material": "string (range on/off)",
          "finish": "string (range on/off)",
          "color": "string (range on/off)",
          "compatibility": "string (range on/off)",
          "fire_resistance": "string (range on/off)",
          "standards_and_certifications": "text",
          "environmental_specifications": "text",
          "warranty": "text"
        }
      },
      "underlayment": {
        "common_fields": {
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
        "specifications": {
          "size_dimensions": {
            "unit": ["inch", "mm", "cm", "m"],
            "width_W": "number (range on/off)",
            "length_L": "number (range on/off)",
            "thickness_T": "number (range on/off)",
            "height_H": "number (range on/off)"
          },
          "material": "string (range on/off)",
          "color": "string (range on/off)",
          "permeability": "string (range on/off)",
          "slip_resistance": "string (range on/off)",
          "compatibility": "string (range on/off)",
          "fire_resistance": "string (range on/off)",
          "standards_and_certifications": "text",
          "environmental_specifications": "text"
        }
      },
      "tiles": {
        "common_fields": {
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
        "specifications": {
          "size_dimensions": {
            "unit": ["inch", "mm", "cm", "m"],
            "width_W": "number (range on/off)",
            "length_L": "number (range on/off)",
            "thickness_T": "number (range on/off)",
            "height_H": "number (range on/off)"
          },
          "profile": "string (range on/off)",
          "material": "string (range on/off)",
          "color": "string (range on/off)",
          "finish": "string (range on/off)",
          "weight": "number (range on/off)",
          "weather_resistance": {
            "wind_resistance": "string",
            "impact_resistance": "string",
            "ultra_violet_resistance": "string"
          },
          "compatibility": "string (range on/off)",
          "fire_resistance": "string (range on/off)",
          "standards_and_certifications": "text",
          "environmental_specifications": "text"
        }
      },
      "connectors": {
        "common_fields": {
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
        "specifications": {
          "size_dimensions": {
            "unit": ["inch", "mm", "cm", "m"],
            "width_W": "number (range on/off)",
            "length_L": "number (range on/off)",
            "thickness_T": "number (range on/off)",
            "height_H": "number (range on/off)"
          },
          "profile": "string (range on/off)",
          "material": "string (range on/off)",
          "coating": "string (range on/off)",
          "tooth_configuration": "string (range on/off)",
          "load_capacity": "number (range on/off)",
          "hole_pattern": "string (range on/off)",
          "standards_and_certifications": "text",
          "environmental_specifications": "text"
        }
      },
      "membrane": {
        "common_fields": {
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
        "specifications": {
          "size_dimensions": {
            "unit": ["inch", "mm", "cm", "m"],
            "width_W": "number (range on/off)",
            "length_L": "number (range on/off)",
            "thickness_T": "number (range on/off)",
            "height_H": "number (range on/off)"
          },
          "material": "string (range on/off)",
          "color": "string (range on/off)",
          "ultra_violet_resistance": "string (range on/off)",
          "fire_resistance": "string (range on/off)",
          "standards_and_certifications": "text",
          "environmental_specifications": "text",
          "installation": "text"
        }
      },
      "metal": {
        "common_fields": {
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
        "specifications": {
          "size_dimensions": {
            "unit": ["inch", "mm", "cm", "m"],
            "width_W": "number (range on/off)",
            "length_L": "number (range on/off)",
            "thickness_T": "number (range on/off)",
            "height_H": "number (range on/off)"
          },
          "material": "string (range on/off)",
          "profile": "string (range on/off)",
          "color": "string (range on/off)",
          "coating": "string (range on/off)",
          "weather_resistance": {
            "wind_resistance": "string",
            "impact_resistance": "string",
            "ultra_violet": "string"
          },
          "fire_resistance": "string (range on/off)",
          "standards_and_certifications": "text",
          "environmental_specifications": "text",
          "warranty": "text"
        }
      },
      "bracing": {
        "common_fields": {
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
        "specifications": {
          "size_dimensions": {
            "unit": ["inch", "mm", "cm", "m"],
            "width_W": "number (range on/off)",
            "length_L": "number (range on/off)",
            "thickness_T": "number (range on/off)",
            "height_H": "number (range on/off)",
            "diameter_D": "number (range on/off)"
          },
          "material": "string (range on/off)",
          "grade": "string (range on/off)",
          "coating": "string (range on/off)",
          "connection_detail": "string (range on/off)",
          "standards_and_certifications": "text",
          "environmental_specifications": "text",
          "warranty": "text"
        }
      },
      "insulation": {
        "common_fields": {
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
        "specifications": {
          "size_dimensions": {
            "unit": ["inch", "mm", "cm", "m"],
            "width_W": "number (range on/off)",
            "length_L": "number (range on/off)",
            "thickness_T": "number (range on/off)",
            "height_H": "number (range on/off)",
            "diameter_D": "number (range on/off)"
          },
          "material": "string (range on/off)",
          "finish": "string (range on/off)",
          "density": "number (range on/off)",
          "r_value": "number (range on/off)",
          "facing_vapor_barrier": "string (range on/off)",
          "fire_resistance": "string (range on/off)",
          "sound_absorption": "string (range on/off)",
          "standards_and_certifications": "text",
          "environmental_specifications": "text",
          "warranty": "text"
        }
      }
    },
    "formwork": {
      "common_fields": {
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
      "specifications": {
        "size_dimensions": {
          "unit": ["inch", "mm", "cm", "m"],
          "width_W": "number (range on/off)",
          "length_L": "number (range on/off)",
          "thickness_T": "number (range on/off)",
          "height_H": "number (range on/off)",
          "diameter_D": "number (range on/off)"
        },
        "material": "string (range on/off)",
        "grade": "string (range on/off)",
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
        "standards_and_certifications": "text",
        "environmental_specifications": "text",
        "warranty": "text"
      }
    },
    "precast": {
      "common_fields": {
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
      "specifications": {
        "size_dimensions": {
          "unit": ["inch", "mm", "cm", "m"],
          "width_W": "number (range on/off)",
          "length_L": "number (range on/off)",
          "thickness_T": "number (range on/off)",
          "height_H": "number (range on/off)",
          "diameter_D": "number (range on/off)"
        },
        "material": "string (range on/off)",
        "grade": "string (range on/off)",
        "design": "string (range on/off)",
        "finish": "string (range on/off)",
        "reinforcement": "string (range on/off)",
        "connection_details": "string (range on/off)",
        "standards_and_certifications": "text",
        "environmental_specifications": "text",
        "warranty": "text"
      }
    }
  },
  "shell_details_and_subcomponents": {
    "cement_admixtures": {
      "common_fields": {
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
      "specifications": {
        "application": "string (range on/off)",
        "material_composition": {
          "chemical_composition": "string (range on/off)",
          "physical_form": "string (range on/off)",
          "color": "string (range on/off)"
        },
        "performance_characteristics": {
          "dosage": "string (range on/off)",
          "effectiveness": "string (range on/off)",
          "compatibility": "string (range on/off)",
          "stability": "string (range on/off)"
        },
        "standards_and_certificates": "text",
        "environmental_specifications": "text"
    }
}
}
}