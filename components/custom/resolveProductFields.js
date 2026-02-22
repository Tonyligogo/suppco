import { FIELD_DEFINITIONS, FIELD_GROUPS, PRODUCT_TYPE_DEFINITIONS } from "@/shell";


/**
 * Resolve all fields for a product classification
 */
export function resolveProductFields({
  layer,
  sublayer,
  item
}) {
  const resolvedFieldIds = new Set();

  // 1️⃣ Determine definition source (deepest wins)
  const definition =
    PRODUCT_TYPE_DEFINITIONS[item] ||
    PRODUCT_TYPE_DEFINITIONS[sublayer] ||
    PRODUCT_TYPE_DEFINITIONS[layer];

  if (!definition) return [];

  // 2️⃣ Apply extends (base groups)
  definition.extends?.forEach(groupName => {
    FIELD_GROUPS[groupName]?.forEach(id =>
      resolvedFieldIds.add(id)
    );
  });

  // 3️⃣ Apply included groups
  definition.includeGroups?.forEach(groupName => {
    FIELD_GROUPS[groupName]?.forEach(id =>
      resolvedFieldIds.add(id)
    );
  });

  // 4️⃣ Apply direct fields
  definition.fields?.forEach(id =>
    resolvedFieldIds.add(id)
  );

  // 5️⃣ Remove excluded fields
  definition.excludeFields?.forEach(id =>
    resolvedFieldIds.delete(id)
  );

  // 6️⃣ Map to full definitions
  const resolvedFields = Array.from(resolvedFieldIds)
    .map(id => FIELD_DEFINITIONS[id])
    .filter(Boolean);

  // 7️⃣ Sort (stable)
  return resolvedFields.sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );
}
