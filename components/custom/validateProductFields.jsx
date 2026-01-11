export function validateProductFields({ fields, data }) {
  const errors = {};

  const addError = (fieldId, message) => {
    if (!errors[fieldId]) errors[fieldId] = [];
    errors[fieldId].push(message);
  };

  fields.forEach(field => {
    const value = data[field.id];

    // -------------------------
    // REQUIRED
    // -------------------------
    if (field.required) {
      const isEmpty =
        value === undefined ||
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0);

      if (isEmpty) {
        addError(field.id, "This field is required.");
        return;
      }
    }

    // Skip further validation if empty & not required
    if (value === undefined || value === null || value === "") return;

    // -------------------------
    // TYPE VALIDATION
    // -------------------------
    switch (field.type) {
      case "number": {
        if (field.allowRange) {
          const { min, max } = value ?? {};

          if (
            min !== undefined &&
            max !== undefined &&
            min > max
          ) {
            addError(field.id, "Minimum cannot exceed maximum.");
          }

          if (field.min !== undefined && min < field.min) {
            addError(
              field.id,
              `Minimum value cannot be less than ${field.min}.`
            );
          }

          if (field.max !== undefined && max > field.max) {
            addError(
              field.id,
              `Maximum value cannot exceed ${field.max}.`
            );
          }
        } else if (typeof value !== "number") {
          addError(field.id, "Must be a number.");
        }
        break;
      }

      case "select": {
        const allowed = field.options?.map(o => o.value);
        if (!allowed?.includes(value)) {
          addError(field.id, "Invalid selection.");
        }
        break;
      }

      case "file": {
        if (!Array.isArray(value)) {
          addError(field.id, "Invalid file input.");
          break;
        }

        if (field.accept) {
          value.forEach(file => {
            const valid = field.accept.some(type =>
              file.type.startsWith(type.replace("/*", ""))
            );
            if (!valid) {
              addError(
                field.id,
                `Invalid file type: ${file.name}`
              );
            }
          });
        }
        break;
      }

      case "text":
      case "textarea":
      case "date":
      case "boolean":
        // Usually no extra validation needed
        break;

      default:
        addError(field.id, "Unsupported field type.");
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
