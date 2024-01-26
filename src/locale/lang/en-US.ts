import { assign } from 'lodash-es'

const locales = import.meta.glob([
  '@/components/**/locale/en-US.ts',
  '@/layout/**/locale/en-US.ts',
  '@/views/**/locale/en-US.ts',
], { import: 'default', eager: true })

export default {
  ...assign({}, ...Object.values(locales)),
  common: {
    add: 'Add',
    create: 'Create',
    edit: 'Edit',
    modify: 'Modify',
    update: 'Update',
    view: 'View',
    detail: 'Detail',
    delete: 'Delete',
    remove: 'Remove',
    save: 'Save',
    import: 'Import',
    export: 'Export',
    query: 'Query',
    search: 'Search',
    reset: 'Reset',
    refresh: 'Refresh',
    confirm: 'Confirm',
    cancel: 'Cancel',
    close: 'Close',
    operate: 'Operate',
    tip: 'Tip',
    notice: 'Notice',
    yes: 'Yes',
    no: 'No',
  },
  app: {
    logout: 'Logout',
    logoutTip: 'Are you sure to log out?',
    loginAgain: 'Re-login',
    loginTimeout: 'Login timeout, please re-login!',
  },
}
