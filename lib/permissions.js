export const PERMISSIONS = {
  BRANCH: {
    VIEW: 'can_view_branch',
    CREATE: 'can_create_branch',
    EDIT: 'can_edit_branch',
    DELETE: 'can_delete_branch',
  },

  EMPLOYEE: {
    VIEW: 'can_view_employee',
    CREATE: 'can_create_employee',
    EDIT: 'can_edit_employee',
    DELETE: 'can_delete_employee',
    INVITE: 'can_invite_employee',
    ASSIGN_ROLE: 'can_assign_role',
  },

  PRODUCT: {
    VIEW: 'can_view_product',
    CREATE: 'can_create_product',
    EDIT: 'can_edit_product',
    DELETE: 'can_delete_product',
  },

  INVENTORY: {
    VIEW: 'can_view_inventory',
    UPDATE: 'can_update_inventory',
    ADJUST: 'can_adjust_inventory',
  },

  ORDER: {
    VIEW: 'can_view_order',
    CREATE: 'can_create_order',
    EDIT: 'can_edit_order',
    CANCEL: 'can_cancel_order',
    APPROVE: 'can_approve_order',
  },

  QUOTATION: {
    VIEW: 'can_view_quotation',
    CREATE: 'can_create_quotation',
    EDIT: 'can_edit_quotation',
    APPROVE: 'can_approve_quotation',
    SEND: 'can_send_quotation',
  },

  INVOICE: {
    VIEW: 'can_view_invoice',
    CREATE: 'can_create_invoice',
    SEND: 'can_send_invoice',
    MARK_PAID: 'can_mark_invoice_paid',
  },
};